<?php
include('storage.php');

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

function liza_crud()
{
    $movies = [
        '1' => new Movie(1, 'The Sack', 2017),
        '2' => new Movie(2, 'Thor: Ragnarok', 2017),
        '3' => new Movie(3, 'Avatar', 2009)
    ];


    $movieStorage = new Storage(new SerializeIO('movies.json'));
    $id = $movieStorage->add(new Movie(NULL, 'Liza, a rókatündér', 2015));
    print_r($movieStorage->findAll(['year' => 2015]));
    print_r($movieStorage->findById($id));
    print_r($movieStorage->findOne(['year' => 2015]));
    print_r($movieStorage->findMany(function ($movie) {
        return strpos($movie->title, 'Liza') !== false;
    }));


    $liza = $movieStorage->findById($id);
    $liza->year = 2006;
    $movieStorage->update($id, $liza);

    $movieStorage->delete($id);

}

class MovieStorage extends Storage{
    public function __construct()
    {
        parent::__construct(new JsonIO('movies.json'));
    }
    public function  findByTitleContaining($part){
        return $this->findMany(function ($movie) use ($part) {
           return strpos($movie['title'], $part)!==false;
        });
    }
}
$movieStorage = new MovieStorage();
print_r($movieStorage->findAll());
print_r($movieStorage->findByTitleContaining("ide"));
?>
