<?php
$stationCode = $_POST['stationcode'];

$velibApiUrl = 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?where=stationcode%3D' . $stationCode . '&limit=1';

$apiResponse = file_get_contents($velibApiUrl);
$decodedResponse = json_decode($apiResponse, true);
$apiResult = $decodedResponse['results'][0];

$response = [
    'nb_available_bikes' => $apiResult['numbikesavailable'],
    'nb_available_ebikes' => $apiResult['ebike'],
    'nb_available_mechanical_bikes' => $apiResult['mechanical'],
];

echo json_encode($response);