<?php

/**
 * 1. THEME SETUP
 * Consolidate menu registration and basic theme support.
 */
add_action('after_setup_theme', function() {
    add_theme_support('menus');
    add_theme_support('title-tag'); // Required for RankMath to output <title>
    add_theme_support('post-thumbnails'); // To display thumbnail image inside post type

    register_nav_menus([
        'main-menu' => 'Main Menu',
        'footer'    => 'Footer Menu',
    ]);
});

/**
 * 2. CORE MODIFICATIONS (init)
 * Grouping all post type and editor changes.
 */
add_action('init', function() {
    // Remove Gutenberg Editor
    remove_post_type_support('page', 'editor');
    // remove_post_type_support('post', 'editor'); // Temporarily disabled in order to test the new theme with Gutenberg editor enabled.

    // Enable and Rename Excerpt for SEO
    add_post_type_support('page', 'excerpt');

    $page_obj = get_post_type_object('page');
    if ($page_obj) {
        $page_obj->labels->excerpt = 'Meta Description';
    }
});

/**
 * 3. HEADLESS REDIRECTS
 */
add_action('template_redirect', function() {
    $frontend_url = defined('FRONTEND_APP_URL') ? FRONTEND_APP_URL : '';

    if (!empty($frontend_url) && (!defined('REST_REQUEST') || !REST_REQUEST)) {
        wp_redirect(trailingslashit($frontend_url), 301);
        exit;
    }
});

/**
 * 4. REST API CUSTOMIZATION
 */
add_action('rest_api_init', function () {
    register_rest_route('atelier/v1', '/menu/location/(?P<slug>[a-zA-Z0-9-]+)', [
        'methods'             => 'GET',
        'callback'            => 'atelier_get_menu_by_location',
        'permission_callback' => '__return_true',
    ]);
});

function atelier_get_menu_by_location($data) {
    $locations = get_nav_menu_locations();
    if (!isset($locations[$data['slug']]) || $locations[$data['slug']] === 0) {
        return new WP_Error('no_menu', 'Menu not found', ['status' => 404]);
    }

    $items = wp_get_nav_menu_items($locations[$data['slug']]);
    return array_map(function($item) {
        return [
            'id'     => (int)$item->ID,
            'parent' => (int)$item->menu_item_parent,
            'title'  => $item->title,
            'url'    => $item->url,
            'order'  => (int)$item->menu_order,
        ];
    }, $items ?: []);
}

// Ensure ACF Images return full arrays in REST
add_filter('acf/rest/format_value_for_rest', function($value, $post_id, $field) {
    return ($field['type'] === 'image' && is_numeric($value)) ? acf_get_attachment($value) : $value;
}, 10, 3);

/**
 * 5. ADMIN UI CLEANUP
 */
// Rename labels
add_filter('gettext', function($translated, $text) {
    return ($text === 'Excerpt') ? 'Meta Description' : $translated;
}, 20, 2);

// Hide helper text
add_action('admin_head', function() {
    echo '<style>#postexcerpt .inside p { display: none !important; }</style>';
});


// Enable ACF JSON save/load
add_filter('acf/settings/save_json', function() {
    return get_stylesheet_directory() . '/acf-json';
});
add_filter('acf/settings/load_json', function($paths) {
    $paths[] = get_stylesheet_directory() . '/acf-json';
    $paths[] = get_stylesheet_directory() . '/acf-json/atoms';
    $paths[] = get_stylesheet_directory() . '/acf-json/molecules';
    return $paths;
});

/**
 * Load the generated preview interaction bridge in the parent ACF editor.
 *
 * ACFE can enqueue per-layout render scripts, but previews are rendered
 * asynchronously and some versions keep that script inside the preview
 * context. Loading it here ensures it can focus the native ACF fields after
 * ACFE opens a layout.
 */
add_action('acf/input/admin_enqueue_scripts', function() {
    $relative_path = '/acf-previews/preview.js';
    $locations = [
        [
            'path' => get_stylesheet_directory() . $relative_path,
            'url'  => get_stylesheet_directory_uri() . $relative_path,
        ],
        [
            'path' => get_template_directory() . $relative_path,
            'url'  => get_template_directory_uri() . $relative_path,
        ],
    ];

    foreach ($locations as $location) {
        if (!is_readable($location['path'])) {
            continue;
        }

        wp_enqueue_script(
            'atelier-acf-preview-focus',
            $location['url'],
            [],
            (string) filemtime($location['path']),
            true
        );
        break;
    }
});
/**
* Enable template names
*/
add_filter( 'display_post_states', 'show_custom_template_post_states', 10, 2 );

