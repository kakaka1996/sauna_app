// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import { initMap } from "map"
import { markerEvent } from "./searching"



// 画面ローディング時に発火
document.addEventListener("turbo:load", () => {
    if (document.getElementById("map")){
        initMap();
    }
// ボタンクリック時の動作
    const searchBtn = document.getElementById("search_execution");
        if(searchBtn){
            searchBtn.addEventListener("click" , () =>{
                markerEvent();
            });
        }
});

// // ボタンクリック時に発火


// document.addEventListener("turbo:click",() =>{
//     if (document.getElementById("search_execution")){
//         markerEvent();
//     }
// });