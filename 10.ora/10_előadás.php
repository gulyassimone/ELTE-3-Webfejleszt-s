Adattárolás
- FÁJL
- ADATBÁZIS
PHP-ban
- lehetősége van a szerver fájlok olvasására

Alacsony szintű általános műveletek
-fopen() - kézzel nyitom
-fclose - kiírom
-feof() -addig megyek amíg a végére nem érek

Alacsony szintű beolvasás
-fread() - valahány byte
-fscanf() - adott formátum szerint
-fgets() - egész sor
-fgetscv() - adott szeparátor szerint felszabdalt sor

Alacson szintű műveletek
-fwrite() - bítot vagy sort
-fprintf() - formátum szerint kiírni
-fputcsv() - tömböt egy adott szeparátorral

Magasszintű
-beolvasás soronként egy tömbbe->
$tömb = file($fájlnév[, módosítók]) fájl soronként a tömbbe
$s = file_get_contents($fájlnév) egész fájl szövegként
readfile($fájlnév) fájl kimenetre írása (pl. képek kiírása)
file_put_contents($fájlnév, $s) szöveg fájlba írása


mkdir($útvonal) könyvtár létrehozása
rmdir($könyvtárnév) könyvtár törlése
copy($forrás, $cél) másolás
rename($mit, $mire) átnevezés, mozgatás
unlink($fájlnév) törlés

basename() -bázis neve
dirname() -könyvtár neve
realpath() -elérési útvonal
chown() -jogosultság
chmod()-jogosultság
chgrp()-jogosultság
stat()


is_dir($fájlnév)
is_file($fájlnév)
is_readable($fájlnév)
is_writable($fájlnév)
is_link($fájlnév)
is_executable($fájlnév)


<?php
//@ operátor: hibaüzenet kiírásának elnyomása
$f = @fopen('nem_letezik.txt', 'r');
if ($f) {
    /* ... */
    fclose($f);
}
/**
 * 1. Adott filmcímek listája egy fájlban, soronként egy filmmel. Olvassuk ezt be egy tömbbe!
 */
