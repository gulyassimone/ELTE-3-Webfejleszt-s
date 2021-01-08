<?php
// print_r($_POST);
include('cardstorage.php');
// Függvenyek
function validate($post, &$data, &$errors) {
  if (!isset($post['name'])) {
    $errors['name'] = 'Name is required';
  }
  else if (trim($post['name']) === '') {
    $errors['name'] = 'Name is required';
  }
  else {
    $data['name'] = $post['name'];
  }

  if (!isset($post['email'])) {
    $errors['email'] = 'Email is required';
  }
  else if (!is_array($post['email'])) {
    $errors['email'] = 'Error in email field';
  }
  else {
    $filtered_emails = array_filter($post['email'], function ($email) {
      return trim($email) !== '';
    });
    if (count($filtered_emails) === 0) {
      $errors['email'] = 'Email is required';
    } else {
      $good = true;
      foreach($filtered_emails as $email) {
        $good = $good && (filter_var($email, FILTER_VALIDATE_EMAIL) !== false);
      }
      if (!$good) {
        $errors['email'] = 'Wrong email format';
      } else {
        $data['email'] = $filtered_emails;
      }
    }
  }

  if (!isset($post['tel']) || trim($post['tel']) === '') {
    $data['tel'] = NULL;
  }
  else if (false === filter_var($post['tel'], FILTER_VALIDATE_REGEXP, [
    "options"=>[
      "regexp"=>"/^\+[0-9]{2,3}-[0-9]{1,2}-[0-9]{7}$/",
    ]
  ])) {
    $errors['tel'] = 'Tel is not in the required format';
  } else {
    $data['tel'] = $post['tel'];
  }

  $data['address'] = $post['address'];
  $data['notes'] = $post['notes'];
  $data['sex'] = $post['sex'];

  return count($errors) === 0;
}
// Főprogram
$data = [];
$errors = [];
if (count($_POST) > 0) {
  if (validate($_POST, $data, $errors)) {
    // Beolvasás: $data

    // Feldolgozás
    $cardStorage = new CardStorage();
    $cardStorage->add($data);
  }
}
// Kiírás
?>
<html>
  <head>
    <title>PHP Test</title>
    <style>
    input + span {
      color: red;
    }
    </style>
  </head>
  <body>
    <?php if (count($errors) > 0) : ?>
      <ul>
        <?php foreach($errors as $error) : ?>
          <li><?= $error ?></li>
        <?php endforeach ?>
      </ul>
    <?php endif ?>
    <form action="" method="post" novalidate>
      Name: <input type="text" name="name" required> 
      <?php if (isset($errors['name'])) : ?>
        <span><?= $errors['name'] ?></span>
      <?php endif ?>
      <br>
      Emails: <br>
        <input type="email" name="email[]"> <br>
        <input type="email" name="email[]"> <br>
      <?php if (isset($errors['email'])) : ?>
        <span><?= $errors['email'] ?></span>
      <?php endif ?>
      <br>
      Phone: <input type="text" name="tel" placeholder="+36-30-1234567" pattern="^\+[0-9]{​​2,3}​​-[0-9]{1,​2}​​-[0-9]{​​7}$​​"> 
      <?php if (isset($errors['tel'])) : ?>
        <span><?= $errors['tel'] ?></span>
      <?php endif ?>
      <br>
      Address: <input type="text" name="address"> <br>
      Notes: <textarea name="notes"></textarea> <br>
      Sex: 
        <input type="radio" name="sex" value="male" checked /> Male
        <input type="radio" name="sex" value="female" /> Female <br>
      <button type="submit">Save new card</button>
    </form>
  </body>
</html>