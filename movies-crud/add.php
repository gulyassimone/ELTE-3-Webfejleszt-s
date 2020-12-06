<?php
include('moviestorage.php');
print_r($_POST);
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
// főprogram
$data = [];
$errors = [];
if (count($_POST) > 0) {
  if (validate($_POST, $data, $errors)) {
    // beolvasás
    // $title = $data['title'];
    // $year = $data['year'];
    // // extract($data);
    // feldolgozás
    $movieStorage = new MovieStorage();
    $movieStorage->add($data);
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
  <title>Új film hozzáadása</title>
  <style>
    input + small {
      color: red;
    }
  </style>
</head>
<body>
  <h1>Mozifilmek</h1>
  <h2>Új film hozzaadása</h2>
  <form action="" method="post">
    
    Cím: <input type="text" name="title" 
          value="<?= $_POST['title'] ?? '' ?>"> 
    <?php if (isset($errors['title'])) : ?>
      <small><?= $errors['title'] ?></small>
    <?php endif ?>
    <br>
    
    Év: <input type="number" name="year"
         value="<?= $_POST['year'] ?? '' ?>"> 
    <?php if (isset($errors['year'])) : ?>
      <small><?= $errors['year'] ?></small>
    <?php endif ?>
    <br>

    <button type="submit">Új film hozzáadása</button>
  </form>
</body>
</html>