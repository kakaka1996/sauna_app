import { initMap } from "map"
import { initSearching } from "searching"
import { initRouteSearch} from "route_search"
// import { addSaunaForm, addSaunaMealForm } from "log_create_button"

(async () => {
  // 地図を描画する関数を定義
  async function startGMap() {
    const mapElement = document.getElementById("map");
    if (!mapElement) return; // 要素がなければ何もしない（他画面への配慮）

    // すでに地図が描画済みならスキップ
    if (mapElement.dataset.rendered) return;

    try {
      const { Map } = await google.maps.importLibrary("maps");
      const map = new Map(mapElement, {
        center: { lat: 35.412715, lng: 136.771715 },
        zoom: 15,
        styles: [{
          "featureType": "poi.business",
          "elementType": "labels.icon",
          "stylers": [{"visibility": "off"}]
        }]
      });
      mapElement.dataset.rendered = "true";

      initSearching(map);
      initRouteSearch(map);
    } catch (e) {
      console.error("Google Maps Load Error:", e);
    }
  }

  document.addEventListener("turbo:load", startGMap);  
  // 初回読み込み時にも実行
  if (document.readyState !== 'loading') {
    startGMap();
  } else {
    document.addEventListener('DOMContentLoaded', startGMap);
  }
})();