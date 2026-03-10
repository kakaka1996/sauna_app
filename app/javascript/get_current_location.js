let currentLocationMarker;
let infoWindow;

export function getCurrentLocationMarker(map) {
    if (!map) return Promise.reject("Map not found");
    if (!infoWindow) infoWindow = new google.maps.InfoWindow();
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentLatLng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                if (currentLocationMarker) currentLocationMarker.setMap(null);
                currentLocationMarker = new google.maps.Marker({
                    position: currentLatLng,
                    map: map,
                    title: "現在地",
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' // 青色に変更
                });
                resolve(currentLatLng);
            },
            (error) => reject(error)
        );
    });
}