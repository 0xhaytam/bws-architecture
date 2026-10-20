<?php
/**
 * Generated low-fidelity editor preview for expertise_introduction.
 * The Astro component remains the source of truth for frontend rendering.
 */
require_once dirname(__DIR__) . '/preview-runtime.php';

$atelier_row = function_exists('get_row') ? get_row(true) : array();
$atelier_definition = json_decode('{"name":"expertise_introduction","title":"Expertise — Introduction éditoriale","layout":"split","regions":[{"role":"content","fields":[{"name":"kicker","label":"Repère","kind":"content"},{"name":"headline","label":"Titre","kind":"content"},{"name":"lead","label":"Texte principal","kind":"content"},{"name":"paragraphs","label":"Paragraphes complémentaires","kind":"collection","collection":{"field":"paragraphs","presentation":"list","previewLimit":4}}]},{"role":"media","fields":[{"name":"image","label":"Image","kind":"media"},{"name":"imageCaption","label":"Légende de l\'image","kind":"content"}]}]}', true);

atelier_render_section_preview(
    is_array($atelier_row) ? $atelier_row : array(),
    is_array($atelier_definition) ? $atelier_definition : array()
);
