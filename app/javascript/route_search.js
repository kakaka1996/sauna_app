import { getMap } from "map"
import { getCurrentLocationMarker } from "get_current_location"
import { getDestination } from "searching"

let directionService;
export let directionRenderer;

export function initRouteSearch() {
    const routeBtn = document.getElementById("route_search");
    if (routeBtn) {
        routeBtn.removeEventListener("click", culRoute); 
        routeBtn.addEventListener("click", culRoute);
    }
}

export async function culRoute(){
    try{
    // 各種機能の実行
        const map = getMap();
        if (!directionService) {
            directionService = new google.maps.DirectionsService();
        }
        if (!directionRenderer) {
            directionRenderer = new google.maps.DirectionsRenderer();
        }
        const origin = await getCurrentLocationMarker();
        const destination = getDestination();
        console.log("目的地の中身:", destination);
        if(!destination) {
            alert("先に目的地を検索してください");
        }

        directionService.route({
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING',
            avoidTolls: true
        }, (response, status) => {
        console.log(response);
        if (status === google.maps.DirectionsStatus.OK){
        // 検索結果をマップに表示
            directionRenderer.setMap(map);
            directionRenderer.setDirections(response);
            const leg = response.routes[0].legs[0];
                const time = leg.duration.text;      // 例: "25分"
                const distance = leg.distance.text;  // 例: "5.2 km"

                // HTML要素を取得
                const panel = document.getElementById("route_info_panel");
                const durationEl = document.getElementById("duration_text");
                const distanceEl = document.getElementById("distance_text");

                // 文字を書き換える
                durationEl.textContent = time;
                distanceEl.textContent = distance;

                // Tailwindの 'hidden' クラスを削除してパネルを表示させる
                panel.classList.remove("hidden");
                // ----------------------------
        } else{
            alert("検索結果を取得できません")
            }
        });
    } catch (error) {
        alert('現在地の取得に失敗しました')
    }
}


