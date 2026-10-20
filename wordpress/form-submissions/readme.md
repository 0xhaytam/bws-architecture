# Form Submissions

A lightweight WordPress plugin that stores form submissions as a custom post type with email notifications. Designed to work with a headless Astro frontend using Zod validation and HMAC-signed payloads.

## Features

- **Custom Post Type**: All submissions stored as `form_submission` posts
- **Form Type Taxonomy**: Dynamic categorization (contact, convention, devis, etc.)
- **HMAC Signature Verification**: Prevents payload tampering and replay attacks
- **Cloudflare Turnstile**: Verified server-side by the site Worker
- **Email Notifications**: Plain text emails with French field labels
- **REST API**: Single endpoint `/wp-json/r2-forms/v1/submit`

## Prerequisites

- PHP 8.2 or higher
- WordPress 6.0 or higher
- Cloudflare Turnstile account (free)

## Installation

### Step 1: Copy Plugin Files

Copy the `form-submissions` folder to your WordPress `wp-content/plugins/` directory.

### Step 2: Configure WordPress Constants

**Add these 2 required constants to your `wp-config.php` file** (before `/* That's all, stop editing! */`):

```php
/** REQUIRED: HMAC Secret for payload signing */
/** Must be identical to the Cloudflare Worker's FORMS_HMAC_SECRET */
/** Generate: openssl rand -hex 32 */
define('FORMS_HMAC_SECRET', 'a-long-random-string-at-least-32-characters');

/** REQUIRED: Email address for submission notifications */
define('FORMS_NOTIFICATION_EMAIL', 'admin@yourdomain.com');
```

### Step 3: Activate Plugin

Go to **WordPress Admin → Plugins → Form Submissions → Activate**.

### Required Constants Summary

| Constant | Required | Description |
|----------|----------|-------------|
| `FORMS_HMAC_SECRET` | ✅ Yes | Shared secret with Astro frontend |
| `FORMS_NOTIFICATION_EMAIL` | ✅ Yes | Where to send submission emails |

**If any constant is missing, the plugin will reject all form submissions.**

## Configuration

### Getting Cloudflare Turnstile Keys

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Turnstile
2. Click "Add Site"
3. Enter your domain (e.g., `leveloptique.ma`)
4. Choose "Managed" widget type
5. Copy the **Site Key** to the frontend environment and the **Secret Key** to
   the Cloudflare Worker secret `TURNSTILE_SECRET_KEY`

### HMAC Secret

Generate a secure random string (at least 32 characters). This must be identical in both:
- WordPress: `FORMS_HMAC_SECRET` constant
- Cloudflare Worker: `FORMS_HMAC_SECRET` secret

You can generate one with:
```bash
openssl rand -hex 32
```

## How It Works

```
User fills form → Astro validates with Zod
→ Turnstile verifies client-side
→ Cloudflare Worker verifies Turnstile with its secret
→ Worker generates HMAC signature
→ POST to WordPress REST API
→ WordPress verifies HMAC
→ Creates form_submission post
→ Sends email notification
```

## Adding a New Form Type

### 1. Create a validation schema in Astro

Create `src/components/organisms/Contact/ContactDevis/validation.ts`:

```ts
import { z } from "zod";

export const devisSchema = z.object({
  formType: z.literal("devis"),
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  company: z.string().optional(),
  message: z.string().min(1, "Le message est requis"),
  turnstile_token: z.string(),
});
```

### 2. Register the schema

Add to `src/lib/validation/formRegistry.ts`:

```ts
import { devisSchema } from "@/components/organisms/Contact/ContactDevis/validation";

export const formSchemas = {
  contact: contactSchema,
  convention: conventionSchema,
  devis: devisSchema, // Add here
} as const;
```

### 3. Build the form component

Create `src/components/organisms/Contact/ContactDevis/index.tsx` with your form UI. Use the `devisSchema` for client-side validation and submit to `/api/submit`.

### 4. No WordPress changes needed

The WordPress plugin automatically handles any `formType` — it creates the taxonomy term if it doesn't exist.

## Email Field Labels

The plugin automatically maps field names to French labels:

| Field Key | Email Label |
|-----------|-------------|
| `nom` | Nom |
| `prenom` | Prénom |
| `name` | Nom |
| `email` | Email |
| `telephone` | Téléphone |
| `phone` | Téléphone |
| `message` | Message |
| `company` | Société |
| `subject` | Sujet |

To add more labels, edit `includes/class-email.php` and add to the `$field_labels` array.

## Security

### HMAC Verification

The plugin verifies the HMAC-SHA256 signature of every request. This ensures:
- The payload was not tampered with in transit
- Only your Astro frontend can submit forms
- Only the Worker can create a payload accepted by WordPress

### Turnstile Verification

The Cloudflare Worker verifies the browser token with
`TURNSTILE_SECRET_KEY`. A successful token is not forwarded to WordPress;
WordPress verifies only the Worker's HMAC signature.

## Troubleshooting

### Submissions not appearing in WordPress

1. Check WordPress error logs (`wp-content/debug.log`)
2. Verify `TURNSTILE_SECRET_KEY` is configured in the Cloudflare Worker
3. Verify `FORMS_HMAC_SECRET` matches the Worker's `FORMS_HMAC_SECRET`
4. Check that the REST API is accessible: `curl https://yourdomain.com/wp-json/r2-forms/v1/submit`

### Emails not sending

1. Verify `FORMS_NOTIFICATION_EMAIL` is set
2. Check if `wp_mail()` works on your host (some hosts block PHP mail)
3. Install an SMTP plugin if needed

### Turnstile errors

- Ensure the browser has `PUBLIC_TURNSTILE_SITE_KEY`
- Ensure the Worker has the matching `TURNSTILE_SECRET_KEY` secret

## Uninstallation

1. Deactivate the plugin
2. Delete the plugin

**Note:** Deactivating does not delete existing submissions. To remove all data, delete the `form_submission` posts and `form_type` taxonomy terms from the database.

## License

MIT
