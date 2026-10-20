<?php
/**
 * REST API
 *
 * Handles form submission via custom REST endpoint with HMAC verification.
 */

if (!defined('ABSPATH')) {
    exit;
}

class FS_REST_API {

    private $namespace = 'r2-forms/v1';

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route($this->namespace, '/submit', [
            'methods' => 'POST',
            'callback' => [$this, 'handle_submission'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function handle_submission(WP_REST_Request $request) {
        // 1. Verify HMAC signature
        $body = $request->get_body();
        $signature = $request->get_header('X-Form-Signature');

        if (!$this->verify_hmac($body, $signature)) {
            return new WP_Error('unauthorized', 'Invalid HMAC signature', ['status' => 401]);
        }

        // 2. Get parameters
        $params = $request->get_json_params();
        $form_type = sanitize_text_field($params['formType'] ?? 'contact');
        $fields = $params['fields'] ?? [];
        $turnstile_token = $params['turnstile_token'] ?? '';

        if (empty($fields)) {
            return new WP_Error('missing_fields', 'No form fields provided', ['status' => 400]);
        }

        // 3. Create submission post
        $post_id = wp_insert_post([
            'post_type' => 'form_submission',
            'post_title' => sprintf('%s - %s', $form_type, current_datetime()->format('Y-m-d H:i:s')),
            'post_status' => 'publish',
        ]);

        if (is_wp_error($post_id)) {
            return $post_id;
        }

        // 4. Assign form_type taxonomy
        wp_set_object_terms($post_id, $form_type, 'form_type', false);

        // 5. Store all fields as post meta
        foreach ($fields as $key => $value) {
            update_post_meta($post_id, '_field_' . sanitize_key($key), sanitize_textarea_field($value));
        }

        // 6. Send email notification
        $email = Form_Submissions::instance()->email;
        $email->send($form_type, $fields);

        return new WP_REST_Response([
            'success' => true,
            'message' => __('Submission received', 'form-submissions'),
            'id' => $post_id,
        ], 201);
    }

    /**
     * Verify HMAC-SHA256 signature
     *
     * @param string $body Raw request body
     * @param string $signature Header value
     * @return bool
     */
    private function verify_hmac($body, $signature) {
        if (!defined('FORMS_HMAC_SECRET') || empty($signature)) {
            return false;
        }

        $expected = hash_hmac('sha256', $body, FORMS_HMAC_SECRET);
        return hash_equals($expected, $signature);
    }
}
