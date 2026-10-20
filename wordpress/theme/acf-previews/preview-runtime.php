<?php
$atelier_icons_runtime = __DIR__ . '/preview-icons.php';
if (is_readable($atelier_icons_runtime)) {
    require_once $atelier_icons_runtime;
}

/**
 * Shared runtime for generated low-fidelity ACF Extended previews.
 */

if (!function_exists('atelier_preview_is_list')) {
    function atelier_preview_is_list($value) {
        if (!is_array($value)) {
            return false;
        }

        return $value === array() || array_keys($value) === range(0, count($value) - 1);
    }
}

if (!function_exists('atelier_preview_find_text')) {
    function atelier_preview_find_text($value, $depth = 0) {
        if ($depth > 7 || $value === null || $value === false) {
            return '';
        }

        if (is_string($value) || is_numeric($value)) {
            $text = trim(wp_strip_all_tags((string) $value));
            if ($text === '' || filter_var($text, FILTER_VALIDATE_URL)) {
                return '';
            }
            return $text;
        }

        if (!is_array($value)) {
            return '';
        }

        $priority = array(
            'content',
            'title',
            'heading',
            'label',
            'description',
            'text',
            'quote',
            'name',
        );

        foreach ($priority as $key) {
            if (array_key_exists($key, $value)) {
                $text = atelier_preview_find_text($value[$key], $depth + 1);
                if ($text !== '') {
                    return $text;
                }
            }
        }

        foreach ($value as $nested) {
            $text = atelier_preview_find_text($nested, $depth + 1);
            if ($text !== '') {
                return $text;
            }
        }

        return '';
    }
}

if (!function_exists('atelier_preview_find_image')) {
    function atelier_preview_find_image($value, $depth = 0) {
        if ($depth > 7 || !is_array($value)) {
            return null;
        }

        if (!empty($value['sizes']['medium'])) {
            return array(
                'url' => $value['sizes']['medium'],
                'alt' => isset($value['alt']) ? $value['alt'] : '',
            );
        }

        if (!empty($value['url'])) {
            $url = (string) $value['url'];
            $type = isset($value['type']) ? (string) $value['type'] : '';
            if (
                $type === 'image' ||
                preg_match('/\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i', $url)
            ) {
                return array(
                    'url' => $url,
                    'alt' => isset($value['alt']) ? $value['alt'] : '',
                );
            }
        }

        foreach ($value as $nested) {
            $image = atelier_preview_find_image($nested, $depth + 1);
            if ($image) {
                return $image;
            }
        }

        return null;
    }
}

if (!function_exists('atelier_preview_collection_rows')) {
    function atelier_preview_collection_rows($value, $depth = 0) {
        if ($depth > 5 || !is_array($value)) {
            return array();
        }

        if (atelier_preview_is_list($value)) {
            return $value;
        }

        foreach ($value as $nested) {
            $rows = atelier_preview_collection_rows($nested, $depth + 1);
            if ($rows !== array()) {
                return $rows;
            }
        }

        return array();
    }
}

if (!function_exists('atelier_preview_field_value')) {
    function atelier_preview_field_value($row, $name) {
        return is_array($row) && array_key_exists($name, $row)
            ? $row[$name]
            : null;
    }
}

if (!function_exists('atelier_preview_render_media')) {
    function atelier_preview_render_media($value, $label) {
        $image = atelier_preview_find_image($value);
        ?>
        <figure class="atelier-preview__media-card">
            <?php if ($image) : ?>
                <img
                    src="<?php echo esc_url($image['url']); ?>"
                    alt="<?php echo esc_attr($image['alt']); ?>"
                    loading="lazy"
                />
            <?php else : ?>
                <span class="atelier-preview__media-placeholder" aria-hidden="true"></span>
            <?php endif; ?>
            <figcaption><?php echo esc_html($label); ?></figcaption>
        </figure>
        <?php
$atelier_icons_runtime = __DIR__ . '/preview-icons.php';
if (is_readable($atelier_icons_runtime)) {
    require_once $atelier_icons_runtime;
}

    }
}

