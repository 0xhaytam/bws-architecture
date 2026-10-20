import { useState, type FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { HeadlessButton, HeadlessInput } from "@/src/headless";
import { Icon } from "@/src/components/primitives/Icon";
import { Text, type TextData } from "@/src/components/primitives/Text";
import { submitForm } from "@/src/lib/formSubmission";
import { contactFormStyles } from "./base";

interface ContactFormProps {
  submitLabel?: string;
  privacyNote?: TextData;
  detailed?: boolean;
}

export function ContactForm({ submitLabel = "Envoyer la demande", privacyNote }: ContactFormProps) {
  const styles = contactFormStyles();
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const configuredSiteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined;
  const siteKey = configuredSiteKey || (import.meta.env.DEV ? "1x00000000000000000000AA" : undefined);

  const fieldClasses = (withIcon = false) => ({
    root: styles.fieldRoot(),
    label: styles.label(),
    required: styles.required(),
    control: styles.control(),
    input: styles.input({ class: withIcon ? styles.inputWithIcon() : undefined }),
    startAdornment: styles.adornment(),
    errors: styles.errors(),
    error: styles.error(),
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      setStatus("Veuillez compléter la vérification de sécurité.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    setLoading(true);
    setStatus("");
    setErrors({});
    try {
      const result = await submitForm("contact", {
        name: `${data.get("firstName") || ""} ${data.get("lastName") || ""}`.trim(),
        phone: data.get("phone"),
        email: data.get("email"),
        turnstile_token: token,
      });
      if (!result.success) {
        setErrors(result.errors || {});
        setStatus(result.message || "La demande n'a pas pu être envoyée.");
        return;
      }
      form.reset();
      setToken("");
      setStatus(result.message || "Votre demande a bien été envoyée.");
    } catch {
      setStatus("Une erreur réseau est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.root()} onSubmit={handleSubmit} noValidate>
      <HeadlessInput
        name="firstName"
        label="Prénom"
        placeholder="Votre prénom"
        autoComplete="given-name"
        required
        requiredLabel=" *"
        classNames={fieldClasses()}
      />
      <HeadlessInput
        name="lastName"
        label="Nom"
        placeholder="Votre nom"
        autoComplete="family-name"
        required
        requiredLabel=" *"
        errors={errors.name}
        classNames={fieldClasses()}
      />
      <HeadlessInput
        name="email"
        type="email"
        label="Email"
        placeholder="vous@exemple.com"
        autoComplete="email"
        required
        requiredLabel=" *"
        errors={errors.email}
        startAdornment={<Icon name="Mail" size="sm" />}
        classNames={fieldClasses(true)}
      />
      <HeadlessInput
        name="phone"
        type="tel"
        label="Téléphone"
        placeholder="+212 6 00 00 00 00"
        required
        requiredLabel=" *"
        autoComplete="tel"
        errors={errors.phone}
        startAdornment={<Icon name="Phone" size="sm" />}
        classNames={fieldClasses(true)}
      />

      <div className={styles.security()}>
        {siteKey ? (
          <Turnstile
            siteKey={siteKey}
            onSuccess={setToken}
            onExpire={() => setToken("")}
            onError={() => setToken("")}
            options={{ theme: "light", size: "flexible" }}
          />
        ) : (
          <Text level="p3" className={styles.missingSecurity()}>
            La vérification de sécurité sera disponible dès que la clé publique Turnstile sera configurée.
          </Text>
        )}
      </div>
      <div className={styles.footer()}>
        <HeadlessButton.Root type="submit" loading={loading} className={styles.button()} disabled={!siteKey}>
          <HeadlessButton.Label>{loading ? "Envoi…" : submitLabel}</HeadlessButton.Label>
          <HeadlessButton.EndIcon className={styles.buttonIcon()}>
            <Icon name="Send" size="sm" />
          </HeadlessButton.EndIcon>
        </HeadlessButton.Root>
        {privacyNote ? <Text {...privacyNote} level={privacyNote.level || "c2"} className={styles.note()} /> : null}
      </div>
      {status ? (
        <Text role="status" level="p3" className={styles.status()}>
          {status}
        </Text>
      ) : null}
    </form>
  );
}
