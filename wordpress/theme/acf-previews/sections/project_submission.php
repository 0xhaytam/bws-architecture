<?php
/**
 * Generated low-fidelity editor preview for project_submission.
 * The Astro component remains the source of truth for frontend rendering.
 */
require_once dirname(__DIR__) . '/preview-runtime.php';

$atelier_row = function_exists('get_row') ? get_row(true) : array();
$atelier_definition = json_decode('{"name":"project_submission","title":"Contact — Formulaire de projet","layout":"split","regions":[{"role":"content","fields":[{"name":"kicker","label":"Repère","kind":"content"},{"name":"headline","label":"Titre","kind":"content"},{"name":"introduction","label":"Introduction","kind":"content"},{"name":"guidance","label":"Texte d\'accompagnement","kind":"collection","collection":{"field":"guidance","presentation":"list","previewLimit":5}}]},{"role":"aside","staticElements":["form"],"fields":[{"name":"submitLabel","label":"Libellé du bouton","kind":"content"},{"name":"privacyNote","label":"Note de confidentialité","kind":"content"}]}]}', true);

atelier_render_section_preview(
    is_array($atelier_row) ? $atelier_row : array(),
    is_array($atelier_definition) ? $atelier_definition : array()
);
