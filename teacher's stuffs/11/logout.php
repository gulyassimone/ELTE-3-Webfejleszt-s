<?php
include('userstorage.php');
include('auth.php');
include('helper.php');

session_start();
$auth = new Auth(new UserStorage());
$auth->logout();
redirect('login.php');
