# bws-architecture

This directory contains the complete runtime source and WordPress delivery
files for this website.

## Website

1. Copy `.env.example` to `.env` and configure the WordPress and public site
   values.
2. Run `bun install`.
3. Run `bun run build` to generate the static Astro site.

## WordPress

Copy or merge the contents of `wordpress/theme/` into the active WordPress
theme. It includes `functions.php`, selectable page templates, ACF JSON, and
the ACF Extended editor previews.

Install `wordpress/form-submissions/` as a plugin for the form storage REST
endpoint. The R2 media plugin is included separately when that integration is
used.

## Cloudflare

Copy `.dev.vars.example` to `.dev.vars` for local Worker development.
Configure `TURNSTILE_SECRET_KEY`, `FORMS_HMAC_SECRET`, and `WP_CMS_URL` as
encrypted Worker secrets in production.

`bun run deploy` builds and deploys the static site and same-origin form
endpoint as one Cloudflare Worker project.
