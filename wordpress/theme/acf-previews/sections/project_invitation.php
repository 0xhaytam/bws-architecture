<?php
/**
 * Generated low-fidelity editor preview for project_invitation.
 * The Astro component remains the source of truth for frontend rendering.
 */
require_once dirname(__DIR__) . '/preview-runtime.php';

$atelier_row = function_exists('get_row') ? get_row(true) : array();
$atelier_definition = json_decode('{"name":"project_invitation","title":"Accueil — Échange","layout":"split","regions":[{"role":"media","fields":[{"name":"image","label":"Image architecturale","kind":"media"},{"name":"imageCaption","label":"Légende de l\'image","kind":"content"},{"name":"contactItems","label":"Coordonnées","kind":"collection","collection":{"field":"contactItems","presentation":"list","previewLimit":4}}]},{"role":"content","staticElements":["form"],"fields":[{"name":"kicker","label":"Repère","kind":"content"},{"name":"headline","label":"Titre","kind":"content"},{"name":"description","label":"Description","kind":"content"},{"name":"submitLabel","label":"Libellé du bouton","kind":"content"},{"name":"privacyNote","label":"Note de confidentialité","kind":"content"}]}]}', true);

atelier_render_section_preview(
    is_array($atelier_row) ? $atelier_row : array(),
    is_array($atelier_definition) ? $atelier_definition : array()
);
