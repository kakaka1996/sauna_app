import { getMap } from "map"

let destinationLatLng = null;
let marker = null;
let infoWindow = null;

export function initSearching() {
    const searchBtn = document.getElementById("search_execution");
    if (!searchBtn) return;

    searchBtn.addEventListener('click', () => {
        if (!infoWindow) {
        infoWindow = new google.maps.InfoWindow();
        }
        const inputName = document.getElementById('place_search').value;
        if (!inputName) return;
        const geocoder = new google.maps.Geocoder();
        const map = getMap();

        geocoder.geocode({ address: inputName }, function(results, status) {
            if (status === 'OK') {
                const latlng = results[0].geometry.location;
                destinationLatLng = latlng;
                const address = results[0].formatted_address;
                map.setCenter(latlng);
                setMarker(latlng, map);
                markerEvent(map, inputName, address);
            } else {
                alert("検索に失敗しました: " + status);
            }
        });
    });
}
export function setMarker(setplace, map) {
    deleteMarkers();
    marker = new google.maps.Marker({
        position: setplace,
        map: map,
    });
}

export function deleteMarkers() {
    if (marker != null) {
        marker.setMap(null);
    }
    marker = null;
}

export function markerEvent(map, name, address) {
    if (!marker) return;
    marker.addListener('click', function() {
        infoWindow.setContent(`<div><strong>${name}</strong><br>${address}</div>`);
        infoWindow.open(map, marker);
    });
}

export function getDestination() {
    return destinationLatLng;
}