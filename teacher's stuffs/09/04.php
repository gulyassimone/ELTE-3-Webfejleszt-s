<?php
print_r($_GET);
if (isset($_GET['a']) && isset($_GET['b'])) {
  // Beolvasás
  $a = $_GET['a'];
  $b = $_GET['b'];

  
  // Feldolgozás
  $x = -$b / $a;
}

// Kiírás
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elsőfokú</title>
</head>
<body>
  <h1>Elsőfokú egyenlet: ax+b=0</h1>
  <form action="">
    a = <input type="text" name="a"> <br>
    b = <input type="text" name="b"> <br>
    <button>Számol</button>
  </form>
  <?php if (isset($x)) : ?>
    <p>x = <?= $x ?></p>
  <?php endif ?>
</body>
</html>