<?php
include('moviestorage.php');
$movieStorage = new MovieStorage();
// beolvasás
$id = $_GET['id'];
$movieStorage->delete($id);
header('Location: index.php');
