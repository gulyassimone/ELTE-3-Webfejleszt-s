<?php

include('storage.php');

class RokonsagStorage extends Storage
{
    public function __construct()
    {
        parent::__construct(new JsonIO('leszarmazottak.json'));
    };

    public findRokonsag($csalad, $nev,$tavol){

    };
}
