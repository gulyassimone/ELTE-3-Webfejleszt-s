<?php
$settings = [
  1 => [
    'name' => 'Setting1',
    'options' => [
      'a' => false,
      'b' => true,
      'c' => false,
    ],
  ],
  5 => [
    'name' => 'Setting2',
    'options' => [
      'd' => false,
      'e' => false,
      'f' => true,
      'g' => false,
    ],
  ],
];
?>

<?php foreach($settings as $id => $setting) : ?>
  <h3><?= $setting['name'] ?></h3>
  <?php foreach($setting['options'] as $option => $checked) : ?>
    <input type="radio" name="setting_<?= $id ?>"
      <?= $checked ? 'checked' : '' ?>
    >
    <?= $option ?> 
    <br>
  <?php endforeach ?>
  <hr>
<?php endforeach ?>


