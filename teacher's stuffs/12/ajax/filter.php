<?php
include(__DIR__ . '/../storage/cardstorage.php');
include(__DIR__ . '/../storage/userstorage.php');
include(__DIR__ . '/../lib/auth.php');
include(__DIR__ . '/../lib/helper.php');

// beolvasás
session_start();
$auth = new Auth(new UserStorage());
// if (!$auth->is_authenticated()) {
//   redirect('login.php');
// }

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