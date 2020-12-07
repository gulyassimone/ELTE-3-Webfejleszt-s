<?php
include('storage.php');

function save_movies_to_file(){
    $movies = [
        '1' => [
            'id'=>1,
            'title' => 'The Sack',
            'year' => 2017,
        ],
        '2' => [
            'id'=>2,
            'title' => 'Thor: Ragnarok',
            'year' => 2017,
        ],
        '3' => [
            'id'=>3,
            'title' => 'Avatar',
            'year' => 2009,
        ]
    ];

    $file_content = json_encode($movies, JSON_PRETTY_PRINT);
    file_put_contents('movies.json', $file_content);

    $file_content = file_get_contents('movies.json');
    print_r(json_decode($file_content, true)); //ömb tárolása
}

function add_movie(){
    $io = new JsonIO('movies.json');

    $movies = $io->load();
    $id = uniqid();
    $movies[$id] = [
        'id' => $id,
        'title' => 'Pride and Prejudice',
        'year' => 1995,
    ];
    $io->save($movies);
}
save_movies_to_file();
add_movie();

/*$movieStorage = new Storage(new JsonIO('movies.json'));
$id = $movieStorage->add([
    'title' => 'Liza, a rókatündér',
    'year' => 2015,
]);
print_r($movieStorage->findAll(['year' => 2015]));
print_r($movieStorage->findById($id));
print_r($movieStorage->findOne(['year' => 2015]));
print_r($movieStorage->findMany(function($movie){
    return strpos($movie['title'], 'ide')!==false;
}));


$liza = $movieStorage->findById($id);
$liza['year'] = 2006;
$movieStorage->update($id,$liza);*/

//$movieStorage->delete($id);

?>

