import { initMap } from "map"
import { initSearching } from "searching"
import { initRouteSearch} from "route_search"

const startGMap = () => {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    // google.maps.Map が「関数」として存在するか厳密にチェック
    if (typeof google !== 'undefined' && google.maps && typeof google.maps.Map === 'function') {
        initMap();
        initSearching();
        initRouteSearch();
    } else {
        // まだ準備ができていない場合は、0.2秒後に再試行
        setTimeout(startGMap, 200);
    }
};
// 起動イベントの設定
document.addEventListener("turbo:load", startGMap);
if (document.readyState !== 'loading') {
    startGMap();
}

