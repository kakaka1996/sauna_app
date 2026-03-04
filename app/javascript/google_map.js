import { initMap } from "map"
import { initSearching } from "searching"
import { initRouteSearch} from "route_search"
// import { addSaunaForm, addSaunaMealForm } from "log_create_button"

const startGMap = () => {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    if (typeof google !== 'undefined' && google.maps && typeof google.maps.Map === 'function') {
        initMap();
        initSearching();
        initRouteSearch();
    } else {
        setTimeout(startGMap, 200);
    }
};

// 起動イベントの設定（すべてここに入れる）
document.addEventListener("turbo:load", () => {
    startGMap();
    // addSaunaForm();
    // addSaunaMealForm();
});