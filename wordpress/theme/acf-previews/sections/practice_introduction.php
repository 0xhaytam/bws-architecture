<?php
/**
 * Generated low-fidelity editor preview for practice_introduction.
 * The Astro component remains the source of truth for frontend rendering.
 */
require_once dirname(__DIR__) . '/preview-runtime.php';

$atelier_row = function_exists('get_row') ? get_row(true) : array();
$atelier_definition = json_decode('{"name":"practice_introduction","title":"Accueil — Présentation du cabinet","layout":"split","regions":[{"role":"media","fields":[{"name":"image","label":"Image du cabinet","kind":"media"},{"name":"imageCaption","label":"Légende","kind":"content"}]},{"role":"content","fields":[{"name":"indexLabel","label":"Repère","kind":"content"},{"name":"headline","label":"Titre","kind":"content"},{"name":"paragraphs","label":"Paragraphes","kind":"collection","collection":{"field":"paragraphs","presentation":"list","previewLimit":3}},{"name":"agencyAction","label":"Lien vers le cabinet","kind":"content"}]}]}', true);

atelier_render_section_preview(
    is_array($atelier_row) ? $atelier_row : array(),
    is_array($atelier_definition) ? $atelier_definition : array()
);
