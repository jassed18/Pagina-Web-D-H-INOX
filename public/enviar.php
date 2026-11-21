<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'mailSent' => false, 'message' => 'Método no permitido']);
    exit;
}

// Sanitize inputs
$name    = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email   = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$phone   = isset($_POST['phone']) ? trim(strip_tags($_POST['phone'])) : '';
$product = isset($_POST['productInterest']) ? trim(strip_tags($_POST['productInterest'])) : 'General';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

// Prevent header injection
$safeName  = str_replace(["\r", "\n"], '', $name);
$safeEmail = str_replace(["\r", "\n"], '', $email);

if (empty($safeName) || empty($safeEmail) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'mailSent' => false, 'message' => 'Por favor complete todos los campos obligatorios.']);
    exit;
}

if (!filter_var($safeEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'mailSent' => false, 'message' => 'El correo electrónico ingresado no es válido.']);
    exit;
}

// Save inquiry log locally
$logFile = __DIR__ . '/mensajes.json';
$currentData = [];
if (file_exists($logFile)) {
    $fileContent = @file_get_contents($logFile);
    if (!empty($fileContent)) {
        $currentData = json_decode($fileContent, true) ?: [];
    }
}

$newInquiry = [
    'id'      => 'msg_' . time() . '_' . rand(100, 999),
    'date'    => date('Y-m-d H:i:s'),
    'name'    => $safeName,
    'email'   => $safeEmail,
    'phone'   => $phone,
    'product' => $product ?: 'No especificado',
    'message' => $message,
    'ip'      => $_SERVER['REMOTE_ADDR'] ?? 'desconocida'
];

array_unshift($currentData, $newInquiry);
@file_put_contents($logFile, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Send email notification to dyhinoxsas@hotmail.com with proper UTF-8 MIME headers
$to = 'dyhinoxsas@hotmail.com';
$rawSubject = "Nueva Solicitud de Cotización - D&H INOX SAS ({$safeName})";
$encodedSubject = '=?UTF-8?B?' . base64_encode($rawSubject) . '?=';

$emailBody  = "Has recibido una nueva solicitud de cotización desde el sitio web de D&H Inox:\n\n";
$emailBody .= "Nombre / Empresa: " . $safeName . "\n";
$emailBody .= "Correo: " . $safeEmail . "\n";
$emailBody .= "Teléfono: " . ($phone !== '' ? $phone : 'No especificado') . "\n";
$emailBody .= "Equipo de Interés: " . ($product !== '' ? $product : 'No especificado') . "\n";
$emailBody .= "Fecha: " . date('d/m/Y H:i') . "\n\n";
$emailBody .= "Mensaje / Requerimientos Técnicos:\n" . $message . "\n\n";
$emailBody .= "---\nD&H INOX SAS - Formulario Web";

$serverHost = preg_replace('/[^a-zA-Z0-9.-]/', '', $_SERVER['SERVER_NAME'] ?? 'dyhinox.com');
if (empty($serverHost) || $serverHost === 'localhost') {
    $serverHost = 'dyhinox.com';
}

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "From: D&H Inox Web <no-reply@" . $serverHost . ">\r\n";
$headers .= "Reply-To: " . $safeEmail . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$mailSent = @mail($to, $encodedSubject, $emailBody, $headers);

echo json_encode([
    'success'  => true,
    'mailSent' => (bool)$mailSent,
    'message'  => $mailSent
        ? '¡Solicitud enviada correctamente al correo dyhinoxsas@hotmail.com!'
        : 'Solicitud registrada en el servidor; procesando respaldo de correo.'
]);
