<?php
// Beolvasás
// $categories = [
//   [
//     'id'    => 5,
//     'name'  => 'Action'
//   ],
//   [
//     'id'    => 2,
//     'name'  => 'Drama'
//   ],
// ];
// $categories[0]['name']
$categories = [
  '5'  => 'Action2',
  '2'  => 'Drama2',
];
// echo $categories['5'];
print_r($categories);

// Feldolgozás

// Kiírás
?>
<!DOCTYPE html>
<meta charset="UTF-8">
<title>Document</title>

<form action="" method="get">
  <select name="category">
    <?php foreach($categories as $id => $name) : ?>
      <option value="<?= $id ?>"><?= $name ?></option>
    <?php endforeach ?>
  </select>
  <button>Send</button>
</form>