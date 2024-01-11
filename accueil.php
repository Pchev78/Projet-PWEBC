<?php
session_start();

$headerTitle = 'Accueil';
$headerLinks = [
    '#' => 'icon',
    'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css' => 'stylesheet',
    'https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.css' => 'stylesheet',
    'https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.Default.css' => 'stylesheet',
    'Leaflet-MiniMap-master\src\Control.MiniMap.css' => 'stylesheet',
    'https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css' => 'stylesheet',
    './style/responsive.css' => 'stylesheet',
    './style/accueil2.css' => 'stylesheet',
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
    'script/accueil.js" type="module',
];

$email = isset($_SESSION["email"])?($_SESSION["email"]):'';
echo "<script>var email = " . json_encode($email) . ";</script>";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <?php require_once './templates/headers.php'; ?>
</head>
<body>

<header>
    <nav class="navigation">
        <a href="#home" class="link">Home</a>
        <a href="#about" class="link">About</a>
        <a href="#rent" class="link">Rent</a>
        <a href="#services" class="link">Contact</a>
        <a href="#map" class="link">Location</a>
        <a href="./connexion.php" id="connexion">Log in</a>
    </nav>
</header>

<section id="home" class="text">
    <h1>Vélib<br>Explorer Paris</h1>
</section>

<section id="about" class="section">
    <div class="content">
        <h2 class="title">The Bike Accessible to Everyone</h2>
        <div class="flex-container">
            <div class="left-content">
                <p>Established in 2007, Vélib’ Métropole is one of the world's first bike-sharing services.<br><br>The goal of Vélib' Métropole is to facilitate the development of new mobilities in the Grand Paris metropolitan area.<br><br>With several million trips taken on Vélib’ each month, we are a major player in transportation and a complementary public service.</p>
            </div>
            <div class="right-content">
                <p class="subtitle">Vélib' in Numbers:</p>
                <ul>
                    <li>1,464 stations in Paris and the Île-de-France region</li>
                    <li>19,000 bikes, including 40% electric-assist</li>
                    <li>390,000 subscribers in 2022</li>
                    <li>4.7 million trips taken in October 2022</li>
                    <li>212,000 trips taken on October 10, 2022</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<section id="rent" class="section">
    <div class="content">
        <h2 class="title">The temporary packages</h2>

        <div class="ag-format-container">
            <div class="ag-courses_box">
                <!-- Course 1 -->
                <div class="ag-courses_item">
                    <a href="https://www.velib-metropole.fr/subscription/V1_OFFRE_CD_PRATIQUE/1" class="ag-courses-item_link">
                        <div class="ag-courses-item_bg"></div>
                        <div class="ag-courses-item_title">
                            Ticket-V 3€
                        </div>
                        <div class="ag-courses-item_date-box">
                            ✔ One ride on a mechanical or electric Vélib' (your choice)<br>
                            ✔ Includes 45 minutes<br>
                            <br>
                            <br>
                        </div>
                    </a>
                </div>

                <!-- Course 2 -->
                <div class="ag-courses_item">
                    <a href="https://www.velib-metropole.fr/subscription/V1_OFFRE_CD_PRATIQUE/1" class="ag-courses-item_link">
                        <div class="ag-courses-item_bg"></div>
                        <div class="ag-courses-item_title">
                            CLASSIC 24-HOUR PASS 5€
                        </div>
                        <div class="ag-courses-item_date-box">
                            ✔ 24 hours of Vélib' access (electric available at an additional cost)<br>
                            ✔ Includes 30 minutes on a mechanical Vélib'<br>
                            ✔ Rental for up to 5 bikes simultaneously
                        </div>
                    </a>
                </div>

                <!-- Course 3 -->
                <div class="ag-courses_item">
                    <a href="https://www.velib-metropole.fr/subscription/V1_OFFRE_CD_JOURNEE/1" class="ag-courses-item_link">
                        <div class="ag-courses-item_bg"></div>
                        <div class="ag-courses-item_title">
                            24-HOUR ELECTRIC PASS 10€
                        </div>
                        <div class="ag-courses-item_date-box">
                            ✔ 24 hours of Vélib' access (electric bike included)<br>
                            ✔ Includes 60 minutes on a mechanical Vélib'<br>
                            ✔ Includes 45 minutes on an electric Vélib'<br>
                            ✔ Rental for up to 5 bikes simultaneously
                        </div>
                    </a>
                </div>

                <!-- Course 4 -->
                <div class="ag-courses_item">
                    <a href="https://www.velib-metropole.fr/subscription/V1_OFFRE_CD_PASS_7_JOURS/1" class="ag-courses-item_link">
                        <div class="ag-courses-item_bg"></div>
                        <div class="ag-courses-item_title">
                            3-DAY PASS 20€
                        </div>
                        <div class="ag-courses-item_date-box">
                            ✔ 72 hours of Vélib' access (electric bike included)<br>
                            ✔ Includes 60 minutes on a mechanical Vélib'<br>
                            ✔ Includes 45 minutes on an electric Vélib'<br>
                            ✔ Rental for up to 5 bikes simultaneously
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="services" class="section">
    <h1>CUSTOMER SERVICE</h1>
    <h2>0176491234</h2><br>
    <p id="service-description"> Service available from Monday to Friday, 8 am to 10 pm, Saturday from 9 am to 10 pm, and Sunday and public holidays from 9 am to 7 pm.<br> Local call charges apply</p><br>
    <h2> Contact us</h2>
    <form>
        <input name="name" type="text" class="feedback-input" placeholder="Your name" />
        <textarea name="text" class="feedback-input" placeholder="Feedback"></textarea>
        <input type="submit" value="SOUMETTRE"/>
    </form>
</section>

<section id="map" class="section">
    <div class="content">
    </div>
</section>

<footer>
    <p>&copy; 2024 Vélib' Paris - Tous droits réservés.</p>
</footer>
</body>

</html>