function show_custom_template_post_states( $post_states, $post ) {
    // Get the template assigned to the page
    $template = get_page_template_slug( $post->ID );

    // If a template is assigned, add it to the display states
    if ( ! empty( $template ) ) {
        // This cleans up the file name (e.g., "template-services.php" becomes "Services")
        $template_name = str_replace( array('template-', '.php'), '', $template );
        $post_states[] = ucwords($template_name) . ' Template';
    }

    return $post_states;
}

/**
 * Auto-update ACF Link fields when a page/post slug changes.
 *
 * When a post is saved with a new permalink, this scans all posts/pages
 * for ACF link fields containing the old URL and updates them to the new one.
 */
add_action('post_updated', function($post_ID, $post_after, $post_before) {
    // Skip autosaves and revisions
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (wp_is_post_revision($post_ID)) return;

    // Get old and new permalinks
    $old_url = get_permalink($post_before);
    $new_url = get_permalink($post_after);

    // No change? Bail.
    if ($old_url === $new_url) return;

    // Normalize: strip trailing slash for matching
    $old_url_unslashed = untrailingslashit($old_url);
    $new_url_unslashed = untrailingslashit($new_url);

    // Find all post types that might have ACF link fields
    $post_types = get_post_types(['public' => true], 'names');

    // Query all posts (your site is small, so per_page=100 is fine)
    $query = new WP_Query([
        'post_type'      => $post_types,
        'posts_per_page' => 100,
        'post_status'    => 'publish',
        'fields'         => 'ids', // Only fetch IDs for performance
    ]);

    if (!$query->have_posts()) return;

    foreach ($query->posts as $target_id) {
        // Get all ACF fields for this post
        $fields = get_fields($target_id);

        if (!$fields) continue;

        // Recursively search for link fields and update stale URLs
        $updated = update_acf_links_recursive($fields, $old_url_unslashed, $new_url_unslashed);

        if ($updated) {
            // Re-save the updated fields
            foreach ($updated as $key => $value) {
                update_field($key, $value, $target_id);
            }
        }
    }

    wp_reset_postdata();

}, 10, 3);
/**
 * Recursively scan ACF fields for link types and update stale URLs.
 * Returns an associative array of field keys that need updating.
 */
function update_acf_links_recursive($fields, $old_url, $new_url, $parent_key = '') {
    $to_update = [];

    foreach ($fields as $key => $value) {
        $full_key = $parent_key ? "{$parent_key}_{$key}" : $key;

        // Case 1: This is an ACF link field (has url, title, target)
        if (is_array($value) && isset($value['url']) && isset($value['title'])) {
            $field_url = untrailingslashit($value['url']);

            // Check if the URL matches (with or without trailing slash)
            if ($field_url === $old_url || $field_url === $old_url . '/') {
                $value['url'] = $new_url;
                $to_update[$key] = $value;
            }
        }
        // Case 2: Nested array (repeater, group, flexible content)
        elseif (is_array($value)) {
            $nested = update_acf_links_recursive($value, $old_url, $new_url, $full_key);
            if (!empty($nested)) {
                $to_update[$key] = array_replace_recursive($value, $nested);
            }
        }
    }

    return $to_update;
}

/** Display the generated client icon beside every ACF icon selector. */
add_action('acf/input/admin_enqueue_scripts', function() {
    $base_path = get_stylesheet_directory() . '/acf-previews/';
    $base_url = get_stylesheet_directory_uri() . '/acf-previews/';
    $script_path = $base_path . 'icon-picker.js';
    $style_path = $base_path . 'icon-picker.css';
    $manifest_path = $base_path . 'icon-manifest.json';

    if (is_readable($style_path)) {
        wp_enqueue_style('atelier-acf-icon-picker', $base_url . 'icon-picker.css', [], (string) filemtime($style_path));
    }

    if (is_readable($script_path) && is_readable($manifest_path)) {
        wp_enqueue_script('atelier-acf-icon-picker', $base_url . 'icon-picker.js', ['acf-input'], (string) filemtime($script_path), true);
        wp_localize_script('atelier-acf-icon-picker', 'AtelierIconPicker', [
            'manifestUrl' => $base_url . 'icon-manifest.json',
        ]);
    }
});
