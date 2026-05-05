import { getCurrentLocationMarker } from "get_current_location"
import { getDestination } from "searching"

let directionService;
export let directionRenderer;

// initRouteSearchでmapを受け取り、イベントリスナーに仕込む
export function initRouteSearch(map) {
    const routeBtn = document.getElementById("route_search");
    if (!routeBtn) return;

    // 前のイベントを消して、新しいmapを持った関数を登録
    routeBtn.onclick = () => culRoute(map); 
}

export async function culRoute(map) {
    if (!map) return;
    try {
        if (!directionService) directionService = new google.maps.DirectionsService();
        if (!directionRenderer) directionRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
        // map を渡して現在地を取得
        const origin = await getCurrentLocationMarker(map);
        console.log('origin coords', origin);
        const destination = getDestination();
        console.log('destination coords', destination);

        if (!destination) {
            alert("先に目的地を検索してください");
            return;
        }
        // ルート検索時の条件設定
        directionService.route({
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING',
            avoidTolls: true
        }, (response, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionRenderer.setMap(map);
                directionRenderer.setDirections(response);
                const leg = response.routes[0].legs[0];
                document.getElementById("duration_text").textContent = leg.duration.text;
                document.getElementById("distance_text").textContent = leg.distance.text;
                document.getElementById("route_info_panel").classList.remove("hidden");
            } else {
                console.error('directions failure', status, response);
                alert("ルート検索に失敗しました");
            }
        });
    } catch (error) {
        alert('現在地またはルートの取得に失敗しました');
    }
}


