<?php
/**
 * Turnstile Verification
 *
 * Verifies Cloudflare Turnstile tokens server-side.
 */

if (!defined('ABSPATH')) {
    exit;
}

class FS_Turnstile {

    private $verify_url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

    public function verify($token) {
        if (empty($token)) {
            return new WP_Error('missing_token', 'Turnstile token is required', ['status' => 400]);
        }

        $secret = defined('TURNSTILE_SECRET_KEY') ? TURNSTILE_SECRET_KEY : '';

        if (empty($secret)) {
            return new WP_Error('config_error', 'Turnstile secret key not configured', ['status' => 500]);
        }

        $response = wp_remote_post($this->verify_url, [
            'body' => [
                'secret' => $secret,
                'response' => $token,
            ],
            'timeout' => 15,
        ]);

        if (is_wp_error($response)) {
            return new WP_Error('verification_failed', 'Could not verify Turnstile token', ['status' => 500]);
        }

        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);

        if (!isset($data['success']) || !$data['success']) {
            $error_codes = isset($data['error-codes']) ? implode(', ', $data['error-codes']) : 'unknown';
            return new WP_Error('invalid_token', 'Turnstile verification failed: ' . $error_codes, ['status' => 400]);
        }

        return true;
    }
}
