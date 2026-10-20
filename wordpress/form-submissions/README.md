# Form Submissions Plugin

WordPress plugin that stores form submissions as a custom post type with email notifications.

## Overview

This plugin provides a complete backend for handling form submissions from a headless frontend (e.g., Astro + Cloudflare Worker):

- **Custom Post Type** (`form_submission`) stores all submissions
- **Taxonomy** (`form_type`) categorizes submissions by form type
- **REST API Endpoint** (`/wp-json/r2-forms/v1/submit`) receives submissions securely
- **HMAC Verification** ensures only trusted sources can submit
- **Email Notifications** alerts the site owner on each submission
- **Admin UI** with custom columns and read-only detail view

## Architecture

```
Frontend Form (Astro + React)
    ↓ POST json
Cloudflare Worker (validation + Turnstile)
    ↓ POST + HMAC signature
WordPress REST API
    ↓
Form Submissions Plugin
    ↓
CPT Storage + Email Notification
```

## Installation

1. Copy the `form-submissions/` folder to `wp-content/plugins/`
2. Go to **Plugins** in WordPress admin
3. Activate **"Form Submissions"**
4. Go to **Settings → Permalinks** and click **Save Changes** (flushes rewrite rules)

## Configuration

### Required: HMAC Secret

Add to `wp-config.php`:

```php
define('FORMS_HMAC_SECRET', 'your-long-random-string-here');
```

**This must match** the `FORMS_HMAC_SECRET` set in your Cloudflare Worker.

Turnstile is verified exactly once by the Cloudflare Worker. Do not configure a
second WordPress verification: Turnstile tokens are single-use and are removed
before the HMAC-signed payload is forwarded.

### Notification Email

Go to **Form Submissions → Settings** in WordPress admin.

Set the **Notification Email** where submission alerts should be sent.

- If empty → falls back to WordPress admin email
- One email address only (comma-separated support planned for future)

## REST API Endpoint

### URL
```
POST https://your-domain.com/wp-json/r2-forms/v1/submit
```

### Headers
```
Content-Type: application/json
X-Form-Signature: {hmac-sha256-hex}
```

### Request Body
```json
{
  "formType": "contact",
  "fields": {
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "phone": "0612345678",
    "message": "Bonjour, je voudrais..."
  }
}
```

### HMAC Signature Generation

Sign the raw JSON body with HMAC-SHA256 using `FORMS_HMAC_SECRET`:

```javascript
const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
// hex-encode the result
```

### Response

**Success:**
```json
{
  "success": true,
  "message": "Submission received",
  "id": 123
}
```

**Error:**
```json
{
  "code": "unauthorized",
  "message": "Invalid HMAC signature",
  "data": { "status": 401 }
}
```

## Admin UI

### Submission List

Navigate to **Form Submissions → All Submissions**

Columns displayed:
- **Email**
- **Téléphone**
- **Nom complet**
- **Type** (form taxonomy)
- **Date**

### Single Submission View

Click **View** on any submission to see:
- **Parsed fields** (Type, Nom, Email, Téléphone, Message, Date)
- **All raw fields** (complete list of submitted data)

## File Structure

```
form-submissions/
├── form-submissions.php          # Main plugin file
├── includes/
│   ├── class-post-type.php       # CPT + taxonomy registration
│   ├── class-rest-api.php        # REST endpoint + HMAC verification
│   ├── class-turnstile.php       # Turnstile token verification
│   ├── class-email.php           # Email notifications
│   └── class-admin.php           # Admin columns + meta box + settings
```

## Troubleshooting

### "rest_no_route" error

The REST endpoint is not registered. Solutions:
1. Ensure plugin is **activated**
2. Go to **Settings → Permalinks** → click **Save Changes**
3. Verify the endpoint: `https://your-domain.com/wp-json/r2-forms/v1`

### "Invalid HMAC signature" error

The HMAC secrets don't match between Worker and WordPress:
1. Check `FORMS_HMAC_SECRET` in `wp-config.php`
2. Check `FORMS_HMAC_SECRET` in Cloudflare Worker dashboard
3. They must be **character-for-character identical**

### HTML response instead of JSON

WordPress is returning an error page instead of JSON. Common causes:
1. PHP fatal error in plugin → check server error logs
2. Missing required constants (`FORMS_HMAC_SECRET`)
3. Plugin not active

### Emails not sending

1. Check **Form Submissions → Settings** for notification email
2. Verify WordPress can send mail (`wp_mail()` test)
3. Check spam folders
4. Review server error logs for `wp_mail()` failures

## Future Enhancements

Planned features for future versions:

- [ ] **Multiple notification emails** (comma-separated)
- [ ] **Per-form-type email routing** (contact → support, convention → sales)
- [ ] **CSV export** of submissions
- [ ] **Email templates** (HTML formatting)
- [ ] **Auto-reply** to submitter
- [ ] **Rate limiting** (prevent spam)
- [ ] **Duplicate detection**
- [ ] **Submission status** (new / read / archived)

## Changelog

### 1.0.0
- Initial release
- CPT storage + taxonomy
- REST API with HMAC verification
- Turnstile verification
- Email notifications
- Admin columns + detail view
- Settings page for notification email
