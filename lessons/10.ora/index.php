<?php
include ("MovieStorage.php");
$movieStorage = new MovieStorage();
$movies = $movieStorage->findAll();
print_r($movies);

?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mozifilmek</title>
</head>
<body>
    <h1>Mozifilmek</h1>
<ul>
    <?php foreach ($movies as $movie) :?>
        <li><?= $movie['title']?>(<?= $movie['year'] ?>)</li>
    <a href = "modified.php?id=<?= $movie['id'] ?>">Módosítás</a>
    <?php endforeach;?>
</ul>
</body>
</html>

