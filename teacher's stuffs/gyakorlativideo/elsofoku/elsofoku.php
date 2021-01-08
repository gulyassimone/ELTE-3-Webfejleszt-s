<?php
declare(strict_types=1);
// print_r($_GET);
// függvények
function elsofoku(float $a, float $b): float {
  return -$b / $a;
}
function validate($get, 
                  &$data, &$hibak): bool {
  if (!isset($get['a'])) {
    $hibak['a'] = 'Hiányzik a "a"';
  }
  else if (trim($get['a']) === '') {
    $hibak['a'] = 'Hiányzik a "a"';
  }
  else if (filter_var($get['a'], FILTER_VALIDATE_FLOAT) === false) {
    $hibak['a'] = 'Az "a" nem szám';
  }
  else {
    $a = (float)$get['a'];
    if ($a === 0.0) {
      $hibak['a'] = 'Az "a" nem lehet 0';
    } else {
      $data['a'] = $a;
    }
  }
  
  if (!isset($get['b'])) {
    $hibak['b'] = 'Hiányzik a "b"';
  }
  else if (trim($get['b']) === '') {
    $hibak['b'] = 'Hiányzik a "b"';
  }
  else if (filter_var($get['b'], FILTER_VALIDATE_FLOAT) === false) {
    $hibak['b'] = 'Az "b" nem szám';
  }
  else {
    $data['b'] = (float)$get['b'];
  }

  return count($hibak) === 0;
}
// főprogram
// beolvasás + ellenőrzés
$hibak = [];
$data = [];
if (count($_GET) > 0) {
  if (validate($_GET, $data, $hibak)) {
    // beolvasás
    $a = $data['a'];
    $b = $data['b'];
    // feldolgozás
    $x = elsofoku($a, $b);
  }
}
// kiírás
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elsőfokú egyenlet megoldása</title>
  <style>
    input + span {
      color: red;
    }
  </style>
</head>
<body>
  <h1>Elsőfokú egyenlet: ax + b = 0</h1>
  
  <?php if (count($hibak) > 0) : ?>
    <ul>
      <?php foreach ($hibak as $hiba) : ?>
        <li><?= $hiba ?></li>
      <?php endforeach ?>
    </ul>
  <?php endif ?>

  <form action="elsofoku.php" method="get">
    a = <input type="text" name="a" value="<?= $_GET['a'] ?? '1' ?>"> 
    <?php if (isset($hibak['a'])) : ?>
      <span><?= $hibak['a'] ?></span>
    <?php endif ?>
    <br>

    b = <input type="text" name="b" value="<?= $_GET['b'] ?? '1' ?>"> 
    <?php if (isset($hibak['b'])) : ?>
      <span><?= $hibak['b'] ?></span>
    <?php endif ?>
    <br>
    <button>Számol</button>
  </form>

  <?php if (isset($x)) : ?>
    <p>x = <?= $x ?></p>
  <?php endif ?>
</body>
</html>