
<?php

function error_handler($error) {
    $output = [
        'success' => false,
        'error' => $error -> getMessage(),
    ];
    http_response_code();
    $json_output = json_encode($output);

    echo $json_output;
}


?>