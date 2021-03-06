<?php
include('RokonsagStorage.php');

// főprogram
$data = [];
$errors = [];
$kereses = [];

print_r($_GET);
// függvények
function validate($get, &$data, &$errors)
{
    if (!isset($get['csalad'])) {
        $errors['csalad'] = 'Az ősi családnevet kötelező megadni';
    } else if (trim($get['csalad']) === '') {
        $errors['csalad'] = 'Az ősi családnevet megadása kötelező';
    } else {
        $data['csalad'] = $get['csalad'];
    }

    if (!isset($get['kereso']) || trim($get['kereso']) === '') {
        $data['kereso'] = "";
    } else {
        $data['kereso'] = $get['kereso'];
    }


    if(isset($get['kozeli'])) {
        $data['kozeli'] = true;
    }
    else if(isset($get['kozeli'])){
        $data['kozeli'] = false;
    }else{
        $data['kozeli'] = null;
    }

    return count($errors) === 0;
}

if (count($_GET) > 0) {
    if (validate($_GET, $data, $errors)) {
      $rokonsagStorage = new RokonsagStorage();
      $kereses = $rokonsagStorage->findAll();
    }
   print_r($kereses['leszarmazottak']);
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
<h1>...........</h1>
<h2>...........</h2>
<form>
    Ősi csaladnevek: <input type="text" name="csalad"
                            value="<?= $_GET['csalad'] ?? '' ?>">
    <?php if (isset($errors['csalad'])) : ?>
        <small><?= $errors['csalad'] ?></small>
    <?php endif ?>
    <br>

    Kereső: <input type="text" name="kereso"
                   value="<?= $_GET['kereso'] ?? '' ?>">
    <?php if (isset($errors['kereso'])) : ?>
        <small><?= $errors['kereso'] ?></small>
    <?php endif ?>
    <br>
    <input type="radio" name="csaladnev" value="kozeli" checked> Mindenki <br>
    <input type="radio" name="csaladnev" value="kozeli"> Közeli rokon<br>
    <input type="radio" name="csaladnev" value="kozeli"> Távoli rokon<br>
    <button>Keresés</button>
</form>
Keresési találatok:
<ul>
    <?php foreach ($kereses['leszarmazottak'] as $eredmeny) : ?>
        <li><?= $eredmeny['csalad']?></li>
    <?php endforeach;?>
</ul>

</body>
</html>
