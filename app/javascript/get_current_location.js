let currentLocationMarker;
let infoWindow;

// 現在地の取得
export function getCurrentLocationMarker(map) {
    if (!infoWindow) infoWindow = new google.maps.InfoWindow();
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentLatLng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                if (currentLocationMarker) currentLocationMarker.setMap(null);
                const svg = [
                    '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">',
                    '<circle cx="24" cy="24" r="21" fill="#ef4444" stroke="white" stroke-width="2.5"/>',
                    '<text x="24" y="28" text-anchor="middle" fill="white" font-size="10" font-weight="bold" font-family="sans-serif">出発地</text>',
                    '</svg>',
                ].join('');
                // ルート検索時に出発地点にする
                currentLocationMarker = new google.maps.Marker({
                    position: currentLatLng,
                    map: map,
                    title: "出発地",
                    icon: {
                        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
                        scaledSize: new google.maps.Size(48, 48),
                        anchor: new google.maps.Point(24, 24),
                    },
                });
                resolve(currentLatLng);
            },
            (error) => reject(error)
        );
    });
}