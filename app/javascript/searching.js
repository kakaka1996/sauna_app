import { getMap } from "map"
import { searchNearRestaurant } from "near_search"

let destinationLatLng = null;
let marker = null;
let infoWindow = null;

export function initSearching() {
    const searchBtn = document.getElementById("search_execution");
    const map = getMap();
    if (!infoWindow) {
        infoWindow = new google.maps.InfoWindow();
    }
    // 1. PlacesService を準備
    const service = new google.maps.places.PlacesService(map);

    searchBtn.addEventListener('click', () => {
        const inputName = document.getElementById('place_search').value;
        if (!inputName) return;

        // 2. 住所検索ではなく「場所検索」を実行
        const request = {
            query: inputName,
            fields: ['name', 'geometry', 'place_id'], // place_id を取得するのがポイント
        };

        service.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
                const place = results[0];
                const latlng = place.geometry.location;

                // 地図の中心を移動してマーカーを立てる
                map.setCenter(latlng);
                setMarker(latlng, map, place.place_id);

                // 3. place_id を使って詳細情報を取得
                fetchAndShowDetails(place.place_id, map);
                
                // 周辺レストラン検索も実行
                searchNearRestaurant(latlng);
            }
        });
    });
}

// 詳細情報を取得してインフォウィンドウを開く関数
function fetchAndShowDetails(placeId, map) {
    const service = new google.maps.places.PlacesService(map);
    service.getDetails({
        placeId: placeId,
        fields: ['name', 'formatted_address', 'website', 'photos']
    }, (details, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // 写真URLの取得（あれば）
            const photoUrl = details.photos ? details.photos[0].getUrl({maxWidth: 300}) : "";
        

            // インフォウィンドウに表示する内容を作成
            const content = `
                <div>
                    <strong>${details.name}</strong><br>
                    ${details.formatted_address}<br>
                    <a href="${details.website}" target="_blank">${details.website}</a><br>
                    ${photoUrl ? `<img src="${photoUrl}" style="width:100%;max-width:200px;">` : ""}
                </div>
            `;
            if (infoWindow && marker) {
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            }
            // 目的地マーカーにイベントを設定
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
        }
    });
}

export function setMarker(latlng, map, placeid) {
    if (marker) marker.setMap(null);
    marker = new google.maps.Marker({
        position: latlng,
        map: map,
    });
    destinationLatLng = latlng; // ここで座標を保存しておく

    marker.addListener('click', () => {
      if (placeId) {
            fetchAndShowDetails(placeId, map);
        }
    });
}

// これが route_search.js から呼ばれている関数です！
export function getDestination() {
    return destinationLatLng;
}
//  website, opening_hours,
//           photos
/* <br>${website}<br>${opening_hours}<br>${photos} */