let restaurantMarkers = [];

export function searchNearRestaurant(latlng, map) {
    if (!map) return;
    clearRestaurantMarkers();
    
    const service = new google.maps.places.PlacesService(map);
    const request = {
        location: latlng,
        radius: 2000,
        type: 'restaurant'
    };

    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(place => createRestaurantMarker(place, map));
        }
    });
}

export function clearRestaurantMarkers() {
    restaurantMarkers.forEach(m => m.setMap(null));
    restaurantMarkers = [];
}

function createRestaurantMarker(place, map) {
    const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        icon: 'http://maps.google.co.jp/mapfiles/ms/icons/orange-dot.png'
    });
    restaurantMarkers.push(marker);

    marker.addListener('click', () => {
        const service = new google.maps.places.PlacesService(map);
        service.getDetails({
            placeId: place.place_id,
            fields: ['name', 'formatted_address', 'website', 'photos']
        }, (details, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                showInfoWindow(details, marker, map);
            }
        });
    });
}

function showInfoWindow(details, marker, map) {
    const photoUrl = details.photos ? details.photos[0].getUrl({maxWidth: 200}) : "";
    const websiteLink = details.website ? `<a href="${details.website}" target="_blank" class="text-sky-600 underline">公式サイト</a>` : "サイトなし";
    const content = `
        <div class="p-1">
            <strong class="text-orange-600">${details.name}</strong><br>
            <span class="text-xs">${details.formatted_address}</span><br>
            ${websiteLink}<br>
            ${photoUrl ? `<img src="${photoUrl}" class="mt-2 rounded shadow-sm" style="max-width:180px;">` : ""}
        </div>`;

    const infoWindow = new google.maps.InfoWindow({ content: content });
    infoWindow.open(map, marker);
}