if (!function_exists('atelier_preview_render_collection_item')) {
    function atelier_preview_render_collection_item($item, $presentation, $index) {
        $image = atelier_preview_find_image($item);
        $text = atelier_preview_find_text($item);
        ?>
        <div class="atelier-preview__collection-item">
            <?php if ($presentation === 'timeline') : ?>
                <span class="atelier-preview__step"><?php echo esc_html($index + 1); ?></span>
            <?php endif; ?>
            <?php if ($image) : ?>
                <img
                    class="atelier-preview__item-image"
                    src="<?php echo esc_url($image['url']); ?>"
                    alt="<?php echo esc_attr($image['alt']); ?>"
                    loading="lazy"
                />
            <?php elseif (in_array($presentation, array('grid', 'carousel', 'logos'), true)) : ?>
                <span class="atelier-preview__item-media" aria-hidden="true"></span>
            <?php endif; ?>
            <span class="atelier-preview__item-text">
                <?php echo esc_html($text !== '' ? wp_html_excerpt($text, 72, '...') : 'Item ' . ($index + 1)); ?>
            </span>
            <?php if ($presentation === 'accordion') : ?>
                <span class="atelier-preview__chevron" aria-hidden="true">+</span>
            <?php endif; ?>
        </div>
        <?php
$atelier_icons_runtime = __DIR__ . '/preview-icons.php';
if (is_readable($atelier_icons_runtime)) {
    require_once $atelier_icons_runtime;
}

    }
}

if (!function_exists('atelier_preview_render_collection')) {
    function atelier_preview_render_collection($value, $field) {
        $config = isset($field['collection']) && is_array($field['collection'])
            ? $field['collection']
            : array();
        $presentation = isset($config['presentation'])
            ? (string) $config['presentation']
            : 'list';
        $limit = isset($config['previewLimit']) ? max(1, (int) $config['previewLimit']) : 4;
        $columns = isset($config['columns']) ? max(2, min(6, (int) $config['columns'])) : 3;
        $rows = atelier_preview_collection_rows($value);
        $count = count($rows);
        $visible = array_slice($rows, 0, $limit);
        ?>
        <section
            class="atelier-preview__collection atelier-preview__collection--<?php echo esc_attr($presentation); ?>"
            style="--atelier-preview-columns: <?php echo esc_attr($columns); ?>"
        >
            <header class="atelier-preview__collection-header">
                <strong><?php echo esc_html($field['label']); ?></strong>
                <span>
                    <?php echo esc_html($count . ($count === 1 ? ' item' : ' items')); ?>
                    &middot;
                    <?php echo esc_html(ucfirst($presentation)); ?>
                </span>
            </header>

            <?php if ($presentation === 'carousel') : ?>
                <span class="atelier-preview__carousel-arrow" aria-hidden="true">&lsaquo;</span>
            <?php endif; ?>

            <div class="atelier-preview__collection-items">
                <?php if ($visible === array()) : ?>
                    <?php for ($placeholder = 0; $placeholder < min($limit, $columns); $placeholder++) : ?>
                        <?php atelier_preview_render_collection_item(array(), $presentation, $placeholder); ?>
                    <?php endfor; ?>
                <?php else : ?>
                    <?php foreach ($visible as $index => $item) : ?>
                        <?php atelier_preview_render_collection_item($item, $presentation, $index); ?>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>

            <?php if ($presentation === 'carousel') : ?>
                <span class="atelier-preview__carousel-arrow atelier-preview__carousel-arrow--next" aria-hidden="true">&rsaquo;</span>
            <?php endif; ?>

            <footer class="atelier-preview__collection-footer">
                <?php if ($count === 0) : ?>
                    No items have been added yet.
                <?php elseif ($count > $limit) : ?>
                    <?php echo esc_html('Showing ' . $limit . ' of ' . $count . ' items'); ?>
                <?php else : ?>
                    All items shown
                <?php endif; ?>
            </footer>
        </section>
        <?php
$atelier_icons_runtime = __DIR__ . '/preview-icons.php';
if (is_readable($atelier_icons_runtime)) {
    require_once $atelier_icons_runtime;
}

    }
}

