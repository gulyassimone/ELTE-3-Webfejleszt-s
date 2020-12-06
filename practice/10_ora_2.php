<?php
$filename = __DIR__ . "/data.json";
$raw_contents = file_get_contents($filename);
$contents2 = json_decode($raw_contents, TRUE);

//$contents2[] = 'pineapple';


/*$encode_contents = json_encode($contents2);
file_put_contents($filename,$encode_contents);*/


var_dump($contents2);

?>