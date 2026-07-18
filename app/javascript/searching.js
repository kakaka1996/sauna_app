// 近くのレストランと道順の検索機能のimport
import { searchNearRestaurant, clearRestaurantMarkers } from "near_search"
import { directionRenderer } from "route_search"

let mapRef = null;
let infoWindow = null;
let markers = {};
let destinationLatLng = null;

// お気に入り管理: { place_id => db_id }
let activeFavorites = {};

function initFavorites() {
    const el = document.getElementById("favorites_data");
    if (!el) return;
    try {
        const data = JSON.parse(el.dataset.favorites || "[]");
        activeFavorites = {};
        data.forEach(f => { activeFavorites[f.place_id] = f.id; });
    } catch (e) {
        activeFavorites = {};
    }
}

function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
}

async function toggleFavorite(btn) {
    const placeId = btn.dataset.placeId;
    const placeName = btn.dataset.placeName;
    const placeAddress = btn.dataset.placeAddress;

    if (activeFavorites[placeId]) {
        const dbId = activeFavorites[placeId];
        const res = await fetch(`/favorite_facilities/${dbId}`, {
            method: 'DELETE',
            headers: { 'X-CSRF-Token': getCsrfToken(), 'Accept': 'application/json' },
        });
        if (res.ok) {
            delete activeFavorites[placeId];
            btn.textContent = '☆';
            btn.classList.remove('text-yellow-400');
            btn.classList.add('text-gray-300', 'hover:text-yellow-400');
            btn.title = 'お気に入りに追加';
        }
    } else {
        const res = await fetch('/favorite_facilities', {
            method: 'POST',
            headers: {
                'X-CSRF-Token': getCsrfToken(),
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ place_id: placeId, name: placeName, address: placeAddress }),
        });
        if (res.ok) {
            const data = await res.json();
            activeFavorites[placeId] = data.id;
            btn.textContent = '★';
            btn.classList.add('text-yellow-400');
            btn.classList.remove('text-gray-300', 'hover:text-yellow-400');
            btn.title = 'お気に入りから削除';
        }
    }
}

export async function initSearching(map) {
    mapRef = map;
    initFavorites();

    const placeSearch = document.getElementById("place_search");
    const searchExecution = document.getElementById("search_execution");
    searchExecution.addEventListener('click', () => {
        if (!placeSearch.value.trim()) {
            alert("検索欄に入力してください");
            return;
        }
        findPlaces(placeSearch.value);
    });

    placeSearch.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (!placeSearch.value.trim()) {
                alert("検索欄に入力してください");
                return;
            }
            findPlaces(placeSearch.value);
        }
    });

    infoWindow = new google.maps.InfoWindow();

    if (infoWindow) infoWindow.close();
    if (directionRenderer) directionRenderer.setMap(null);
    clearRestaurantMarkers();

    const panel = document.getElementById("route_info_panel");
    if (panel) panel.classList.add("hidden");

    async function findPlaces(query) {
        const { Place } = await google.maps.importLibrary('places');

        let text = query.trim();
        if (!text.includes("サウナ") && !text.includes("銭湯")) {
            text = `${text} サウナ`;
        }
        const request = {
            textQuery: text,
            fields: ['displayName', 'location', 'types', 'id', 'formattedAddress', 'photos', 'websiteURI'],
            useStrictTypeFiltering: false,
            language: 'ja',
            maxResultCount: 8,
            region: 'jp',
        };
        const { places } = await Place.searchByText(request);

        // 既存マーカー・飲食店ピン・目的地をクリア
        for (const id in markers) {
            markers[id].setMap(null);
        }
        markers = {};
        destinationLatLng = null;
        clearRestaurantMarkers();
        clearResultsList();

        if (places.length) {
            const { LatLngBounds } = await google.maps.importLibrary('core');
            const bounds = new LatLngBounds();

            places.forEach((place, index) => {
                const marker = new google.maps.Marker({
                    map,
                    position: place.location,
                    title: place.displayName,
                    icon: createNumberedIcon(index + 1),
                });
                markers[place.id] = marker;

                marker.addListener('click', () => {
                    map.panTo(place.location);
                    destinationLatLng = place.location;
                    updateInfoWindow(place.displayName, place.formattedAddress, marker);
                });

                if (place.location != null) {
                    bounds.extend(place.location);
                }
            });

            map.fitBounds(bounds);
            updateResultsList(places);
            if (places.length === 1) {
                destinationLatLng = places[0].location;
                searchNearRestaurant(places[0].location, map);
            }
        } else {
            alert("施設が見つからないかエラーが発生しました");
        }
    }
}

