<?php
session_start();
$email = '';
unset($_SESSION['userData']);
$headerTitle = 'Déconnexion';
$headerLinks = [
    '#' => 'shortcut icon',
    './style/navbar.css' => 'stylesheet',
    './style/cookie.css' => 'stylesheet',
    './style/deconnexion.css' => 'stylesheet',
];

$headerScripts = [
    'script/cookie.js" type="module',
    'script/adBlocker.js" type="module',
];
?>

<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <?php require_once './templates/headers.php'; ?>
</head>
<body>
<header>
    <?php require_once './templates/navigation.php'; ?>
</header>
<h1>Déconnexion</h1>
<button
<?php require_once './templates/footer.php'; ?>
</body>
</html>