<?php
// Beolvasás

// Feldolgozás

// Kiírás
?>
<!DOCTYPE html>
<meta charset="UTF-8">
<title>Document</title>

<?php for ($i = 1; $i <=10; $i++) : ?>
  <p style="font-size: <?= $i*5 ?>px;">Hello világ!</p>
<?php endfor ?>