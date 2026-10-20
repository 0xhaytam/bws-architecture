export interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

export interface WorkerEnv {
  ASSETS: AssetsBinding;
  TURNSTILE_SECRET_KEY?: string;
  FORMS_HMAC_SECRET: string;
  WP_CMS_URL?: string;
  /** @deprecated Temporary migration fallback. */
  WP_API_URL?: string;
}
