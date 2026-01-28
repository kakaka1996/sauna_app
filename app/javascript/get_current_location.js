import { getMap } from "map"

let currentLocationMarker;
let infoWindow;

// initCurrentLocation は削除します。このツール関数だけを残してください。
export function getCurrentLocationMarker() {
    const map = getMap();
    if (!infoWindow) {
        infoWindow = new google.maps.InfoWindow();
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentLatLng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                if (currentLocationMarker) {
                    currentLocationMarker.setMap(null);
                }
                currentLocationMarker = new google.maps.Marker({
                    position: currentLatLng,
                    map: map,
                    title: "現在地"
                });

                // マーカークリック時のイベント設定などは今のままでOK
                resolve(currentLatLng);
            },
            (error) => reject(error)
        );
    });
}