<?php
include('storage/userstorage.php');
include('lib/auth.php');
include('lib/helper.php');

session_start();
$auth = new Auth(new UserStorage());
$auth->logout();
redirect('login.php');
