<?php
/**
 * Generated low-fidelity editor preview for project_gallery.
 * The Astro component remains the source of truth for frontend rendering.
 */
require_once dirname(__DIR__) . '/preview-runtime.php';

$atelier_row = function_exists('get_row') ? get_row(true) : array();
$atelier_definition = json_decode('{"name":"project_gallery","title":"Accueil — Réalisations","layout":"stack","regions":[{"role":"content","fields":[{"name":"kicker","label":"Repère","kind":"content"},{"name":"headline","label":"Titre","kind":"content"},{"name":"introduction","label":"Introduction","kind":"content"},{"name":"projects","label":"Projets","kind":"collection","collection":{"field":"projects","presentation":"grid","columns":3,"previewLimit":6}}]}]}', true);

atelier_render_section_preview(
    is_array($atelier_row) ? $atelier_row : array(),
    is_array($atelier_definition) ? $atelier_definition : array()
);
