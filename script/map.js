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
        Topographie: L.tileLayer(otmURL, {minZoom: config.minZoom, maxZoom: config.maxZoom, attribution: otmAttrib})
    };
    var baseLayersMiniMap = {
        OSM:  L.tileLayer(osmURL, {minZoom: 0, maxZoom: config.maxZoom, attribution: osmAttrib}),
        DarkMap: L.tileLayer(cartoURL, {minZoom: 0, maxZoom: config.maxZoom, attribution: cartoAttrib}),
        Topographie: L.tileLayer(otmURL, {minZoom: 0, maxZoom: config.maxZoom, attribution: otmAttrib})
    };


    map.addLayer(baseLayers.OSM);
    L.control.layers(baseLayers).addTo(map);

    var miniMap = new L.Control.MiniMap(baseLayersMiniMap.OSM, { toggleDisplay: true }).addTo(map);
    map.on('baselayerchange', function (e) {
        miniMap.changeLayer(baseLayersMiniMap[e.name]);
    })

    // Read markers data from csv
    $.get('./velib.csv', function (csvString) {
        // Use PapaParse to convert string to array of objects
        var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
        let markers = L.markerClusterGroup();
        for (let elt in data) {
            let row = data[elt];
            console.log([row.longitude, row.latitude]);
            let marker = L.marker([row.longitude, row.latitude], {
                opacity: 1
            }).bindPopup(row.name);
            markers.addLayer(marker);
        }
        map.addLayer(markers);
    });



    // coordinates limiting the map
    function getBounds() {
        const southWest = new L.LatLng(48.754194, 2.133472);
        const northEast = new L.LatLng(49.017367, 2.590224);
        return new L.LatLngBounds(southWest, northEast);
    }

    map.setMaxBounds(getBounds());

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
        // if location found show marker and circle
        .on("locationfound", (e) => {
            const latUser = e.latitude, lgnUser = e.longitude; // @TODO A utiliser pour la suite
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


    /*
        // centering a group of markers
        map.on("layeradd layerremove", function () {
            // Create new empty bounds
            let bounds = new L.LatLngBounds();
            // Iterate the map's layers
            map.eachLayer(function (layer) {
                // Check if layer is a featuregroup
                if (layer instanceof L.FeatureGroup) {
                    // Extend bounds with group's bounds
                    bounds.extend(layer.getBounds());
                }
            });

            // Check if bounds are valid (could be empty)
            if (bounds.isValid()) {
                // Valid, fit bounds
                map.flyToBounds(bounds);
            } else {
                // Invalid, fit world
                // map.fitWorld();
            }
        });


        L.Control.CustomButtons = L.Control.Layers.extend({
            onAdd: function () {
                this._initLayout();
                this._addMarker();
                this._removeMarker();
                this._update();
                return this._container;
            },
            _addMarker: function () {
                this.createButton("add", "add-button");
            },
            _removeMarker: function () {
                this.createButton("remove", "remove-button");
            },
            createButton: function (type, className) {
                const elements = this._container.getElementsByClassName(
                    "leaflet-control-layers-list"
                );
                const button = L.DomUtil.create(
                    "button",
                    `btn-markers ${className}`,
                    elements[0]
                );
                button.textContent = `${type} markers`;

                L.DomEvent.on(button, "click", function (e) {
                    const checkbox = document.querySelectorAll(
                        ".leaflet-control-layers-overlays input[type=checkbox]"
                    );

                    // Remove/add all layer from map when click on button
                    [].slice.call(checkbox).map((el) => {
                        el.checked = type === "add" ? false : true;
                        el.click();
                    });
                });
            },
        });

        new L.Control.CustomButtons(null, overlayMaps, { collapsed: false }).addTo(map);

    */
});