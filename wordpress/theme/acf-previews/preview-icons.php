<?php
/**
 * Generated icon helpers for low-fidelity ACF previews.
 */

if (!function_exists('atelier_preview_icon_manifest')) {
    function atelier_preview_icon_manifest() {
        static $manifest = null;
        if ($manifest !== null) {
            return $manifest;
        }

        $path = __DIR__ . '/icon-manifest.json';
        if (!is_readable($path)) {
            $manifest = array();
            return $manifest;
        }

        $decoded = json_decode((string) file_get_contents($path), true);
        $manifest = is_array($decoded) ? $decoded : array();
        return $manifest;
    }
}

if (!function_exists('atelier_preview_find_icon_token')) {
    function atelier_preview_find_icon_token($value, $depth = 0) {
        if ($depth > 7 || $value === null || $value === false) {
            return '';
        }

        $manifest = atelier_preview_icon_manifest();
        if (is_string($value) && isset($manifest[$value])) {
            return $value;
        }
        if (!is_array($value)) {
            return '';
        }

        foreach (array('icon', 'iconName', 'leftIconName', 'rightIconName', 'name') as $key) {
            if (isset($value[$key]) && is_string($value[$key]) && isset($manifest[$value[$key]])) {
                return $value[$key];
            }
        }

        foreach ($value as $nested) {
            $token = atelier_preview_find_icon_token($nested, $depth + 1);
            if ($token !== '') {
                return $token;
            }
        }
        return '';
    }
}

if (!function_exists('atelier_preview_icon_url')) {
    function atelier_preview_icon_url($token) {
        $manifest = atelier_preview_icon_manifest();
        if (!isset($manifest[$token]['file'])) {
            return '';
        }

        $relative = '/acf-previews/' . ltrim((string) $manifest[$token]['file'], '/');
        $stylesheet_path = get_stylesheet_directory() . $relative;
        if (is_readable($stylesheet_path)) {
            return get_stylesheet_directory_uri() . $relative;
        }

        $template_path = get_template_directory() . $relative;
        return is_readable($template_path)
            ? get_template_directory_uri() . $relative
            : '';
    }
}

if (!function_exists('atelier_preview_render_icon')) {
    function atelier_preview_render_icon($token) {
        $url = atelier_preview_icon_url($token);
        if ($url === '') {
            return;
        }
        ?>
        <img
            class="atelier-preview__icon"
            src="<?php echo esc_url($url); ?>"
            alt=""
            data-preview-icon="<?php echo esc_attr($token); ?>"
            loading="lazy"
        />
        <?php
    }
}
