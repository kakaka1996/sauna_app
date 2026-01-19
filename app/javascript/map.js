export function initMap() {
    const target = document.getElementById("map");
    // エラー防止のため
    if (!target) return;

    const map = new google.maps.Map(target, {
        center: { lat: 35.412715, lng: 136.771715},
        zoom: 15,
        mapid: "DEMO_MAP_ID"
    });
}