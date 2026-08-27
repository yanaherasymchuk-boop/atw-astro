<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://atwdetailing.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request.']);
    exit;
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
$company = trim((string)($data['company'] ?? ''));
$startedAt = (int)($data['startedAt'] ?? 0);

// Honeypot: silently accept bots.
if ($company !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

// Basic anti-bot timing check.
$now = (int) round(microtime(true) * 1000);
if ($startedAt > 0 && ($now - $startedAt) < 2500) {
    http_response_code(429);
    echo json_encode(['error' => 'Please wait a moment and try again.']);
    exit;
}

if ($name === '' || mb_strlen($name) > 80) {
    http_response_code(400);
    echo json_encode(['error' => 'Please enter your name.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 160) {
    http_response_code(400);
    echo json_encode(['error' => 'Please enter a valid email.']);
    exit;
}

if ($message === '' || mb_strlen($message) > 3000) {
    http_response_code(400);
    echo json_encode(['error' => 'Please enter your message.']);
    exit;
}

$to = 'atwcardetailing@gmail.com';
$subject = 'ATW Website Contact — ' . $name;

$body =
    "New message from ATW Detailing website\n\n" .
    "Name: {$name}\n" .
    "Email: {$email}\n\n" .
    "Message:\n{$message}\n";

$headers = [
    'From: ATW Website <website@atwdetailing.com>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8'
];

$sent = mail(
    $to,
    $subject,
    $body,
    implode("\r\n", $headers)
);

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Could not send message. Please text or email us instead.'
    ]);
    exit;
}

echo json_encode(['ok' => true]);
