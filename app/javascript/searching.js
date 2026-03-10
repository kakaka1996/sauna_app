import { searchNearRestaurant, clearRestaurantMarkers } from "near_search"
import { directionRenderer } from "route_search"

let destinationLatLng = null;
let marker = null;
let infoWindow = null;

export async function initSearching(map) {
    if (!map) return;

    const { PlacesService } = await google.maps.importLibrary("places");
    const searchBtn = document.getElementById("search_execution");
    if (!searchBtn) return;

    if (!infoWindow) infoWindow = new google.maps.InfoWindow();
    const service = new PlacesService(map);

    searchBtn.addEventListener('click', () => {
        const inputName = document.getElementById('place_search').value;
        if (!inputName) {
            alert("検索欄に入力してください");
            return;
        }

        if (marker) marker.setMap(null);
        if (infoWindow) infoWindow.close();
        if (directionRenderer) directionRenderer.setMap(null);
        clearRestaurantMarkers();

        const panel = document.getElementById("route_info_panel");
        if (panel) panel.classList.add("hidden");

        const request = { query: inputName, type: 'spa' };

        service.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length >= 1) {
                const place = results[0];
                const latlng = place.geometry.location;

                map.setCenter(latlng);
                setMarker(latlng, map, place.place_id);
                fetchAndShowDetails(place.place_id, map);
                // レストラン検索にも map を渡すよう修正が必要（後述）
                searchNearRestaurant(latlng, map);
            } else {
                alert("施設が見つからないかエラーが発生しました");
            }
        });
    });
}

function fetchAndShowDetails(placeId, map) {
    const service = new google.maps.places.PlacesService(map);
    service.getDetails({
        placeId: placeId,
        fields: ['name', 'formatted_address', 'website', 'photos']
    }, (details, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const photoUrl = details.photos ? details.photos[0].getUrl({maxWidth: 300}) : "";
            const content = `
                <div class="p-1">
                    <strong>${details.name}</strong><br>
                    <span class="text-xs text-slate-500">${details.formatted_address}</span><br>
                    ${details.website ? `<a href="${details.website}" target="_blank" class="text-sky-500 underline text-xs">公式サイト</a>` : ""}<br>
                    ${photoUrl ? `<img src="${photoUrl}" class="mt-2 rounded" style="max-width:200px;">` : ""}
                </div>`;
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
        }
    });
}

export function setMarker(latlng, map, placeid) {
    if (marker) marker.setMap(null);
    marker = new google.maps.Marker({ position: latlng, map: map });
    destinationLatLng = latlng;
    marker.addListener('click', () => { if (placeid) fetchAndShowDetails(placeid, map); });
}

export function getDestination() { return destinationLatLng; }