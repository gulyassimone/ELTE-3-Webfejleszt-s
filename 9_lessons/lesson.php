array_filter() //- kivalogatas
bemenetek:
    - sokféle
    - kliens,
    - környezet,
    - fájl,
    - munkamenet,
    - adatbázos,
    - másik szerver,

KLIENS OLDALI KOMMUNIKACIO
 -kliens = böngésző,
 -le kell képezni a CGI protokollra
 -cgi standard input, standard output és környezeti változók
 -link vagy
http protokoll:
<?= '//<host>:<port>/<path>?<query>#<fragment optional>' ?>
feldolgozas PHP-ban $_server
                    $_get["title"] asszociativ tomb

<?php
    $title = $_GET['title'] ?? "I don't know"; //default value , if it is null then get this value
?><h1> Title : <?= $title ?> </h1>

GET - nem szabad a szerveren keresztul allapotvaltozast
POST - adni akar, allapot valtozas tortenik a szerver oldalon
form elem, legt0bb honlap onmagat ivja meg, akkor az action nulla

Nem minde urlap mezo toltodik be, csak azok kuldodnek el,
    -akiknek van name attrubutuma,
    -nem diseabled-ek
    -bejelolt checkbox
    -bejelolt radiko
    -kivalasztott checkbox

kivalogatta - > keresi adatok oszzeallitasa

a query stringen a get-en keresztul kuldheti, olvashato, es limitalt a merete
post - server oldalon beallithato a merete, uzenettestben megy, de mehet querybe is

mindig elkuldesre kerul akar ures szoveggel is
input text, password, hidden
textarea
select eseten, ha az optionban nincsen value megadva, akkor a tagek kozotti ertek lesz elkuldve
ha tobb is ki van jelolve, akkor tobb is elkuldodik

(...) sorositani
FILTER_VAL... )egy változo ,tobb fuggveny

