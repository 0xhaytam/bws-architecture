<?php
/**
 * Post Type & Taxonomy
 *
 * Registers the form_submission custom post type and form_type taxonomy.
 */

if (!defined('ABSPATH')) {
    exit;
}

class FS_Post_Type {

    public function __construct() {
        add_action('init', [$this, 'register']);
    }

    public function register() {
        // Register form_type taxonomy first
        register_taxonomy('form_type', 'form_submission', [
            'labels' => [
                'name' => __('Form Types', 'form-submissions'),
                'singular_name' => __('Form Type', 'form-submissions'),
            ],
            'public' => false,
            'show_ui' => true,
            'show_admin_column' => true,
            'hierarchical' => false,
        ]);

        // Register form_submission CPT
        register_post_type('form_submission', [
            'labels' => [
                'name' => __('Form Submissions', 'form-submissions'),
                'singular_name' => __('Form Submission', 'form-submissions'),
                'add_new' => __('Add New', 'form-submissions'),
                'add_new_item' => __('Add New Submission', 'form-submissions'),
                'edit_item' => __('Edit Submission', 'form-submissions'),
                'new_item' => __('New Submission', 'form-submissions'),
                'view_item' => __('View Submission', 'form-submissions'),
                'search_items' => __('Search Submissions', 'form-submissions'),
                'not_found' => __('No submissions found', 'form-submissions'),
                'not_found_in_trash' => __('No submissions found in trash', 'form-submissions'),
            ],
            'public' => false,
            'publicly_queryable' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_icon' => 'dashicons-feedback',
            'supports' => ['title'],
            'has_archive' => false,
            'rewrite' => false,
            'show_in_rest' => true,
        ]);
    }
}
