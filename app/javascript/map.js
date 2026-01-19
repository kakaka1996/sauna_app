export function initMap() {
    const target = document.getElementById("map");
    if (!target) return;

    const map = new google.maps.Map(target, {
        center: { lat: 35.6812, lng: 139.7671 },
        zoom: 15,
        mapid: "DEMO_MAP_ID"
    });
}