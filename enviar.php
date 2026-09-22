<?php
header('Content-Type: application/json; charset=UTF-8');

// Ensure POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Sanitize inputs
$name    = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email   = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$phone   = isset($_POST['phone']) ? trim(strip_tags($_POST['phone'])) : '';
$product = isset($_POST['productInterest']) ? trim(strip_tags($_POST['productInterest'])) : 'General';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

// Validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Por favor complete todos los campos obligatorios.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'El correo electrónico ingresado no es válido.']);
    exit;
}

// 1. Save message locally into a JSON log file so inquiries are never lost
$logFile = __DIR__ . '/mensajes.json';
$currentData = [];
if (file_exists($logFile)) {
    $fileContent = file_get_contents($logFile);
    if (!empty($fileContent)) {
        $currentData = json_decode($fileContent, true) ?: [];
    }
}

$newInquiry = [
    'id'        => 'msg_' . time() . '_' . rand(100, 999),
    'date'      => date('Y-m-d H:i:s'),
    'name'      => $name,
    'email'     => $email,
    'phone'     => $phone,
    'product'   => $product,
    'message'   => $message,
    'ip'        => $_SERVER['REMOTE_ADDR'] ?? 'desconocida'
];

array_unshift($currentData, $newInquiry);
@file_put_contents($logFile, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// 2. Send email notification to company
$to = 'dyhinoxsas@hotmail.com';
$subject = "Nueva Solicitud de Cotización - D&H INOX SAS de {$name}";
$emailBody = "Has recibido un nuevo mensaje desde el sitio web de D&H Inox:\n\n";
$emailBody .= "Nombre: " . $name . "\n";
$emailBody .= "Correo: " . $email . "\n";
$emailBody .= "Teléfono: " . $phone . "\n";
$emailBody .= "Equipo de Interés: " . $product . "\n";
$emailBody .= "Fecha: " . date('d/m/Y H:i') . "\n\n";
$emailBody .= "Mensaje:\n" . $message . "\n\n";
$emailBody .= "---\nD&H INOX SAS - Sistema Web Hostinger";

$headers = "From: webmaster@" . ($_SERVER['SERVER_NAME'] ?? 'hostinger.com') . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Attempt sending email via PHP mail()
@mail($to, $subject, $emailBody, $headers);

// Return JSON success
echo json_encode([
    'success' => true,
    'message' => '¡Muchas gracias! Su mensaje ha sido enviado correctamente. Un asesor técnico de D&H Inox se comunicará con usted a la brevedad.'
]);
