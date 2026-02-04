let map;

export async function initMap() {
    const { Map } = (await google.maps.importLibrary('maps'));
    map = new Map(document.getElementById('map'), {
        center: { lat: 35.412715, lng: 136.771715 },
        zoom: 15,
        styles:
            [{
                "featureType": "poi.business",
                "elementType": "labels.icon",
                "stylers": [{"visibility" : "off"}]
            }]
        }
    );
}
export function getMap() { return map; }
