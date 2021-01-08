<?php
include_once(__DIR__ . '/../lib/storage.php');

class UserStorage extends Storage {
  public function __construct() {
    parent::__construct(new JsonIO(__DIR__ . '/../data/users.json'));
  }
}