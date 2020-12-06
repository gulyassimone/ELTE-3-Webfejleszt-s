<?php
include('moviestorage.php');
$movieStorage = new MovieStorage();

// függvények
function validate($post, &$data, &$errors) {
  if (!isset($post['title'])) {
    $errors['title'] = 'A cím megadása kötelező';
  }
  else if (trim($post['title']) === '') {
    $errors['title'] = 'A cím megadása kötelező';
  }
  else {
    $data['title'] = $post['title'];
  }

  if (!isset($post['year']) || trim($post['year']) === '') {
    $data['year'] = NULL;  
  } 
  else if (!filter_var($post['year'], FILTER_VALIDATE_INT)) {
    $errors['year'] = 'Az év rossz számformátumú!';
  } else {
    $year = (int)$post['year'];
    if ($year < 1900 || $year > 2100) {
      $errors['year'] = 'Az év nem esik 1900 és 2100 közé!';
    } else {
      $data['year'] = $year;
    }
  }

  return count($errors) === 0;
}

// beolvasás
$data = [];
$errors = [];

if (!isset($_GET['id'])) {
  header('Location: add.php');
  exit();
}
$id = $_GET['id'];
$movie = $movieStorage->findById($id);
if (!$movie) {
  $errors['global'] = 'Nem létező id';
}

// űrlapfeldolgozás
if (count($_POST) > 0) {
  if (validate($_POST, $data, $errors)) {
    // feldolgozás
    $data['id'] = $id;
    $movieStorage->update($id, $data);
    header('Location: index.php');
    exit();
  }
}

// kiírás
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Film módosítása</title>
  <style>
    input + small {
      color: red;
    }
    .error {
      color: red;
    }
  </style>
</head>
<body>
  <h1>Mozifilmek</h1>
  <?php if (isset($errors['global'])) : ?>
    <p class="error"><?= $errors['global'] ?></p>
    <p><a href="index.php">Vissza a főoldalra</a></p>
  <?php endif ?>
  <h2>Film módosítása</h2>
  <form action="" method="post">
    
    Cím: <input type="text" name="title" 
          value="<?= $_POST['title'] ?? $movie['title'] ?>"> 
    <?php if (isset($errors['title'])) : ?>
      <small><?= $errors['title'] ?></small>
    <?php endif ?>
    <br>
    
    Év: <input type="number" name="year"
         value="<?= $_POST['year'] ?? $movie['year'] ?? '' ?>"> 
    <?php if (isset($errors['year'])) : ?>
      <small><?= $errors['year'] ?></small>
    <?php endif ?>
    <br>

    <button type="submit">Film módosítása</button>
  </form>
</body>
</html>