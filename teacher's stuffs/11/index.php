<?php
include('cardstorage.php');
include('userstorage.php');
include('auth.php');
include('helper.php');

// beolvasás
session_start();
$auth = new Auth(new UserStorage());
if (!$auth->is_authenticated()) {
  redirect('login.php');
}

$cardStorage = new CardStorage();
$authenticated_user = $auth->authenticated_user();
$cards = $cardStorage->findAll(['user' => $authenticated_user['id']]);
// kiírás
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Name cards</title>
</head>
<body>
  <h1>Cards</h1>
  <p>
    Hello, <?= $authenticated_user['fullname'] ?>!
    <a href="logout.php">Logout</a>
  </p>
  <p>
    <a href="new.php">New card...</a>
  </p>
  <table>
    <tr>
      <th>Name</th>
      <th>Emails</th>
      <th>Tel</th>
    </tr>
    <?php foreach($cards as $card) : ?>
      <tr>
        <td>
          <a href="modify.php?id=<?= $card['id'] ?>">
            <?= $card['name'] ?>
          </a>
        </td>
        <td><?= implode(',', $card['email']) ?></td>
        <td><?= $card['tel'] ?></td>
      </tr>
    <?php endforeach ?>
  </table>
</body>
</html>