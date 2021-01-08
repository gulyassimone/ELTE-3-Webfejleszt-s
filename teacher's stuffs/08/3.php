<?php
declare(strict_types=1);
function factorial(int $n): int {
  // ...
  return 120;
}

// Beolvasás
$n = 3;

// Feldolgozás
$f = factorial($n);

// Kiírás
?>
<!DOCTYPE html>
<meta charset="UTF-8">
<title>Document</title>

<h1>Faktoriális</h1>
<p><?= $n ?>! = <?= $f ?></p>