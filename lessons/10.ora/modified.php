<?php
include ("MovieStorage.php");
// beolvasás
$id = $_GET['id'];
$movieStorage = new MovieStorage();
//kiírás
print_r($movie);
include ("MovieStorage.php");


print_r($_POST);
function validate($post,&$data,&$errors) : bool{
    if(!isset($post['title'])){
        $errors['title'] = 'A cím megadása kötelező';
    }else if (trim($post['title']) === ""){
        $errors['title'] = 'A cím nem lehet üres';
    }else{
        $data['title'] = $post['title'];
    }

    if(!isset($post['year']) || trim($post['year']) === ""){
        $data['year'] = NULL;
    }else if(filter_var($post['year'], FILTER_VALIDATE_INT) === false){
        $errors['year'] = "rossz formátum";
    }else{
        $year = (int)$post['year'];
        if($year < 1900 || $year > 2020){
            $errors['year'] = "Nem jó év";
        }
        else{
            $data['year'] = $year;
        }
    }
    print_r($errors);

    return count($errors) === 0 ;
}
// főprogram
$data = [];
$errors = [];

if(count($_POST) > 0){
    if(validate($_POST, $data, $errors)){
        //beolvasas
        //feldolgozas
        echo "bejöttem";
        $movieStorage = new MovieStorage();
        $movieStorage->add($data);
        header('Location: index.php');
        exit();
    }
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Új film hozzáadása</title>
</head>
<body>
<h1>Mozifilmek</h1>
<h2>Film módosítása</h2>
<form action="add.php" method="post">
    Cím: <input type="text" name="title">
    <?php if(isset($errors['title'])) : ?>
        <span><?=$errors['title'] ?></span>
    <?php endif; ?><br>
    Év: <input type="number" name="year"><br>
    <?php if(isset($errors['number'])) : ?>
        <span><?=$errors['number'] ?></span>
    <?php endif; ?><br>
    <button type="submit">Új film Módosítása</button>
</form>
</body>
</html>