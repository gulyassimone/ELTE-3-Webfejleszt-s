<?php
include('storage/userstorage.php');
include('storage/cardstorage.php');
include('lib/auth.php');
include('lib/helper.php');

// beolvasás
session_start();
$auth = new Auth(new UserStorage());
if (!$auth->is_authenticated()) {
  redirect('login.php');
}

$id = $_GET['id'];
$cardStorage = new CardStorage();
$card = $cardStorage->findById($id);

$auth_user = $auth->authenticated_user();
if ($card['user'] !== $auth_user['id']) {
  die('Permission denied');
}

print_r($card);
// kiírás
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modify</title>
</head>
<body>
  <h1>Modify</h1>
</body>
</html>