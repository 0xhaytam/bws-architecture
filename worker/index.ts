import { handleFormSubmission } from "./forms/handleFormSubmission";
import type { WorkerEnv } from "./types";

const FORM_ROUTE = "/api/forms/submit";

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === FORM_ROUTE) {
      return handleFormSubmission(request, env);
    }

    if (url.pathname.startsWith("/api/forms/")) {
      return Response.json(
        { success: false, message: "Form endpoint not found" },
        { status: 404 },
      );
    }

    return env.ASSETS.fetch(request);
  },
};
