$(document).ready(function () {
    // config map
    let config = {
        minZoom: 11,
        maxZoom: 20,
        fullscreenControl: true,
    };
    // magnification with which the map will start
    const zoom = 12;
    // co-ordinates
    const lat = 48.866667;
    const lng = 2.333333;

    // calling map
    const map = L.map("map", config).setView([lat, lng], zoom);
    // Used to load and display tile layers on the map
    // Most tile servers require attribution, which you can set under `Layer`
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Read markers data from data.csv
    $.get('./data.csv', function (csvString) {
        // Use PapaParse to convert string to array of objects
        var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
        let markers = L.markerClusterGroup();
        let types = new Set(data.map(row => row['Type de commerce']));
        for (let type of types) {
            let typeMarkers = new L.FeatureGroup();
            for (let row of data) {
                if (row['Type de commerce'] === type) {
                    let marker = L.marker(row.geo_point_2d.split(","), {
                        opacity: 1
                    }).bindPopup(row['Nom du commerce'] + "<br>" + row['Adresse'])
                        .on("click", clickZoom);
                    typeMarkers.addLayer(marker);
                }
            }
            markers.addLayer(typeMarkers);
        }
        map.addLayer(markers);
    });


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
    // coordinates limiting the map
    function getBounds() {
        const southWest = new L.LatLng(lat - 0.001, lng - 0.001);
        const northEast = new L.LatLng(lat + 0.001, lng + 0.001);
        return new L.LatLngBounds(southWest, northEast);
    }

    // set maxBounds
    map.setMaxBounds(map.getBounds());

    // 22 - Center map
    function clickZoom(e) {
        map.setView(e.target.getLatLng(), 18);
    }


    /*@TODO A implementer depuis ce site https://tomickigrzegorz.github.io/leaflet-examples/# :
        * 8/45 - Control different groups of markers / Multi layer search
        * 21 - Geocoding adresses search engine outside the map
        * 27 - Fullscreen
        * 31 - Awesome markers plugin - en fonction du groupe défini en 8
        * 33/49 - Location / Location button
        * 34 - Multiple layers
        * 42 - Scale
        * 50 - Autocomplete on map - button
        * 51 - Tabs in popup
        * 54 - Contextmenu
        * 59 - Sidebar replacing popup
        * 64 - Autocomplete with geojson
        * 69 - Simple animation of jumping marker
     */
});