function createNumberedIcon(number) {
    const svg = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">',
        '<circle cx="16" cy="16" r="14" fill="#0ea5e9" stroke="white" stroke-width="2.5"/>',
        `<text x="16" y="21" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="sans-serif">${number}</text>`,
        '</svg>',
    ].join('');
    return {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
        scaledSize: new google.maps.Size(32, 32),
        anchor: new google.maps.Point(16, 16),
    };
}

function updateInfoWindow(title, address, marker) {
    infoWindow.setContent(`<div style="font-size:12px;color:#374151;margin-top:2px">${address ?? ""}</div>`);
    infoWindow.setHeaderContent(title);
    infoWindow.open(mapRef, marker);
}

function updateResultsList(places) {
    const panel = document.getElementById("search_results_panel");
    const list = document.getElementById("search_results_list");
    if (!panel || !list) return;

    list.innerHTML = "";

    const isLoggedIn = !!document.getElementById("favorites_data");

    places.forEach((place, index) => {
        const photoUrl = place.photos?.[0]?.getURI({ maxWidth: 120, maxHeight: 80 }) ?? null;
        const website = place.websiteURI ?? null;
        const isFavorited = !!activeFavorites[place.id];

        const nameHtml = website
            ? `<a href="${website}" target="_blank" rel="noopener noreferrer" class="font-bold text-sky-600 hover:underline text-sm truncate block">${place.displayName ?? ""}</a>`
            : `<p class="font-bold text-gray-800 text-sm truncate">${place.displayName ?? ""}</p>`;

        const photoHtml = photoUrl
            ? `<img src="${photoUrl}" alt="${place.displayName ?? ""}" class="flex-shrink-0 w-20 h-14 object-cover rounded-md">`
            : `<div class="flex-shrink-0 w-20 h-14 bg-slate-100 rounded-md flex items-center justify-center text-slate-400 text-xs">No photo</div>`;

        const starHtml = isLoggedIn
            ? `<button class="favorite-btn flex-shrink-0 text-xl leading-none transition-colors ${isFavorited ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}"
                       data-place-id="${place.id}"
                       data-place-name="${(place.displayName ?? '').replace(/"/g, '&quot;')}"
                       data-place-address="${(place.formattedAddress ?? '').replace(/"/g, '&quot;')}"
                       title="${isFavorited ? 'お気に入りから削除' : 'お気に入りに追加'}">
                       ${isFavorited ? '★' : '☆'}
               </button>`
            : '';

        const li = document.createElement("li");
        li.className = "flex items-center gap-3 p-3 rounded-lg hover:bg-sky-50 cursor-pointer transition-colors border border-transparent hover:border-sky-200";
        li.dataset.placeId = place.id;
        li.innerHTML = `
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center">${index + 1}</span>
            ${photoHtml}
            <div class="min-w-0 flex-1">
                ${nameHtml}
                <p class="text-xs text-gray-500 mt-0.5 truncate">${place.formattedAddress ?? ""}</p>
            </div>
            ${starHtml}
        `;

        li.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            if (e.target.closest('.favorite-btn')) {
                toggleFavorite(e.target.closest('.favorite-btn'));
                return;
            }
            const marker = markers[place.id];
            if (marker && place.location) {
                mapRef.panTo(place.location);
                mapRef.setZoom(16);
                destinationLatLng = place.location;
                updateInfoWindow(place.displayName, place.formattedAddress, marker);
            }
        });
        list.appendChild(li);
    });

    panel.classList.remove("hidden");
}

function clearResultsList() {
    const panel = document.getElementById("search_results_panel");
    const list = document.getElementById("search_results_list");
    if (panel) panel.classList.add("hidden");
    if (list) list.innerHTML = "";
}

export function getDestination() { return destinationLatLng; }