if (!function_exists('atelier_preview_render_content')) {
    function atelier_preview_render_content($value, $label, $primary = false) {
        $text = atelier_preview_find_text($value);
        $icon = function_exists('atelier_preview_find_icon_token')
            ? atelier_preview_find_icon_token($value)
            : '';
        ?>
        <div class="atelier-preview__text<?php echo $primary ? ' atelier-preview__text--primary' : ''; ?>">
            <span class="atelier-preview__field-label"><?php echo esc_html($label); ?></span>
            <?php if ($icon !== '') : ?>
                <?php atelier_preview_render_icon($icon); ?>
            <?php endif; ?>
            <p><?php echo esc_html($text !== '' ? wp_html_excerpt($text, $primary ? 160 : 100, '...') : 'Not filled yet'); ?></p>
        </div>
        <?php
$atelier_icons_runtime = __DIR__ . '/preview-icons.php';
if (is_readable($atelier_icons_runtime)) {
    require_once $atelier_icons_runtime;
}

    }
}

if (!function_exists('atelier_preview_render_form')) {
    function atelier_preview_render_form() {
        ?>
        <div class="atelier-preview__form" aria-label="Form layout placeholder">
            <span class="atelier-preview__form-title">Form</span>
            <span class="atelier-preview__form-field">Name</span>
            <span class="atelier-preview__form-field">Email</span>
            <span class="atelier-preview__form-field atelier-preview__form-field--wide">Message</span>
            <span class="atelier-preview__form-button">Submit button</span>
        </div>
        <?php
$atelier_icons_runtime = __DIR__ . '/preview-icons.php';
if (is_readable($atelier_icons_runtime)) {
    require_once $atelier_icons_runtime;
}

    }
}

if (!function_exists('atelier_render_section_preview')) {
    function atelier_render_section_preview($row, $definition) {
        $regions = isset($definition['regions']) && is_array($definition['regions'])
            ? $definition['regions']
            : array();
        $layout = isset($definition['layout']) ? $definition['layout'] : 'stack';
        ?>
        <section
            class="atelier-preview atelier-preview--<?php echo esc_attr($layout); ?>"
            data-section="<?php echo esc_attr($definition['name']); ?>"
        >
            <header class="atelier-preview__header">
                <span class="atelier-preview__eyebrow">Section preview</span>
                <strong class="atelier-preview__title">
                    <?php echo esc_html($definition['title']); ?>
                </strong>
                <span class="atelier-preview__layout-name">
                    <?php echo esc_html(ucfirst($layout) . ' layout'); ?>
                </span>
                <code class="atelier-preview__key">
                    <?php echo esc_html($definition['name']); ?>
                </code>
            </header>

            <div class="atelier-preview__layout">
                <?php foreach ($regions as $region) : ?>
                    <?php
$atelier_icons_runtime = __DIR__ . '/preview-icons.php';
if (is_readable($atelier_icons_runtime)) {
    require_once $atelier_icons_runtime;
}

                    $role = isset($region['role']) ? $region['role'] : 'content';
                    $fields = isset($region['fields']) && is_array($region['fields'])
                        ? $region['fields']
                        : array();
                    $static_elements = isset($region['staticElements']) && is_array($region['staticElements'])
                        ? $region['staticElements']
                        : array();
                    ?>
                    <div class="atelier-preview__region atelier-preview__region--<?php echo esc_attr($role); ?>">
                        <?php foreach ($fields as $index => $field) : ?>
                            <?php
$atelier_icons_runtime = __DIR__ . '/preview-icons.php';
if (is_readable($atelier_icons_runtime)) {
    require_once $atelier_icons_runtime;
}

                            $name = isset($field['name']) ? $field['name'] : '';
                            $value = atelier_preview_field_value($row, $name);
                            ?>
                            <div
                                class="atelier-preview__field"
                                data-preview-field="<?php echo esc_attr($name); ?>"
                                role="button"
                                tabindex="0"
                                aria-label="<?php echo esc_attr('Edit ' . $field['label']); ?>"
                            >
                                <?php if ($field['kind'] === 'collection') : ?>
                                    <?php atelier_preview_render_collection($value, $field); ?>
                                <?php elseif ($field['kind'] === 'media') : ?>
                                    <?php atelier_preview_render_media($value, $field['label']); ?>
                                <?php else : ?>
                                    <?php atelier_preview_render_content($value, $field['label'], $index === 0 && $role === 'content'); ?>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>

                        <?php foreach ($static_elements as $static_element) : ?>
                            <?php if ($static_element === 'form') : ?>
                                <?php atelier_preview_render_form(); ?>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </section>
        <?php
$atelier_icons_runtime = __DIR__ . '/preview-icons.php';
if (is_readable($atelier_icons_runtime)) {
    require_once $atelier_icons_runtime;
}

    }
}