$filmek = file('lista.txt',
    FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
/*
Array
(
  [0] => A hobbit
  [1] => A Gyűrűk Ura
  [2] => Út a vadonba
  [3] => Passió
)
*/
// hibaellenőrzés
$filmek = @file('lista_.txt',
    FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES)
or die('Nincs meg a fájl');

/**
 * 2. Egy filmcímeket tartalmazó tömb fájlba mentése (egy cím egy sor)
 */
$filmek = [
    'Vuk',
    'Lolka és Bolka',
    'Macskafogó',
    'Kisvakond és barátai',
];

// Kiírás alacsony szintű műveletekkel
define('SORVEG', "\n");
$f = @fopen('mesek.txt', 'w')
or die('Hiba!');
if ($f) {
    foreach ($filmek as $film) {
        fputs($f, $film . SORVEG);
    }
    fclose($f);
}
// VAGY
define('SORVEG', "\n");
// Elemek összefűzése
$s = implode(ENDLINE, $filmek) //javascriptes join
    . ENDLINE;
// Kiírás magas szintű művelettel
$siker = @file_put_contents(
    'mesek.txt', $s);
/**
 *3. Adott egy rekordokból álló tömb. Végezzük el a kiírását úgy, hogy egy sorban egy rekordnyi információ legyen, az egyes értékeket soron belül tabulátorral válasszuk el!
 */

$filmek = [
    [
        'cim' => 'Passió',
        'rendezo' => 'Mel Gibson',
        'ev' => '2004',
    ],
    [
        'cim' => 'Pio atya - A csodák embere',
        'rendezo' => 'Carlo Carlei',
        'ev' => '2000',
    ],
];
define('SORVEG', "\n");
$f = @fopen('filmek.txt', 'w')
or die('Hiba!');
if ($f) {
    foreach ($filmek as $film) {
        fputcsv($f, $film, "\t");
    }
    fclose($f);
}
/**
 *Az előző példában kapott fájlt olvassuk be rekordok tömbjeként!
 */
$filmek = file('filmek.txt',
    FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($filmek as &$film) {
    list($c, $r, $e) = explode("\t", $film);
    $film = [
        'cim' => $c,
        'rendezo' => $r,
        'ev' => $e,
    ];
}
/**
 * 4. Az előző példában kapott fájlt olvassuk be rekordok tömbjeként!
 */
//Beolvasás soronként az fgetcsv-vel
$filmek = [];
$f = @fopen('filmek.txt', 'r');
if ($f) {
    while ($sor = fgetcsv($f, 0, "\t")) {
        $filmek[] = [
            'cim' => $sor[0],
            'rendezo' => $sor[1],
            'ev' => $sor[2],
        ];
    }
    fclose($f);
}

/**
 * 5. Az előző feladatbeli rekordok tömbjét tároljuk úgy a fájlban, hogy a rekord minden egyes mezeje külön sorba kerüljön, és az egyes rekordokat üres sor válassza el egymástól.
 * Oldjuk meg a tömb beolvasását is!
 * Alacsony szintű fájlműveletek
 */
//Mentés fájlba
define('SORVEG', "\n");
$f = @fopen('filmek_tobbsor.txt', 'w')
or die('Hiba!');
if ($f) {
    foreach ($filmek as $film) {
        fputs($f, $film['cim'] . SORVEG);
        fputs($f, $film['rendezo'] . SORVEG);
        fputs($f, $film['ev'] . SORVEG);
        fputs($f, SORVEG);
    }
    fclose($f);
}
$filmek = [
    [
        'cim' => 'Passió',
        'rendezo' => 'Mel Gibson',
        'ev' => '2004',
    ],
    // ...
];

/**
 * Beolvasás
 */
//Beolvasás fájlból
$filmek = [];
$f = @fopen('filmek_tobbsor.txt', 'r');
if ($f) {
    while (!feof($f)) {
        $cim = trim(fgets($f));
        $rendezo = trim(fgets($f));
        $ev = trim(fgets($f));
        $ures = fgets($f);
        if ($cim != '') {
            $filmek[] = [
                'cim' => $cim,
                'rendezo' => $rendezo,
                'ev' => $ev,
            ];
        }
    }
    fclose($f);
}

?>
Konkurens fájlok
Ha egyszerre többen hívják meg a szkriptet → konkurens használat
flock($f, $op)
$op
- LOCK_SH (olvasáshoz) - tobb script is tud olvasni
- LOCK_EX (íráshoz) - többiek nem tudják, elsősorban írásnál-
- LOCK_UN (kioldáshoz) feloldás
fflush($f) fájlpuffer ürítése

<?php
define('SORVEG', "\n");
$f = @fopen('mesek.txt', 'w')
or die('Hiba!');
if ($f) {
    if (flock($f, LOCK_EX)) {
        foreach ($filmek as $film) {
            fputs($f, $film . SORVEG);
        }
        flock($f, LOCK_UN);
    }
    fclose($f);
}

$filmek = [];
$f = @fopen('lista.txt', 'r');
if ($f) {
    if (flock($f, LOCK_SH)) {
        while (!feof($f)) {
            $sor = trim(fgets($f));
            if ($sor != '') {
                $filmek[] = $sor;
            }
        }
        flock($f, LOCK_UN);
    }
    fclose($f);
}
?>
Adatszerkezetek, nem érdekel, hogy mi van a  fájlba, sorosítás
Egy adatszerkezet visszaalakítható szöveges megfelelője
Használat
    - tárolás
    -átküldés
SOrosító fgvények
- serialize($érték) → szöveg - többet tud
- unserialize($szöveg) → érték
- json_encode($érték) → szöveg - javascript
- json_decode($szöveg) → érték
<?php
$filmek = [
  [
    'cim'      => 'Passió',
    'rendezo'  => 'Mel Gibson',
    'ev'       => '2004',
    'szereplok'=> [
      'Jim Caviezel',
      'Maia Morgenstern',
      'Christo Jivkov',
    ],
  ],
  [
    'cim'      => 'Feltámadás',
    'rendezo'  => 'Kevin Reynolds',
    'ev'       => '2016',
    'szereplok'=> [
      'Joseph Fiennes',
      'Tom Felton',
      'Cliff Curtis',
    ],
  ],
];
/**
 * SERIALIZE, UNSERIALIZE
 */
$s = serialize($filmek);
//a:2:{i:0;a:4:{s:3:"cim";s:7:"Passió";s:7:"rendezo";s:10:"Mel Gibson";s:2:"ev";s:4:"2004";s:9:"szereplok";a:3:{i:0;s:12:"Jim Caviezel";i:1;s:16:"Maia Morgenstern";i:2;s:14:"Christo Jivkov";}}i:1;a:4:{s:3:"cim";s:12:"Feltámadás";s:7:"rendezo";s:14:"Kevin Reynolds";s:2:"ev";s:4:"2016";s:9:"szereplok";a:3:{i:0;s:14:"Joseph Fiennes";i:1;s:10:"Tom Felton";i:2;s:12:"Cliff Curtis";}}}
$filmek2 = unserialize($s);
/*
Array
(
  [0] => Array
    (
      [cim] => Passió
      [rendezo] => Mel Gibson
      [ev] => 2004
      [szereplok] => Array
        (
          [0] => Jim Caviezel
          [1] => Maia Morgenstern
          [2] => Christo Jivkov
        )
    )
  [1] => Array
    (
      [cim] => Feltámadás
      [rendezo] => Kevin Reynolds
      [ev] => 2016
      [szereplok] => Array
        (
          [0] => Joseph Fiennes
          [1] => Tom Felton
          [2] => Cliff Curtis
        )
    )
)*/

//JSON_ENCODE
$s = json_encode($filmek, JSON_PRETTY_PRINT);
//[{"cim":"Passi\u00f3","rendezo":"Mel Gibson","ev":"2004","szereplok":["Jim Caviezel","Maia Morgenstern","Christo Jivkov"]},{"cim":"Felt\u00e1mad\u00e1s","rendezo":"Kevin Reynolds","ev":"2016","szereplok":["Joseph Fiennes","Tom Felton","Cliff Curtis"]}]
/*[
  {
    "cim": "Passi\u00f3",
    "rendezo": "Mel Gibson",
    "ev": "2004",
    "szereplok": [
      "Jim Caviezel",
      "Maia Morgenstern",
      "Christo Jivkov"
    ]
  },
  {
    "cim": "Felt\u00e1mad\u00e1s",
    "rendezo": "Kevin Reynolds",
    "ev": "2016",
    "szereplok": [
      "Joseph Fiennes",
      "Tom Felton",
      "Cliff Curtis"
    ]
  }
]*/
$filmek3 = json_decode($s, true); //objektumokból is asszociatív tömb lesz
/*
Array
(
  [0] => Array
    (
      [cim] => Passió
      [rendezo] => Mel Gibson
      [ev] => 2004
      [szereplok] => Array
        (
          [0] => Jim Caviezel
          [1] => Maia Morgenstern
          [2] => Christo Jivkov
        )
    )
  [1] => Array
    (
      [cim] => Feltámadás
      [rendezo] => Kevin Reynolds
      [ev] => 2016
      [szereplok] => Array
        (
          [0] => Joseph Fiennes
          [1] => Tom Felton
          [2] => Cliff Curtis
        )
    )
)*/
$filmek3 = json_decode($s, false);
/*
Array
(
  [0] => stdClass Object
    (
      [cim] => Passió
      [rendezo] => Mel Gibson
      [ev] => 2004
      [szereplok] => Array
        (
          [0] => Jim Caviezel
          [1] => Maia Morgenstern
          [2] => Christo Jivkov
        )
    )
  [1] => stdClass Object
    (
      [cim] => Feltámadás
      [rendezo] => Kevin Reynolds
      [ev] => 2016
      [szereplok] => Array
        (
          [0] => Joseph Fiennes
          [1] => Tom Felton
          [2] => Cliff Curtis
        )
    )
)*/

//seédfügvények
function load_from_file(string $filename, bool $array_result = false, $default_data = []) {
    $s = @file_get_contents($filename);
    return ($s === false
        ? $default_data
        : json_decode($s, $array_result));
}

function save_to_file(string $filename, $data) {
    $s = json_encode($data);
    return file_put_contents($filename, $s, LOCK_EX);
}
?>
PÉLDA – ÚJ SZEREPLŐ HOZZÁADÁSA
<?php
$filmek = load_from_file('filmek.json');

$filmek[0]['szereplok'][] = 'Monica Bellucci';

save_to_file('filmek.json', $filmek);
/*[
  {"cim":"Passi\u00f3","rendezo":"Mel Gibson","ev":"2004",
   "szereplok":["Jim Caviezel","Maia Morgenstern","Christo Jivkov","Monica Bellucci"]},
  {"cim":"Pio atya - A csod\u00e1k embere","rendezo":"Carlo Carlei","ev":"2000",
   "szereplok":["Sergio Castellitto","Sergio Albelli"]}
]*/
?>
HÁTRÁNYOK
- Sok adat mozgatása
- Rossz konkurrencia-kezelés
- Manuális szűrés

array_map(callable $fn, array $x): másolás
array_filter(array $x, callable $fn): kiválogatás
array_reduce(array $x, callable $fn, $initial): általános összegzés
array_sum(array $x): összegzés
array_walk(array $x, callable $fn): iteráció
<?php
$numbers = [1, 2, 3, 4, 5];
$evens = array_filter($numbers, function ($e) {
    return $e % 2 === 0;
});
?>

<?php
// Data
function getMoviesByYear(int $year = NULL): array {
    $all = load_from_file('movies.json', true);
    return array_filter($all, function ($movie) use ($year) {
        return $movie['year'] === $year;
    });
}

$movies = getMoviesByYear(2004);
// Main
$year = (int)$_GET["year_filter"] ?? NULL;

$movies = getMoviesByYear($year);
?>
<h1>Movies</h1>
<form action="">
    <input name="year_filter">
    <button>Filter</button>
</form>
<ul>
    <?php foreach ($movies as $movie) : ?>
        <li>
            <?= $movie["title"] ?>
            (<?= $movie["year"] ?>)
        </li>
    <?php endforeach ?>
</ul>

JOBBÁ tenni
<?php
interface FileIO {
    public function save_to_file(string $filename, $data);
    public function load_from_file(string $filename, bool $array_result = false, $default_data = []);
};
class JsonIO implements FileIO {
    public function save_to_file(string $filename, $data) {
        $s = json_encode($data);
        return file_put_contents($filename, $s, LOCK_EX);
    }
    public function load_from_file(string $filename, bool $array_result = false, $default_data = []) {
        $s = @file_get_contents($filename);
        return ($s === false
            ? $default_data
            : json_decode($s, $array_result));
    }
}
?>
