<?php


class Movie
{
    public $id = NULL;
    public $title = NULL;
    public $year = NULL;

    public function __construct($id, $title, $year)
    {
        $this->id = $id;
        $this->title = $title;
        $this->year = $year;
    }
}

$movies = [
    '1' => new Movie(1, 'The Sack', 2017),
    '2' => new Movie(2, 'Thor: Ragnarok', 2017),
    '3' => new Movie(3, 'Avatar', 2009)
];

$file_content = serialize($movies);
file_put_contents('movies.db', $file_content);

$file_content = file_get_contents('movies.db');
print_r(unserialize($file_content)); //ömb tárolása
