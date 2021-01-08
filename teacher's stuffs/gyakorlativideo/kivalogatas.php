<?php
declare(strict_types=1);

function filter(array $x, callable $fn): array {
  $result = [];
  foreach($x as $e) {
    if ($fn($e)) {
      $result[] = $e;
    }
  }
  return $result;
}

$limit = -5;
$numbers = [-1, -44, 6, -3, 2, -7];
$negative = filter($numbers, function($e) use ($limit) {
  return $e < $limit;
});
// print_r($negative);

$negative = array_filter($numbers, function($e) use ($limit) {
  return $e < $limit;
});
// print_r($negative);
?>

<ul>
  <?php foreach($negative as $number) : ?>
    <li><?= $number ?></li>
  <?php endforeach ?>
</ul>