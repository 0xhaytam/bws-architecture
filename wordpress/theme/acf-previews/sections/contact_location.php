<?php
/**
 * Generated low-fidelity editor preview for contact_location.
 * The Astro component remains the source of truth for frontend rendering.
 */
require_once dirname(__DIR__) . '/preview-runtime.php';

$atelier_row = function_exists('get_row') ? get_row(true) : array();
$atelier_definition = json_decode('{"name":"contact_location","title":"Contact — Zone d\'intervention","layout":"split","regions":[{"role":"media","fields":[{"name":"mapEmbedUrl","label":"URL d\'intégration Google Maps","kind":"content"}]},{"role":"content","fields":[{"name":"kicker","label":"Repère","kind":"content"},{"name":"headline","label":"Titre","kind":"content"},{"name":"introduction","label":"Introduction","kind":"content"},{"name":"address","label":"Adresse","kind":"content"},{"name":"serviceNote","label":"Zone d\'intervention","kind":"content"},{"name":"directionsAction","label":"Lien d\'itinéraire","kind":"content"}]}]}', true);

atelier_render_section_preview(
    is_array($atelier_row) ? $atelier_row : array(),
    is_array($atelier_definition) ? $atelier_definition : array()
);
