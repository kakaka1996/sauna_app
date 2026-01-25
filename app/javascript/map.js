let map;

export function initMap() {
    console.log("initMapが正常に呼び出されました！");
    const target = document.getElementById("map");
    if (!target || target.firstChild) return; // すでに中身（地図）があれば中止

    map = new google.maps.Map(target, {
        center: { lat: 35.412715, lng: 136.771715 }, // 岐阜
        zoom: 15,
        mapId: "DEMO_MAP_ID"
    });
}
export function getMap() { return map; }