import {
  formSchemas,
  generateHmacAsync,
  getFormSchema,
  type FormType,
} from "../lib/validation/formRegistry";
import { validateForm } from "../lib/validation/validateForm";
import {
  TurnstileConfigurationError,
  verifyTurnstile,
} from "../security/verifyTurnstile";
import type { WorkerEnv } from "../types";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

const MAX_BODY_BYTES = 64 * 1024;

interface WordPressResponse {
  message?: string;
}

function wordpressApiBase(env: WorkerEnv): string | undefined {
  if (env.WP_CMS_URL) {
    return `${env.WP_CMS_URL.replace(/\/+$/, "")}/wp-json`;
  }
  return env.WP_API_URL?.replace(/\/+$/, "");
}

function json(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, { status, headers: JSON_HEADERS });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFormType(value: unknown): value is FormType {
  return typeof value === "string" && value in formSchemas;
}

async function readJsonBody(request: Request): Promise<unknown> {
  const declaredLength = Number(request.headers.get("Content-Length") || "0");
  if (declaredLength > MAX_BODY_BYTES) {
    throw new RangeError("Request body is too large");
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) {
    throw new RangeError("Request body is too large");
  }

  return JSON.parse(text);
}

export async function handleFormSubmission(
  request: Request,
  env: WorkerEnv,
): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        Allow: "POST, OPTIONS",
        "Cache-Control": "no-store",
      },
    });
  }

  if (request.method !== "POST") {
    return json({ success: false, message: "Method not allowed" }, 405);
  }

  if (!request.headers.get("Content-Type")?.includes("application/json")) {
    return json(
      { success: false, message: "Content-Type must be application/json" },
      415,
    );
  }

  try {
    const body = await readJsonBody(request);
    const formType = isRecord(body) ? body.formType : undefined;

    if (!isFormType(formType)) {
      return json(
        {
          success: false,
          message: `Type de formulaire inconnu: ${String(formType || "")}`,
        },
        400,
      );
    }

    const validation = validateForm(getFormSchema(formType), body);
    if (!validation.success) {
      return json({ success: false, errors: validation.errors }, 400);
    }

    const data = validation.data;
    const turnstileValid = await verifyTurnstile(
      env.TURNSTILE_SECRET_KEY,
      data.turnstile_token,
      request.headers.get("CF-Connecting-IP") || undefined,
    );

    if (!turnstileValid) {
      return json(
        {
          success: false,
          message: "Vérification de sécurité échouée. Veuillez réessayer.",
        },
        400,
      );
    }

    const wordpressBase = wordpressApiBase(env);
    if (!wordpressBase || !env.FORMS_HMAC_SECRET) {
      return json(
        {
          success: false,
          message: "Configuration serveur incomplète.",
        },
        500,
      );
    }

    const payload = {
      formType,
      fields: Object.fromEntries(
        Object.entries(data).filter(([key]) => key !== "turnstile_token"),
      ),
    };
    const signature = await generateHmacAsync(
      payload,
      env.FORMS_HMAC_SECRET,
    );
    const wordpressResponse = await fetch(
      `${wordpressBase}/r2-forms/v1/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Form-Signature": signature,
        },
        body: JSON.stringify(payload),
      },
    );
    const wordpressData = (await wordpressResponse
      .json()
      .catch(() => ({}))) as WordPressResponse;

    if (!wordpressResponse.ok) {
      return json(
        {
          success: false,
          message: wordpressData.message || "Erreur lors de l'envoi.",
        },
        wordpressResponse.status,
      );
    }

    return json({
      success: true,
      message: "Message envoyé avec succès.",
    });
  } catch (error) {
    if (error instanceof TurnstileConfigurationError) {
      console.error(error.message);
      return json(
        { success: false, message: "Configuration serveur incomplète." },
        500,
      );
    }

    if (error instanceof RangeError) {
      return json(
        { success: false, message: "Requête trop volumineuse." },
        413,
      );
    }

    if (error instanceof SyntaxError) {
      return json(
        { success: false, message: "Corps JSON invalide." },
        400,
      );
    }

    console.error("Worker form submission error:", error);
    return json(
      {
        success: false,
        message: "Une erreur est survenue. Veuillez réessayer.",
      },
      500,
    );
  }
}
