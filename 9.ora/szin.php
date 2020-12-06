<?php
print_r($_GET);
$bgcolor = "#888888";
if (isset($_GET["bgcolor"])) {
    $re = '/^#[0-9a-f]{6}$/i';
    $str = $_GET['bgcolor'];
    if (preg_match($re, $str) === 1) {
        $bgcolor = $_GET["bgcolor"];
    }
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body {
            background-color: <?=$bgcolor?>;
        }
    </style>
</head>
<body>
<a href="elsofoku.html?bgcolor=%2300ff00">Zöld</a>
<form action="" method="get">
    <input type="color" name="bgcolor" value="<?= $bgcolor ?>">
    <button>Háttérszín beállítása</button>
</form>

</body>
</html>
