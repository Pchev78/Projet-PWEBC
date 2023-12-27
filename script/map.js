$(document).ready(function () {

    const zoom = 12;
    const lat = 48.866667, lng = 2.333333;
    // 33 - Plusieurs surfaces
    let config = {
        minZoom: 11,
        maxZoom: 19,
        fullscreenControl: true,
    };
    const map = L.map("map", config).setView([lat, lng], zoom);

    var osmURL='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data &copy; OpenStreetMap contributors';

    var cartoURL='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
    var cartoAttrib='Map data &copy; OpenStreetMap contributors';

    const otmURL = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
    const otmAttrib = "Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)";

    var baseLayers = {
        OSM:  L.tileLayer(osmURL, {minZoom: config.minZoom, maxZoom: config.maxZoom, attribution: osmAttrib}),
        DarkMap: L.tileLayer(cartoURL, {minZoom: config.minZoom, maxZoom: config.maxZoom, attribution: cartoAttrib}),
        Routes: L.tileLayer(otmURL, {minZoom: config.minZoom, maxZoom: 20, attribution: otmAttrib})
    };
    var baseLayersMiniMap = {
        OSM:  L.tileLayer(osmURL, {minZoom: 0, maxZoom: config.maxZoom, attribution: osmAttrib}),
        DarkMap: L.tileLayer(cartoURL, {minZoom: 0, maxZoom: config.maxZoom, attribution: cartoAttrib}),
        Routes: L.tileLayer(otmURL, {minZoom: 0, maxZoom: config.maxZoom, attribution: otmAttrib})
    };


    map.addLayer(baseLayers.OSM);
    L.control.layers(baseLayers).addTo(map);

    var miniMap = new L.Control.MiniMap(baseLayersMiniMap.OSM, { toggleDisplay: true }).addTo(map);
    map.on('baselayerchange', function (e) {
        miniMap.changeLayer(baseLayersMiniMap[e.name]);
    });
    miniMap.options.width = 120;
    miniMap.options.height = 120;

    var miniMapContainer = miniMap.getContainer();
    miniMapContainer.style.height = "120px";
    miniMapContainer.style.width = "120px";

    // Read markers data from csv
    $.get('./velib.csv', function (csvString) {
        // Use PapaParse to convert string to array of objects
        var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
        let markers = L.markerClusterGroup();
        for (let elt in data) {
            let row = data[elt];
            let marker = L.marker([row.longitude, row.latitude], {
                opacity: 1
            }).bindPopup(row.name);
            markers.addLayer(marker);
        }
        map.addLayer(markers);
    });

    // coordinates limiting the map
    const southWest = new L.LatLng(48.754194, 2.133472); // Coordonnées des Loges-en-Josas
    const northEast = new L.LatLng(49.017367, 2.590224); // Coordonnées du Mesnil-Amelot
    let bounds = new L.LatLngBounds(southWest, northEast);

    map.setMaxBounds(bounds);

    // 22 - Center map
    function clickZoom(e) {
        map.setView(e.target.getLatLng(), 18);
    }

    // 33 - Localisation
    map
        .locate({
            // https://leafletjs.com/reference-1.7.1.html#locate-options-option
            setView: true,
            enableHighAccuracy: true,
        })
        .on("locationfound", (e) => {
            let latUser = e.latitude, lgnUser = e.longitude; // @TODO A utiliser pour la suite
            let userLoc = new L.LatLng(latUser, lgnUser);
            if (bounds.contains(userLoc))
                map.setView(userLoc);
            else
                map.setView([lat, lng], zoom);
        });

    // 42 - Echelle
    L.control
        .scale({
            imperial: false,
        })
        .addTo(map);

        /*@TODO A implementer depuis ce site https://tomickigrzegorz.github.io/leaflet-examples/# :
        * 8/45 - Control different groups of markers / Multi layer search
        * 21 - Geocoding adresses search engine outside the map
        * 27 - Fullscreen
        * 31 - Awesome markers plugin - en fonction du groupe défini en 8
        * 33/49 - Location / Location button
        * 50 - Autocomplete on map - button
        * 54 - Contextmenu
        * 64 - Autocomplete with geojson
        * 69 - Simple animation of jumping marker
     */
});