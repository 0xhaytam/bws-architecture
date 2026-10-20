<?php
/**
 * Plugin Name: Form Submissions
 * Description: Stores form submissions as a custom post type with email notifications.
 * Version: 1.0.0
 * Author: MDGF
 * Text Domain: form-submissions
 */

if (!defined('ABSPATH')) {
    exit;
}

define('FS_VERSION', '1.0.0');
define('FS_PLUGIN_DIR', plugin_dir_path(__FILE__));

// Load required classes
require_once FS_PLUGIN_DIR . 'includes/class-post-type.php';
require_once FS_PLUGIN_DIR . 'includes/class-rest-api.php';
require_once FS_PLUGIN_DIR . 'includes/class-turnstile.php';
require_once FS_PLUGIN_DIR . 'includes/class-email.php';
require_once FS_PLUGIN_DIR . 'includes/class-admin.php';

class Form_Submissions {

    private static $instance = null;

    public $post_type;
    public $rest_api;
    public $turnstile;
    public $email;
    public $admin;

    private function __construct() {
        $this->init();
    }

    public static function instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function init() {
        $this->post_type = new FS_Post_Type();
        $this->rest_api = new FS_REST_API();
        $this->turnstile = new FS_Turnstile();
        $this->email = new FS_Email();
        $this->admin = new FS_Admin();
    }
}

add_action('plugins_loaded', function() {
    Form_Submissions::instance();
});
