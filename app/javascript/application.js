// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import { initMap } from "map"

document.addEventListener("turbo:load", () => {
    if (document.getElementById("map")){
        initMap();
    }
});
