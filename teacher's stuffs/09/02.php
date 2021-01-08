<?php
print_r($_GET);
// Beolvasás
// http://webprogramozas.inf.elte.hu/hallgatok/gyozke/wp2020/09/02.php?name=Győző
$name = 'Anonymous';
if (isset($_GET['name']) && trim($_GET['name']) !== '') {
  $name = $_GET['name'];
}
// Feldolgozás

// Kiírás
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello név</title>
</head>
<body>
  <h1>Hello <?= $name ?>!</h1>
  <form action="" method="get">
    Name: <input type="text" name="name" value="<?= $name ?>">
    <button>Greet</button>
  </form>
</body>
</html>