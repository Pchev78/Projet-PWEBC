<?php
session_start();

$headerTitle = 'Accueil';
$headerLinks = [
    '#' => 'shortcut icon',
    'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css' => 'stylesheet',
    'https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.css' => 'stylesheet',
    'https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.Default.css' => 'stylesheet',
    'Leaflet-MiniMap-master\src\Control.MiniMap.css' => 'stylesheet',
    'https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css' => 'stylesheet',
    './style/navbar.css' => 'stylesheet',
    './style/cookie.css' => 'stylesheet',
    './style/accueil.css' => 'stylesheet',
];
$headerScripts = [
    'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
    'https://unpkg.com/leaflet@1.6.0/dist/leaflet.js',
    'https://cdn.jsdelivr.net/npm/papaparse@5.3.0/papaparse.min.js',
    'https://unpkg.com/leaflet.markercluster@1.3.0/dist/leaflet.markercluster.js',
    'Leaflet-MiniMap-master\src\Control.MiniMap.js',
    'https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js',
    'script/map.js" type="module',
    'script/cookie.js" type="module',
    'script/adBlocker.js" type="module',
];

$email = isset($_SESSION["email"])?($_SESSION["email"]):'';
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
    <h1><?php echo $headerTitle ?></h1>
    <div id="map"></div>
    <?php require_once './templates/footer.php'; ?>
</body>
</html>

