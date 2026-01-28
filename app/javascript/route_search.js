import { getMap } from "map"
import { getCurrentLocationMarker } from "get_current_location"
import { getDestination } from "searching"

let directionService;
let directionRenderer;

export function initRouteSearch() {
    const routeBtn = document.getElementById("route_search");
    if (routeBtn) {
        // 二重にイベントが登録されないよう、一度消すかチェックするのが安全です
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
        } else{
            alert("検索結果を取得できません")
            }
        });
    } catch (error) {
        alert('現在地の取得に失敗しました')
    }
}


