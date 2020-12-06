<?php
declare(strict_types=1);

$hibak = [];
$data = [];

function letezoEmail($email){

    $filename = 'user.json';

    if(file_exists($filename)){

        $file_content = file_get_contents('user.json');
        $file_contentEn = (json_decode($file_content, true));
        array_filter($file_contentEn, function ($adat) use ($email){
            return $adat["email_cim"] === $email;
        });
    }
    return false;
}

if (count($_GET) > 0) {
    if (validate($_GET, $data, $hibak)) {
        $file[] = $data;

        var_dump(letezoEmail($data['email_cim'])); //email cím ellenőrzés

        $file_content = json_encode($file, JSON_PRETTY_PRINT);
        file_put_contents('user.json', $file_content);


    }
}

function validate($get, &$data, &$hibak): bool
{
    if (!isset($get['email_cim'])) {
        $hibak['email_cim'] = "Az email cím nincs kitöltve";
    } else if (trim($get['email_cim']) == "") {
        $hibak['email_cim'] = "Nincs megadva email cím";
    } else if (!preg_match("/@/", $get['email_cim'])) {
        $hibak['email_cim'] = "Nem tartalmaz @ jelet! ";
    } else {
        $data['email_cim'] = $get['email_cim'];
    }

    if (!isset($get['jelszo'])) {
        $hibak['jelszo'] = "Az jelszo cím nincs kitöltve";
    } else if (trim($get['jelszo']) == "") {
        $hibak['jelszo'] = "Nincs megadva jelszó";
    } else if (strlen($get['jelszo']) < 8) {
        $hibak['jelszo'] = "Kevesebb, mint 8 karakter hosszú a jelszó";
    } else {
        $data['jelszo'] = $get['jelszo'];
    }

    if (!isset($get['jelszo2'])) {
        $hibak['jelszo2'] = "Az jelszo ellenőrző nincs kitöltve";
    } else if (trim($get['jelszo']) == "") {
        $hibak['jelszo2'] = "Nincs megadva jelszó ellenőrző";
    } else if ($get['jelszo'] !== $get['jelszo2']) {
        $hibak['jelszo2'] = "Nem egyezik a 2 jelszó";
    } else {
        $data['jelszo2'] = $get['jelszo'];
    }


    if (!isset($get['szuletesi_ev'])) {
        $hibak['szuletesi_ev'] = "Az szuletesi_ev cím nincs kitöltve";
    } else if (trim($get['szuletesi_ev']) == "") {
        $hibak['szuletesi_ev'] = "Nincs megadva szuletesi_ev";
    } else if (filter_var(trim($get['szuletesi_ev']), FILTER_VALIDATE_INT) === false) {
        $hibak['szuletesi_ev'] = "A szuletesi_ev nem számot tartalmaz";
    } elseif ((int)trim($get['szuletesi_ev']) > 2012) {
        $hibak['szuletesi_ev'] = "Nem lehet 1970-nél kisebb";
    } else {
        $data['szuletesi_ev'] = (int)$get['szuletesi_ev'];
    }

    return count($hibak) === 0;
}


?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

<form>
    Email: <input type="text" name="email_cim" id="email_cim"><br>
    Jelszó: <input type="text" name="jelszo" id="jelszo"><br>
    Jelszó mégegyszer: <input type="text" name="jelszo2" id="elszo"><br>
    Születési év: <input type="number" name="szuletesi_ev" id="szuletesi_ev"><br>
    Cím: <input type="text" id="cim" <br>
    <button>Küldés</button>
</form>
</body>
</html>
