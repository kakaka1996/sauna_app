import { getMap } from "map"

// ボタン操作で現在地取得
const currentLocationButton = document.getElementById('get_current_location');
currentLocationButton.addEventListener('click', getCurrentLocationMarker);

// 現在地を取得してからマーカーを追加する

let currentLocationMarker;
const infoWindow = new google.maps.InfoWindow();



export function getCurrentLocationMarker(){
    const map = getMap();
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position){
        const currentLatLng ={
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

    if(currentLocationMarker){
        currentLocationMarker.setMap(null);
    }
    currentLocationMarker = new google.maps.Marker({
        position: currentLatLng,
        map: map,
        title: "現在地"
    });

    currentLocationMarker.addListener('click', function(){
        infoWindow.setContent(
            `<strong>現在地<strong></strong>`
        );
        infoWindow.open(map, currentLocationMarker);
    });
    map.setCenter(currentLatLng);
    });
    }else{
        alert("この画面では位置情報が利用できません");
    }
}