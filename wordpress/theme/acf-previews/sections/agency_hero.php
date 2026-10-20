<?php
/**
 * Generated low-fidelity editor preview for agency_hero.
 * The Astro component remains the source of truth for frontend rendering.
 */
require_once dirname(__DIR__) . '/preview-runtime.php';

$atelier_row = function_exists('get_row') ? get_row(true) : array();
$atelier_definition = json_decode('{"name":"agency_hero","title":"Agence — Hero","layout":"split","regions":[{"role":"content","fields":[{"name":"kicker","label":"Repère","kind":"content"},{"name":"headline","label":"Titre principal","kind":"content"},{"name":"description","label":"Introduction","kind":"content"},{"name":"actions","label":"Actions","kind":"collection"}]},{"role":"media","fields":[{"name":"primaryImage","label":"Image principale","kind":"media"},{"name":"detailImage","label":"Image de détail","kind":"media"},{"name":"imageCaption","label":"Légende","kind":"content"}]}]}', true);

atelier_render_section_preview(
    is_array($atelier_row) ? $atelier_row : array(),
    is_array($atelier_definition) ? $atelier_definition : array()
);
