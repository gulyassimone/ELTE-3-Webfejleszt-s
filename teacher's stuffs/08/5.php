<?php
// Beolvasás
$errors = [
  'error1',
  'error2',
  'error3',
];

// Feldolgozás

// Kiírás
?>
<!DOCTYPE html>
<meta charset="UTF-8">
<title>Document</title>

<ul>
  <?php foreach($errors as $error) : ?>
    <li><?= $error ?></li>
  <?php endforeach ?>
</ul>