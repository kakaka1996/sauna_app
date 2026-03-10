let map;

export async function initMap() {
    const { Map } = (await google.maps.importLibrary('maps'));
    map = new Map(document.getElementById('map'), {
        center: { lat: 35.68114 , lng:139.767061 },
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

document.addEventListener('turbo:load', () => {
  // すでにGoogle Maps APIが読み込まれているかチェック
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
    initMap();
    }
});
