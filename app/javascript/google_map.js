// app/javascript/google_map.js
import { initSearching } from "searching"
import { initRouteSearch } from "route_search"

let mapInstance = null;

async function startGMap() {
  const mapElement = document.getElementById("map");
  
  if (!mapElement || mapElement.dataset.initialized === "true") return;

  let retryCount = 0;
  while (typeof google === "undefined" || !google.maps || !google.maps.Map) {
    if (retryCount > 50) {
      console.error("Google Maps SDK fail to load.");
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    retryCount++;
  }

  try {
    mapInstance = new google.maps.Map(mapElement, {
      center: { lat: 35.412715, lng: 136.771715 },
      zoom: 15,
      styles: [{
        "featureType": "poi.business",
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
      }]
    });

    mapElement.dataset.initialized = "true";

    if (typeof initSearching === "function") initSearching(mapInstance);
    if (typeof initRouteSearch === "function") initRouteSearch(mapInstance);

  } catch (e) {
    console.error("Google Maps Initialization Error:", e);
  }
}

document.addEventListener("turbo:load", startGMap);

// 初回読み込み時の予備動作
if (document.readyState !== 'loading') {
  startGMap();
} else {
  document.addEventListener('DOMContentLoaded', startGMap);
}