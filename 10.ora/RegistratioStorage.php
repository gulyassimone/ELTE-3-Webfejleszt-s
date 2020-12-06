<?php
include ('storage.php');

class RegistratioStorage extends Storage
{
    public function __construct()
    {
        parent::__construct(new JsonIO('user.json'));
    }
}