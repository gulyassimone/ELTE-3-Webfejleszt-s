<?php
declare(strict_types=1);
print_r($_GET);

$hibak = [];
$data = [];
$filename = "user.json";


if (count($_GET) > 0) {
    validate($_GET, $data, $hibak);
    $file[] = $data;

    $file_content = json_encode($file, JSON_PRETTY_PRINT);
    file_put_contents('user.json', $file_content);
}

function validate($get, &$data, &$hibak): bool
{
    if (!isset($get['email_cim'])) {
        $hibak['email_cim'] = "Az email cím nincs kitöltve";
        $data['email_cim'] = "";
    } else if (trim($get['email_cim']) == "") {
        $hibak['email_cim'] = "Nincs megadva email cím";
        $data['email_cim'] = "";
    } else if (!preg_match("/@/", $get['email_cim'])) {
        $hibak['email_cim'] = "Nem tartalmaz @ jelet! ";
        $data['email_cim'] = "";
    } else {
        $data['email_cim'] = $get['email_cim'];
    }

    if (!isset($get['jelszo'])) {
        $hibak['jelszo'] = "Az jelszo cím nincs kitöltve";
        $data['jelszo'] = "";
    } else if (trim($get['jelszo']) == "") {
        $hibak['jelszo'] = "Nincs megadva jelszó";
        $data['jelszo'] = "";
    } else if (strlen($get['jelszo']) < 8) {
        $hibak['jelszo'] = "Kevesebb, mint 8 karakter hosszú a jelszó";
        $data['jelszo'] = "";
    } else {
        $data['jelszo'] = $get['jelszo'];
    }


    if (isset($get['szuletesi_ev'])) {
        $szuleresiEv = $get["szuletesi_ev"];
        if (filter_var($szuleresiEv, FILTER_VALIDATE_INT) === false) {
            $hibak['szuletesi_ev'] = "A szuletesi_ev nem számot tartalmaz";
            $data['szuletesi_ev'] = "";
        } elseif ((int)$szuleresiEv < 1970) {
            $hibak['szuletesi_ev'] = "Nem lehet 1970-nél kisebb";
            $data['szuletesi_ev'] = "";
        } else {
            $data['szuletesi_ev'] = (int)$get['szuletesi_ev'];
        }
    }
    print_r($hibak);
    print_r($data);
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
<?php if (count($hibak) > 0) : ?>
    Nem bekerült adatok és indoklás
    <ul>
        <?php foreach ($hibak as $hiba) : ?>
            <li><?= $hiba ?></li>
        <?php endforeach; ?>
    </ul>
<?php endif; ?>
Helyesen bekerült adatok:<br>
<ul>
    <?php foreach ($data as $temp) : ?>
        <?php if ( $temp !== "" ) : ?>
            <li><?= $temp ?></li>
        <?php endif; ?>
    <?php endforeach; ?>
</ul>


<form>
    Email: <input type="text" name="email_cim" id="email_cim" value=
    <?php if (isset($hibak['email_cim'])) : ?>
    "<?= $_GET['email_cim'] ?? "" ?>"
    <?php else : ?>
        ""
    <?php endif; ?>><br>
    Jelszó: <input type="text" name="jelszo" id="elszo" value=
    <?php if (isset($hibak['jelszo'])) : ?>
    "<?= $_GET['jelszo'] ?? "" ?>"
<?php else : ?>
    ""
<?php endif; ?>><br>
    Születési év: <input type="text" name="szuletesi_ev" id="szuletesi_ev" value=
    <?php if (isset($hibak['szuletesi_ev'])) : ?>
    "<?= $_GET['szuletesi_ev'] ?? "" ?>"
<?php else : ?>
    ""
<?php endif; ?>><br>
    <button>Küldés</button>
</form>
</body>
</html>
