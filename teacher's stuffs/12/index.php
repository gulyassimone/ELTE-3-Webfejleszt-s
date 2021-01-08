<?php
include('storage/cardstorage.php');
include('storage/userstorage.php');
include('lib/auth.php');
include('lib/helper.php');

// beolvasás
session_start();
$auth = new Auth(new UserStorage());
if (!$auth->is_authenticated()) {
  redirect('login.php');
}

$cardStorage = new CardStorage();
$authenticated_user = $auth->authenticated_user();

$filter = $_GET['filter'] ?? '';
if ($filter === '') {
  $cards = $cardStorage->findAll(['user' => $authenticated_user['id']]);
} else {
  $cards = $cardStorage->findMany(function ($card) use ($authenticated_user, $filter) {
    return $card['user'] === $authenticated_user['id'] &&
           strpos($card['name'], $filter) !== false;
  });
}
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
  <form action="" method="get" id="filter-form">
    <input type="text" name="filter">
    <button>Filter</button>
  </form>
  <div id="cards-table">
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
  </div>
  <script src="scripts/index.js"></script>
</body>
</html>