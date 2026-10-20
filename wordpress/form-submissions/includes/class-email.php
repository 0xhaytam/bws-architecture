<?php
/**
 * Email Notifications
 *
 * Sends plain text email notifications for form submissions.
 * Supports French field labels.
 */

if (!defined('ABSPATH')) {
    exit;
}

class FS_Email {

    private $field_labels = [
        'nom' => 'Nom',
        'prenom' => 'Prénom',
        'name' => 'Nom complet',
        'email' => 'Email',
        'telephone' => 'Téléphone',
        'phone' => 'Téléphone',
        'message' => 'Message',
        'company' => 'Société',
        'subject' => 'Sujet',
    ];

    public function send($form_type, $fields) {
        $to = get_option('fs_notification_email', '');
        if (empty($to)) {
            $to = get_option('admin_email');
        }
        $site_name = get_bloginfo('name');

        $subject = sprintf('[%s] Nouveau formulaire %s', $site_name, $this->format_form_type($form_type));

        $body = sprintf("Nouvelle soumission sur %s\n\n", $site_name);
        $body .= sprintf("Type de formulaire: %s\n", $this->format_form_type($form_type));
        $body .= sprintf("Date: %s\n\n", current_datetime()->format('Y-m-d H:i:s'));
        $body .= "--- Informations ---\n\n";

        foreach ($fields as $key => $value) {
            $label = $this->get_label($key);
            $body .= sprintf("%s: %s\n", $label, $value);
        }

        $body .= "\n---\n";
        $body .= sprintf("Voir toutes les soumissions: %s\n", admin_url('edit.php?post_type=form_submission'));

        $headers = ['Content-Type: text/plain; charset=UTF-8'];

        $result = wp_mail($to, $subject, $body, $headers);

        if (!$result) {
            error_log('Form Submissions: wp_mail() failed for submission type ' . $form_type);
        }

        return $result;
    }

    private function get_label($key) {
        return isset($this->field_labels[$key])
            ? $this->field_labels[$key]
            : ucfirst(str_replace('_', ' ', $key));
    }

    private function format_form_type($type) {
        $labels = [
            'contact' => 'Contact',
            'convention' => 'Convention',
            'devis' => 'Devis',
            'newsletter' => 'Newsletter',
        ];
        return isset($labels[$type]) ? $labels[$type] : ucfirst($type);
    }
}
