<?php
declare(strict_types=1);
//print_r($_GET);

$hibak = [];
$data = [];

function elsofoku(float $a, float $b): float
{
    return -$b / $a;
}

if(count($_GET)>0){
    if (validate($_GET, $data, $hibak)) {
        $a = (float)$data['a'];
        $b = (float)$data['b'];
        $x = elsofoku($a, $b);
    }
}
function validate($get, &$data, &$hibak): bool
{
    if (!isset($get['a'])) {
        $hibak['a'] = "Hiányzik az a";
    } else if ((trim($get['a']) === "")) {
        $hibak['a'] = "Hiányzik az a";
    } else if (filter_var($get["a"], FILTER_VALIDATE_FLOAT) === false) {
        $hibak['a'] = "Az a nem szám";
    } else {
        $a = (float)$get['a'];
        if ($a === 0.0) {
            $hibak['a'] = 'Az "a" nem lehet 0';
        } else {
            $data['a'] = $a;
        }
    }
    if (!isset($get['b'])) {
        $hibak['b'] = "Hiányzik az b";
    } else if ((trim($get['b']) === "")) {
        $hibak['b'] = "Hiányzik az b";
    } else if (filter_var($get["b"], FILTER_VALIDATE_FLOAT) === false) {
        $hibak['b'] = '"A "b" nem szám';
    } else {
        $data['b'] = (float)$get['b'];
    }
    return count($hibak) === 0;
}

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Elsőfokú egyenlet megoldása</title>
</head>
<body>
<?php if (count($hibak) > 0) : ?>
    <ul>
        <?php foreach ($hibak as $hiba) : ?>
            <li><?= $hiba ?></li>
        <?php endforeach; ?>
    </ul>
<?php endif; ?>
<h1>Elsőfokú egyenlet: ax + b = 0</h1>
<form action="elsofoku.php" method="get">
    a = <input id="a" name="a" value="<?=$_GET['a']??''?>">
    <?php if(isset($hibak['a'])) : ?>
    <span><?=$hibak['a'] ?></span>
    <?php endif; ?>
    <br>
    b = <input id="b" name="b" value="<?=$_GET['b']??''?>">

    <?php if(isset($hibak['b'])) : ?>
        <span><?=$hibak['b'] ?></span>
    <?php endif; ?>
    <br>
    <button>Számol</button>
</form>
<?php if (isset($x)) : ?>
    <p>x = <?= $x ?></p>
<?php endif; ?>
</body>
</html>