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

    // 13 - Différenciation des marqueurs
    // LEGENDS

    // the control element is placed in the bottom right corner
    const legend = L.control({
        position: "bottomleft",
    });

    // we create a div with a legend class
    const div = L.DomUtil.create("div", "legend");
    // color table
    const color = ["#0068a4", "#acc8d1", "#f0c7b4", "#ff8366", "#ff2e20", "#6e0003"];
    // table of texts that will appear in the popup and legend
    const label = ["11-20", "21-30", "31-40", "41-50", "51-60", "61 et plus"];

    // we add records to the L.control method
    const rows = [];
    legend.onAdd = function () {
        color.map((item, index) => {
            rows.push(`
                <div class="row">
                  <i style="background: ${item}"></i>${label[index]}
                </div>  
            `);
        });
        div.innerHTML = rows.join("");
        return div;
    };
    legend.addTo(map);

    function colorMarker(color) {
        const svgTemplate = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
          <path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
          <path stroke="#fff" fill="${color}" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
        </svg>`;

        const icon = L.divIcon({
            className: "marker",
            html: svgTemplate,
            iconSize: [40, 40],
            iconAnchor: [12, 24],
            popupAnchor: [7, -16],
        });

        return icon;
    }

    // Read markers data from csv
    $.get('./velib.csv', function (csvString) {
        // Use PapaParse to convert string to array of objects
        var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
        let markers = L.markerClusterGroup();
        for (let elt in data) {
            let row = data[elt];
            let colorCapacity = Math.floor(row.capacity/10) - 1;
            let marker = L.marker([row.longitude, row.latitude], {
                opacity: 1,
                icon: colorMarker(color[colorCapacity])
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

    // 27 - Fullscreen
    document.addEventListener('keydown', function(event) {
        if (event.key.toLowerCase() === "f") {
            map.toggleFullscreen();
        }
    });

    // 33 - Localisation
    map
        .locate({
            // https://leafletjs.com/reference-1.7.1.html#locate-options-option
            setView: true,
            enableHighAccuracy: true,
        })
        .on("locationfound", (e) => {
            let userLoc = new L.LatLng(e.latitude, e.longitude);
            if (bounds.contains(userLoc))
                map.setView(userLoc);
            else
                map.setView([lat, lng], zoom);
        });

    // 42 - Echelle
    // L.control
    //     .scale({
    //         imperial: false,
    //     })
    //     .addTo(map);

        /*@TODO A implementer depuis ce site https://tomickigrzegorz.github.io/leaflet-examples/# :
        * 21 - Geocoding adresses search engine outside the map
        * 27 - Fullscreen
        * 45 - Multi layer search
        * 50 - Autocomplete on map - button
        * 54 - Contextmenu
        * 64 - Autocomplete with geojson
        * 69 - Simple animation of jumping marker
     */
});