(() => {
    if ('modules' in $ && 'map' in $.modules) {
        return;
    }

    /**
     * Creates a new Map class.
     * @class
     */
    const Map = function() {
        const self = this;

        /**
         * Insert Map to the page
         */
        self.insertMap = function() {
            let styleArray = [
                {
                    featureType: 'water',
                    stylers: [{color: '#1869da'}]
                },
                {
                    featureType: 'landscape',
                    elementType: 'geometry.fill',
                    stylers: [{color: '#ffffff'}]
                },
                {
                    featureType: 'landscape.man_made',
                    elementType: 'all',
                    stylers: [{saturation: '-70'}]
                },
                {
                    featureType: 'landscape.natural',
                    elementType: 'all',
                    stylers: [{visibility: 'off'}]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{visibility: 'off'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'all',
                    stylers: [{color: '#EEEEEE'}]
                },
                {
                    featureType: 'road',
                    elementType: 'all',
                    stylers: [{lightness: '-5'}]
                },
                {
                    featureType: 'transit',
                    elementType: 'labels',
                    stylers: [{visibility: 'off'}]
                }
            ];

            /*eslint-disable no-unused-vars*/ /*no errors when task gulp defult run*/
            let map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 53.929847, lng: 27.576420},
                styles: styleArray,
                disableDefaultUI: true,
                zoom: 14,
                backgroundColor: 'rgba(24,105,218,.04)'
            });
            /*eslint-enable no-unused-vars*/

            let markers = $('.map').data('markers');
            let image = {
                url: '../images/vis-pin-map.png'
            };
            let markersArray = [];
            let infoWindowArray = [];

            for (let i = 0; i < markers.length; i++) {
                let marker = new google.maps.Marker({
                    position: {lat: markers[i].lat, lng: markers[i].lng},
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: image
                });
                const title = `<div class="map-info__title">${markers[i].title}</div>`;
                const address = `<div class="map-info__text">${markers[i].address}</div>`;
                const contentString = title + address;
                const infoWindow = new google.maps.InfoWindow({
                    content: contentString
                });

                markersArray.push(marker);
                infoWindowArray.push(infoWindow);

                marker.addListener('click', function() {
                    for (let i = 0; i < markersArray.length; i++) {
                        infoWindowArray[i].close(map, markersArray[i]);
                    }
                    infoWindow.open(map, marker);
                });
            }
        };

        /**
         * Init module
         */
        self.init = () => {
            self.insertMap();
        };
    };

    if (!('modules' in $)) {
        $.modules = {};
    }

    $.modules.map = new Map();
})();
