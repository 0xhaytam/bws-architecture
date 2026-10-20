<?php
/**
 * Generated low-fidelity editor preview for architectural_approach.
 * The Astro component remains the source of truth for frontend rendering.
 */
require_once dirname(__DIR__) . '/preview-runtime.php';

$atelier_row = function_exists('get_row') ? get_row(true) : array();
$atelier_definition = json_decode('{"name":"architectural_approach","title":"Accueil — Approche architecturale","layout":"grid","regions":[{"role":"content","fields":[{"name":"kicker","label":"Repère","kind":"content"},{"name":"headline","label":"Titre","kind":"content"},{"name":"introduction","label":"Introduction","kind":"content"}]},{"role":"aside","fields":[{"name":"principles","label":"Principes","kind":"collection","collection":{"field":"principles","presentation":"timeline","previewLimit":6}}]}]}', true);

atelier_render_section_preview(
    is_array($atelier_row) ? $atelier_row : array(),
    is_array($atelier_definition) ? $atelier_definition : array()
);
