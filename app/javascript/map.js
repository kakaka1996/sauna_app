let map;

export async function initMap() {
    const { Map, InfoWindow } = (await google.maps.importLibrary('maps'));
    const center = { lat: 37.4161493, lng: -122.0812166 };
    console.log("読み込もうとしているMap ID:", 'cac63ff0630d28643d2e8853');
    map = new Map(document.getElementById('map'), {
        center: center,
        zoom: 11,
        mapTypeControl: false,
        mapId: 'cac63ff0630d2864a092bd4c',
    });
}

export function getMap() { return map; }

