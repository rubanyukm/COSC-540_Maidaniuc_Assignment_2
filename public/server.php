<?php

// Set the header
header('Content-Type: application/json');

// Try catch incase there's a server error
try {
    // Read the request send by browser.js
    $body = json_decode(file_get_contents('php://input'), true);
    // If there is no date send then throw a null
    $date = $body['date'] ?? null;
    // Throwing a null display this error
    if (!$date) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing "date"']);
        exit;
    }

    // Build prompt 
    $prompt = "Give me a list of 3 important events that occurred on this date: {$date}";

    // API key, trimming it to get rid of any unnecessary spaces 
    $apiKey = trim("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");

    // Choosing model, setting personality, sending prompt, and setting maximum tokens amount since it costs money
    $payload = [
        'model' => 'gpt-4o-mini',
        'messages' => [
            ['role' => 'system', 'content' => 'You are a helpful assistant. Keep answers concise.'],
            ['role' => 'user',   'content' => $prompt],
        ],
        'max_tokens' => 300
    ];

    // cURL calls to the chat completions API
    $ch = curl_init('https://api.openai.com/v1/chat/completions');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "Authorization: Bearer $apiKey"
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Getting the response
    $respBody = curl_exec($ch);
    // Closing cURL
    curl_close($ch);

    // Decoding the response JSON
    $data = json_decode($respBody, true);

    // Extracting GPT response from the decoded JSON array
    $reply = $data['choices'][0]['message']['content'] ?? null;

    // Encode it back into JSON and send to the front-end
    echo json_encode(['ok' => true, 'date' => $date, 'reply' => $reply]);

// Catch any error
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server exception', 'detail' => $e->getMessage()]);
}

?>