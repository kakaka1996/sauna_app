let restaurantMarkers = [];

export function clearRestaurantMarkers() {
    restaurantMarkers.forEach(m => m.setMap(null));
    restaurantMarkers = [];
}

export async function searchNearRestaurant(latlng, map) {
    if (!map) return;
    clearRestaurantMarkers();

    const res = await fetch(`/restaurants?lat=${latlng.lat()}&lng=${latlng.lng()}`);
    if (!res.ok) return;
    const restaurants = await res.json();
    restaurants.forEach(r => createRestaurantMarker(r, map));
    }

function createRestaurantMarker(restaurant, map) {
    const marker = new google.maps.Marker({
        position: { lat: restaurant.lat, lng: restaurant.lng },
        map: map,
        icon: 'http://maps.google.co.jp/mapfiles/ms/icons/orange-dot.png'
    });
    restaurantMarkers.push(marker);
    marker.addListener('click', () => showInfoWindow(restaurant, marker, map));
    }

function showInfoWindow(restaurant, marker, map) {
    const content = `
        <div class="p-1">
            <strong class="text-orange-600">${restaurant.name}</strong><br>
            <span class="text-xs">${restaurant.address}</span><br>
            <a href="${restaurant.url}" target="_blank" class="text-sky-600 underline">Hotpepperで見る</a><br>
            <img src="${restaurant.photo_url}" class="mt-2 rounded shadow-sm" style="max-width:180px;">
            <span class="block text-[10px] text-slate-400 mt-0.5">【画像提供：ホットペッパー グルメ】</span>
        </div>`;
    const infoWindow = new google.maps.InfoWindow({ content: content });
    infoWindow.open(map, marker);
}