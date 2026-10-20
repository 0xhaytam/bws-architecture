<?php
/**
 * Generated low-fidelity editor preview for project_call_to_action.
 * The Astro component remains the source of truth for frontend rendering.
 */
require_once dirname(__DIR__) . '/preview-runtime.php';

$atelier_row = function_exists('get_row') ? get_row(true) : array();
$atelier_definition = json_decode('{"name":"project_call_to_action","title":"Projet — Appel à l\'action final","layout":"split","regions":[{"role":"media","fields":[{"name":"image","label":"Image","kind":"media"},{"name":"imageCaption","label":"Légende de l\'image","kind":"content"}]},{"role":"content","fields":[{"name":"kicker","label":"Repère","kind":"content"},{"name":"headline","label":"Titre","kind":"content"},{"name":"description","label":"Description","kind":"content"},{"name":"actions","label":"Actions","kind":"collection"}]}]}', true);

atelier_render_section_preview(
    is_array($atelier_row) ? $atelier_row : array(),
    is_array($atelier_definition) ? $atelier_definition : array()
);
