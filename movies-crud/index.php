<?php
include('moviestorage.php');
// beolvasás
$movieStorage = new MovieStorage();
$movies = $movieStorage->findAll();
// kiírás
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mozifilmek</title>
  <style>
    ul form {
      display: inline-block;
    }
  </style>
</head>
<body>
  <h1>Mozifilmek</h1>
  <a href="add.php">Új film hozzáadása...</a>
  <ul>
    <?php foreach($movies as $movie) : ?>
      <li>
        <?= $movie['title'] ?> (<?= $movie['year'] ?>)
        <a href="modify.php?id=<?= $movie['id'] ?>">Módosít</a>
        <form action="remove.php?id=<?= $movie['id'] ?>" method="post">
          <button>Töröl</button>
        </form>
      </li>
    <?php endforeach ?>
  </ul>
</body>
</html>