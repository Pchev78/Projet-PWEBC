$(document).ready(function () {
    // config map
    let config = {
        minZoom: 7,
        maxZoom: 18,
    };
    // magnification with which the map will start
    const zoom = 12;
    // co-ordinates
    const lat = 48.866667;
    const lng = 2.333333;

    // calling map
    const map = L.map("map").setView([lat, lng], zoom);
    // Used to load and display tile layers on the map
    // Most tile servers require attribution, which you can set under `Layer`
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Read markers data from data.csv
    $.get('../coronavirus-commercants-parisiens-livraison-a-domicile.csv', function(csvString) {

        // Use PapaParse to convert string to array of objects
        var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
        let markers = L.markerClusterGroup();

        // For each row in data, create a marker and add it to the map
        // For each row, columns `geo_point_2d`, `Nom du commerce`, and `Adresse` are required
        for (var i in data) {
            var row = data[i];

            var marker = L.marker(row.geo_point_2d.split(","), {
                opacity: 1
            }).bindPopup(row['Nom du commerce'] + "<br>" + row['Adresse']);

            markers.addLayer(marker);
        }
        map.addLayer(markers);

    });


    map.attributionControl.setPrefix(
        'View <a href="https://github.com/HandsOnDataViz/leaflet-map-csv" target="_blank">code on GitHub</a>'
    );
})