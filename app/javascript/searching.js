import { getMap } from "map"

let marker = null;
let infoWindow = null;

export function initSearching() {
    const searchBtn = document.getElementById("search_execution");
    if (!searchBtn) return; // ボタンがない場合のガード

    if (!infoWindow) {
        infoWindow = new google.maps.InfoWindow();
    }

    searchBtn.addEventListener('click', function() {
        const inputName = document.getElementById('place_search').value;
        if (!inputName) return;

        const geocoder = new google.maps.Geocoder();
        const map = getMap(); // 地図オブジェクトを取得

        geocoder.geocode({ address: inputName }, function(results, status) {
            if (status === 'OK') {
                const latlng = results[0].geometry.location;
                const address = results[0].formatted_address;

                map.setCenter(latlng);
                setMarker(latlng, map);
                markerEvent(map, inputName, address);
            } else {
                alert("検索に失敗しました: " + status);
            }
        }); // ここが geocoder.geocode の終わり
    }); // ここが searchBtn.addEventListener の終わり
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

//                 // 既存マーカーを消して新しく立てる
//                 if (marker) marker.setMap(null);
//                 marker = new google.maps.Marker({
//                     position: latlng,
//                     map: map
//                 });
//             }else{
//                 alert("検索に失敗しました");
//             }
//         });
//     });
// }

// export function setMarker(setplace, map){
//     deleteMarkers();
//     marker = new google.map.Marker({
//         position: setplace,
//         map: map,
//         iconUrl: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"'
//     });
// }

// export function deleteMarkers(){
//     if(marker != null){
//         marker.setMap(null);
//     }
//     marker = null;
// }

// export function markerEvent(map){
//     if (!marker) return;
//     marker.addListener('click', function(){
//         infoWindow.open(map, marker);
//     });
// }