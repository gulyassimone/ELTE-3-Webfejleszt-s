<?php
include(__DIR__ . '/../storage/userstorage.php');
include(__DIR__ . '/../lib/auth.php');
include(__DIR__ . '/../lib/helper.php');

// main
$auth = new Auth(new UserStorage());
$username = $_GET['username'] ?? NULL;
$exists = $username === NULL ? false : $auth->user_exists($username);
// var_dump($exists);
?>
{
  "exists": <?= $exists ? 'true' : 'false' ?>
}
