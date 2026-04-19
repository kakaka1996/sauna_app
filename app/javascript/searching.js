// 近くのレストランと道順の検索機能のimport
import { searchNearRestaurant, clearRestaurantMarkers } from "near_search"
import { directionRenderer } from "route_search"

let destinationLatLng = null;
let marker = null;
let infoWindow = null;

export async function initSearching(map) {
    // const { PlacesService } = await google.maps.importLibrary("places");
    // 検索文字の取得
    const placeSearch = document.getElementById("place_search");
    //検索ボタンの取得
    const searchExecution = document.getElementById("search_execution");
    // ボタンクリックで検索発動
    searchExecution.addEventListener('click', () => {
        findPlaces(placeSearch.value);
        if (!placeSearch) {
            alert("検索欄に入力してください");
            return;
        }
    });
    // ENTER入力で検索発動
        placeSearch.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (!inputName) {
            alert("検索欄に入力してください");
            return;
        }
            findPlaces(placeSearch.value);
        }
    });

    infoWindow = new google.maps.InfoWindow();

        // マーカーの初期化、検索結果窓の削除、経路図の削除
        if (marker) marker.setMap(null);
        if (infoWindow) infoWindow.close();
        if (directionRenderer) directionRenderer.setMap(null);
        clearRestaurantMarkers();

        const panel = document.getElementById("route_info_panel");
        if (panel) panel.classList.add("hidden");
        // 検索結果を返す
        const request = {
            textQuery: query,
            fields: ['displayName', 'location', 'businessStatus'],
            includeType: 'spa',
            useStrictTypeFiltering: true,
            locationBias: map.center,
            isOpenNow: true,
            language: 'ja',
            maxResultCount: 8,
            minRating: 1,
            region: 'ja',
        };

        const { places } = await Place.searchByText(request);
        if(places.length){
            const { LatLngBounds } = (await google.amps.importLibrary('core'));
            const bounds = new LatLngBounds();for ( const id in markers){
            markers[id].map = null;
        }
        markers = {};

        places.forEach((place) => {
            const marker = new AdvancedMarkerElement({
                map,
                position: place.location,
                title: place.displayName,
            });
            markers[place.id] = marker;
            marker.addListener('gmp-click', () => {
                map.panTo(place.location);
                updateInfoWindow(place.displayName, place.id, marker);
            });
            if (place.location != null) {
                bounds.extend(place.location);
            }
        });
        map.fitBounds(bounds);
    }
    else {
        alert("施設が見つからないかエラーが発生しました");
    }
}

async function updateInfoWindow(title, content, anchor) {
    infoWindow.setContent(content);
    infoWindow.setHeaderContent(title);
    infoWindow.open({
        map,
        anchor,
        shouldFocus: false,
    });
}














//         service.textSearch(request, (results, status) => {
//             console.log('textSearch result', status, results);
//             if (status === google.maps.places.PlacesServiceStatus.OK && results.length >= 1) {
//                 const place = results[0];
//                 const latlng = place.geometry.location;

//                 map.setCenter(latlng);
//                 setMarker(latlng, map, place.place_id);
//                 fetchAndShowDetails(place.place_id, map);
//                 // レストラン検索にも map を渡すよう修正が必要（後述）
//                 searchNearRestaurant(latlng, map);
//             } else {
//                 alert("施設が見つからないかエラーが発生しました");
//             }
//         });
//     });
// }

// function fetchAndShowDetails(placeId, map) {
//     const service = new google.maps.places.PlacesService(map);
//     service.getDetails({
//         placeId: placeId,
//         fields: ['name', 'formatted_address', 'website', 'photos']
//     }, (details, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//             const photoUrl = details.photos ? details.photos[0].getUrl({maxWidth: 300}) : "";
//             const content = `
//                 <div class="p-1">
//                     <strong>${details.name}</strong><br>
//                     <span class="text-xs text-slate-500">${details.formatted_address}</span><br>
//                     ${details.website ? `<a href="${details.website}" target="_blank" class="text-sky-500 underline text-xs">公式サイト</a>` : ""}<br>
//                     ${photoUrl ? `<img src="${photoUrl}" class="mt-2 rounded" style="max-width:200px;">` : ""}
//                 </div>`;
//             infoWindow.setContent(content);
//             infoWindow.open(map, marker);
//         }
//     });
// }

// export function setMarker(latlng, map, placeid) {
//     if (marker) marker.setMap(null);
//     marker = new google.maps.Marker({ position: latlng, map: map });
//     destinationLatLng = latlng;
//     marker.addListener('click', () => { if (placeid) fetchAndShowDetails(placeid, map); });
// }

export function getDestination() { return destinationLatLng; }