<?php
/**
 * Generated low-fidelity editor preview for contact_reassurance.
 * The Astro component remains the source of truth for frontend rendering.
 */
require_once dirname(__DIR__) . '/preview-runtime.php';

$atelier_row = function_exists('get_row') ? get_row(true) : array();
$atelier_definition = json_decode('{"name":"contact_reassurance","title":"Contact — Premier échange","layout":"grid","regions":[{"role":"content","fields":[{"name":"kicker","label":"Repère","kind":"content"},{"name":"headline","label":"Titre","kind":"content"},{"name":"description","label":"Description","kind":"content"},{"name":"action","label":"Action","kind":"content"}]},{"role":"aside","fields":[{"name":"points","label":"Points de cadrage","kind":"collection","collection":{"field":"points","presentation":"list","previewLimit":6}}]}]}', true);

atelier_render_section_preview(
    is_array($atelier_row) ? $atelier_row : array(),
    is_array($atelier_definition) ? $atelier_definition : array()
);
