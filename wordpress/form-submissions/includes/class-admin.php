<?php
/**
 * Admin UI
 *
 * Customizes the form_submission CPT admin list and single view.
 */

if (!defined('ABSPATH')) {
    exit;
}

class FS_Admin {

    public function __construct() {
        // Admin list columns
        add_filter('manage_form_submission_posts_columns', [$this, 'custom_columns']);
        add_action('manage_form_submission_posts_custom_column', [$this, 'render_custom_column'], 10, 2);

        // Add View row action on hover
        add_filter('post_row_actions', [$this, 'add_view_row_action'], 10, 2);

        // Meta box on single submission view
        add_action('add_meta_boxes', [$this, 'register_meta_boxes']);

        // Settings page
        add_action('admin_menu', [$this, 'register_settings_page']);
        add_action('admin_init', [$this, 'register_settings']);
    }

    /**
     * Add View link to row actions (hover).
     */
    public function add_view_row_action($actions, $post) {
        if ($post->post_type !== 'form_submission') {
            return $actions;
        }

        $view_link = get_edit_post_link($post->ID);
        $actions['view'] = sprintf(
            '<a href="%s" aria-label="%s">%s</a>',
            esc_url($view_link),
            esc_attr(sprintf(__('View "%s"', 'form-submissions'), get_the_title($post->ID))),
            __('View', 'form-submissions')
        );

        return $actions;
    }

    /**
     * Register settings submenu page.
     */
    public function register_settings_page() {
        add_submenu_page(
            'edit.php?post_type=form_submission',
            __('Form Submissions Settings', 'form-submissions'),
            __('Settings', 'form-submissions'),
            'manage_options',
            'fs-settings',
            [$this, 'render_settings_page']
        );
    }

    /**
     * Register settings field.
     */
    public function register_settings() {
        register_setting('fs_settings_group', 'fs_notification_email', [
            'type' => 'string',
            'sanitize_callback' => 'sanitize_email',
            'default' => '',
        ]);
    }

