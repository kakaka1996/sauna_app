import { getMap } from "map"
// import { initSearching } from "searching"
// import { getDestination } from "./searching";

let infoWindow = null

export function searchNearRestaurant(latlng) {
    console.log("受け取った座標:", latlng)
    const map = getMap();
    const service = new google.maps.places.PlacesService(map);
    const request = {
    location: {
                lat: latlng.lat(), // 緯度を数値で取得
                lng: latlng.lng()
                },  // 経度を数値で取得,
    radius: 2000,
    type: 'restaurant'
};

service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for(let i = 0; i < results.length; i ++){
                createRestaurantMarker(results[i], map);
            }
        }
    });
}

function createRestaurantMarker(place, map) {
    const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        icon: 'http://maps.google.co.jp/mapfiles/ms/icons/orange-dot.png' // 色を変えると目的地と区別しやすいです
    });

    marker.addListener('click', () => {
        const service = new google.maps.places.PlacesService(map);
        service.getDetails({
            placeId: place.place_id,
            fields: ['name', 'formatted_address', 'website', 'opening_hours', 'photos']
        }, (details, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                showInfoWindow(details, marker, map);
            }
        });
    });
}

// 詳細を表示する関数を追加
function showInfoWindow(details, marker, map) {
    // 1. 写真URLの取得
    const photoUrl = details.photos ? details.photos[0].getUrl({maxWidth: 200}) : "";
    
    // 2. 営業状態の取得(表示するか検討)
    // const openStatus = details.opening_hours ? (details.opening_hours.isOpen() ? "営業中" : "閉店") : "不明";
    
    // 3. ウェブサイトのリンク作成
    const websiteLink = details.website ? `<a href="${details.website}" target="_blank">公式サイト</a>` : "サイトなし";

    // 4. HTMLの組み立て
    const content = `
        <div style="padding:5px;">
            <strong>${details.name}</strong><br>
            <span style="font-size:0.9em;">${details.formatted_address}</span><br>
            ${websiteLink}<br>
            ${photoUrl ? `<img src="${photoUrl}" style="width:100%; max-width:180px; margin-top:8px; border-radius:4px;">` : ""}
        </div>
    `;

    // 5. インフォウィンドウを作成して開く
    const infoWindow = new google.maps.InfoWindow({
        content: content
    });
    infoWindow.open(map, marker);
}