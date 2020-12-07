<?php
include ('storage.php');

class MovieStorage extends Storage
{
    public function __construct()
    {
        parent::__construct(new JsonIO('movies.json'));
    }
}