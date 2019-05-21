
<?php

function error_handler($error) {
    $output = [
        'success' => false,
        'error' => $error -> getMessage()
    ];

    $json_output = json_encode($output);

    echo $json_output;
}


?>