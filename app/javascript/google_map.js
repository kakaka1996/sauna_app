import { initSearching } from "searching"
import { initRouteSearch} from "route_search"
// import { addSaunaForm, addSaunaMealForm } from "log_create_button"

(async () => {
  // current map instance (cached across turbo navigations)
  let mapInstance = null;

  // 地図を描画する関数を定義
  async function startGMap() {
    const mapElement = document.getElementById("map");
    if (!mapElement) return; // 要素がなければ何もしない（他画面への配慮）

    try {
      if (!mapInstance) {
        const { Map } = await google.maps.importLibrary("maps");
        mapInstance = new Map(mapElement, {
          center: { lat: 35.412715, lng: 136.771715 },
          zoom: 15,
          styles: [{
            "featureType": "poi.business",
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
          }]
        });
      }

      // Mapが準備できていれば、必ず検索／ルートの初期化を行う
      initSearching(mapInstance);
      initRouteSearch(mapInstance);
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