    /**
     * Render the settings page.
     */
    public function render_settings_page() {
        $email = get_option('fs_notification_email', '');
        $fallback = get_option('admin_email');
        ?>
        <div class="wrap">
            <h1><?php _e('Form Submissions Settings', 'form-submissions'); ?></h1>
            <form method="post" action="options.php">
                <?php settings_fields('fs_settings_group'); ?>
                <?php do_settings_sections('fs_settings_group'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="fs_notification_email">
                                <?php _e('Notification Email', 'form-submissions'); ?>
                            </label>
                        </th>
                        <td>
                            <input
                                type="email"
                                id="fs_notification_email"
                                name="fs_notification_email"
                                value="<?php echo esc_attr($email); ?>"
                                class="regular-text"
                                placeholder="<?php echo esc_attr($fallback); ?>"
                            />
                            <p class="description">
                                <?php
                                printf(
                                    /* translators: %s: WordPress admin email */
                                    __('Where to send form submission notifications. If empty, falls back to: %s', 'form-submissions'),
                                    '<code>' . esc_html($fallback) . '</code>'
                                );
                                ?>
                            </p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }

    /**
     * Define custom admin list columns.
     */
    public function custom_columns($columns) {
        $new_columns = [];

        // Remove title, add our custom columns
        foreach ($columns as $key => $label) {
            if ($key === 'title') {
                continue; // skip auto-generated title
            }
            $new_columns[$key] = $label;
        }

        // Insert custom columns before the taxonomy/date columns
        $ordered = [];
        $ordered['cb'] = $new_columns['cb'] ?? '<input type="checkbox" />';
        $ordered['email'] = __('Email', 'form-submissions');
        $ordered['telephone'] = __('Téléphone', 'form-submissions');
        $ordered['nom_complet'] = __('Nom complet', 'form-submissions');

        // Add remaining columns (taxonomy, date, etc.)
        foreach ($new_columns as $key => $label) {
            if (!isset($ordered[$key])) {
                $ordered[$key] = $label;
            }
        }

        return $ordered;
    }

    /**
     * Render custom column cells.
     */
    public function render_custom_column($column, $post_id) {
        switch ($column) {
            case 'email':
                echo esc_html(get_post_meta($post_id, '_field_email', true));
                break;

            case 'telephone':
                $tel = get_post_meta($post_id, '_field_telephone', true);
                if (empty($tel)) {
                    $tel = get_post_meta($post_id, '_field_phone', true);
                }
                echo esc_html($tel);
                break;

            case 'nom_complet':
                $nom = get_post_meta($post_id, '_field_nom', true);
                $prenom = get_post_meta($post_id, '_field_prenom', true);

                if (!empty($nom) || !empty($prenom)) {
                    echo esc_html(trim($prenom . ' ' . $nom));
                } else {
                    $name = get_post_meta($post_id, '_field_name', true);
                    echo esc_html($name);
                }
                break;
        }
    }

    /**
     * Register meta boxes for the single submission view.
     */
    public function register_meta_boxes() {
        add_meta_box(
            'fs_submission_details',
            __('Détails de la soumission', 'form-submissions'),
            [$this, 'render_details_meta_box'],
            'form_submission',
            'normal',
            'high'
        );
    }

    /**
     * Render the read-only details meta box.
     */
    public function render_details_meta_box($post) {
        $post_id = $post->ID;

        // Get taxonomy term
        $terms = get_the_terms($post_id, 'form_type');
        $form_type = (!empty($terms) && !is_wp_error($terms)) ? $terms[0]->name : '-';

        // Parsed fields
        $nom = get_post_meta($post_id, '_field_nom', true);
        $prenom = get_post_meta($post_id, '_field_prenom', true);
        $name = get_post_meta($post_id, '_field_name', true);
        $email = get_post_meta($post_id, '_field_email', true);
        $telephone = get_post_meta($post_id, '_field_telephone', true);
        $phone = get_post_meta($post_id, '_field_phone', true);
        $message = get_post_meta($post_id, '_field_message', true);

        $nom_complet = '';
        if (!empty($nom) || !empty($prenom)) {
            $nom_complet = trim($prenom . ' ' . $nom);
        } elseif (!empty($name)) {
            $nom_complet = $name;
        }

        $tel_display = !empty($telephone) ? $telephone : $phone;
        ?>

        <style>
            .fs-meta-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            .fs-meta-table th,
            .fs-meta-table td {
                padding: 10px 12px;
                text-align: left;
                border-bottom: 1px solid #e5e5e5;
                vertical-align: top;
            }
            .fs-meta-table th {
                width: 200px;
                font-weight: 600;
                color: #1d2327;
                background: #f6f7f7;
            }
            .fs-meta-table td {
                color: #3c434a;
            }
            .fs-meta-table pre {
                margin: 0;
                white-space: pre-wrap;
                word-wrap: break-word;
                font-family: inherit;
            }
            .fs-section-title {
                font-size: 14px;
                font-weight: 600;
                margin: 20px 0 10px;
                padding-bottom: 6px;
                border-bottom: 1px solid #c3c4c7;
            }
        </style>

        <div class="fs-section-title"><?php _e('Champs identifiés', 'form-submissions'); ?></div>
        <table class="fs-meta-table">
            <tbody>
                <tr>
                    <th><?php _e('Type de formulaire', 'form-submissions'); ?></th>
                    <td><?php echo esc_html($form_type); ?></td>
                </tr>
                <?php if (!empty($nom_complet)) : ?>
                <tr>
                    <th><?php _e('Nom complet', 'form-submissions'); ?></th>
                    <td><?php echo esc_html($nom_complet); ?></td>
                </tr>
                <?php endif; ?>
                <?php if (!empty($email)) : ?>
                <tr>
                    <th><?php _e('Email', 'form-submissions'); ?></th>
                    <td><?php echo esc_html($email); ?></td>
                </tr>
                <?php endif; ?>
                <?php if (!empty($tel_display)) : ?>
                <tr>
                    <th><?php _e('Téléphone', 'form-submissions'); ?></th>
                    <td><?php echo esc_html($tel_display); ?></td>
                </tr>
                <?php endif; ?>
                <?php if (!empty($message)) : ?>
                <tr>
                    <th><?php _e('Message', 'form-submissions'); ?></th>
                    <td><pre><?php echo esc_html($message); ?></pre></td>
                </tr>
                <?php endif; ?>
                <tr>
                    <th><?php _e('Date de réception', 'form-submissions'); ?></th>
                    <td><?php echo esc_html(get_the_date('', $post_id) . ' ' . get_the_time('', $post_id)); ?></td>
                </tr>
            </tbody>
        </table>

        <?php
        // Section 2: All raw fields
        $all_meta = get_post_meta($post_id);
        $field_meta = [];
        foreach ($all_meta as $key => $values) {
            if (strpos($key, '_field_') === 0) {
                $field_meta[$key] = $values[0] ?? '';
            }
        }

        if (!empty($field_meta)) :
        ?>
        <div class="fs-section-title"><?php _e('Tous les champs soumis', 'form-submissions'); ?></div>
        <table class="fs-meta-table">
            <thead>
                <tr>
                    <th style="width: 200px;"><?php _e('Champ', 'form-submissions'); ?></th>
                    <th><?php _e('Valeur', 'form-submissions'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($field_meta as $key => $value) : ?>
                <tr>
                    <td><?php echo esc_html(str_replace('_field_', '', $key)); ?></td>
                    <td><pre><?php echo esc_html($value); ?></pre></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php endif; ?>

        <?php
    }
}
