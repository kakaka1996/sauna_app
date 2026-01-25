import { initMap } from "map"
import { initSearching } from "searching"

// コンソールや外部APIから見えるように「窓口」を作る
window.initMap = initMap;
window.initSearching = initSearching;

const startGMap = () => {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    // google.maps.Map が「関数」として存在するか厳密にチェック
    if (typeof google !== 'undefined' && google.maps && typeof google.maps.Map === 'function') {
        console.log("--- 準備完了。地図を起動します ---");
        initMap();
        initSearching();
    } else {
        // まだ準備ができていない場合は、0.2秒後に再試行
        console.log("--- Google Maps APIを待機中... ---");
        setTimeout(startGMap, 200);
    }
};

// 起動イベントの設定
document.addEventListener("turbo:load", startGMap);
// 初回アクセス時用
if (document.readyState !== 'loading') {
    startGMap();
} else {
    document.addEventListener('DOMContentLoaded', startGMap);
}