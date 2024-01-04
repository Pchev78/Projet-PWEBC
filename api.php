<?php
//$rawJson = file_get_contents('https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_status.json');
$rawJson = file_get_contents('https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_information.json');

echo '<xmp>';
print_r(json_decode($rawJson));
echo '</xmp>';
