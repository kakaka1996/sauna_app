document.getElementById("search_execution").addEventListener('click', function(){
    const place = document.getElementById('place_search').value;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        address: place
    }, function(results, status){
        if(status == google.maps.GeocoderStatus.OK){
            const bounds = new google.maps.LatLngBounds();

            for (var i in results) {
                if (results[0].geometry){
                    const latlng = results[0].geometry.location;
                    const address = results[0].formatted_address;
                    bounds.extend(lating);
                    setMaker(lating);
                    setInFoW(place, lating, address);
                    markerEvent();
                }
            }
        } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS){
            alert("検索結果がありません");
        }else{
            console.log(status);
            alert("エラー")
        }
    });
});
// マーカーのセッティング
export function setMaker(setplace){
// 既存マーカの削除
    deleteMakers();
    const iconUrl = '"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";'
    marker = new google.maps.Maker({
        position: setplace,
        map: map,
        icon: iconUrl
    });
}


// マーカー削除
export function deleteMakers() {
    if(maker != null){
        marker.setMap(null);
    }
    marker = null;
}

export function markerEvent() {
    marker.addEventListener('click' , function(){
        infoWindow.open(map, marker);
    });
}

