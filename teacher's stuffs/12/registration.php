<?php
include(__DIR__ . '/storage/userstorage.php');
include(__DIR__ . '/lib/auth.php');
include(__DIR__ . '/lib/helper.php');

// functions
function validate($post, &$data, &$errors) {
  // username, password, fullname are not empty
  // ...
  $data = $post;

  return count($errors) === 0;
}

// main
$user_storage = new UserStorage();
$auth = new Auth($user_storage);
$errors = [];
$data = [];
if (count($_POST) > 0) {
  if (validate($_POST, $data, $errors)) {
    if ($auth->user_exists($data['username'])) {
      $errors['global'] = "User already exists";
    } else {
      $auth->register($data);
      redirect('login.php');
    } 
  }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration</title>
</head>
<body>
  <h1>Registration</h1>
  <?php if (isset($errors['global'])) : ?>
    <p><span class="error"><?= $errors['global'] ?></span></p>
  <?php endif; ?>
  <form action="" method="post">
    <div>
      <label for="username">Username: </label><br>
      <input type="text" name="username" id="username" value="<?= $_POST['username'] ?? "" ?>">
      <?php if (isset($errors['username'])) : ?>
        <span class="error"><?= $errors['username'] ?></span>
      <?php endif; ?>
    </div>
    <div>
      <label for="password">Password: </label><br>
      <input type="password" name="password" id="password">
      <?php if (isset($errors['password'])) : ?>
        <span class="error"><?= $errors['password'] ?></span>
      <?php endif; ?>
    </div>
    <div>
      <label for="fullname">Full name: </label><br>
      <input type="text" name="fullname" id="fullname" value="<?= $_POST['fullname'] ?? "" ?>">
      <?php if (isset($errors['fullname'])) : ?>
        <span class="error"><?= $errors['fullname'] ?></span>
      <?php endif; ?>
    </div>
    <div>
      <button type="submit">Register</button>
    </div>
  </form>
  <script src="scripts/registration.js"></script>
</body>
</html>