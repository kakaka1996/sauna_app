let autocompleteActive = false;
let selectedIndex = -1;

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

function getDropdown() {
    return document.getElementById("autocomplete_dropdown");
}

function hideDropdown() {
    const dropdown = getDropdown();
    if (dropdown) {
        dropdown.innerHTML = "";
        dropdown.classList.add("hidden");
    }
    selectedIndex = -1;
    autocompleteActive = false;
}

function renderSuggestions(suggestions, input, onSelect) {
    const dropdown = getDropdown();
    if (!dropdown) return;

    if (!suggestions.length) {
        hideDropdown();
        return;
    }

    dropdown.innerHTML = "";
    selectedIndex = -1;
    autocompleteActive = true;

    suggestions.forEach((suggestion, index) => {
        const pred = suggestion.placePrediction;
        const mainText = pred.mainText?.toString() ?? "";
        const secondaryText = pred.secondaryText?.toString() ?? "";

        const li = document.createElement("li");
        li.className = "flex flex-col px-4 py-2.5 cursor-pointer hover:bg-sky-50 border-b border-slate-100 last:border-b-0 transition-colors";
        li.dataset.index = index;
        li.innerHTML = `
            <span class="text-sm font-semibold text-gray-800 truncate">${mainText}</span>
            ${secondaryText ? `<span class="text-xs text-gray-400 truncate mt-0.5">${secondaryText}</span>` : ""}
        `;

        li.addEventListener("mousedown", (e) => {
            e.preventDefault();
            input.value = mainText;
            hideDropdown();
            onSelect(mainText);
        });

        dropdown.appendChild(li);
    });

    dropdown.classList.remove("hidden");
}

function highlightItem(items, index) {
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add("bg-sky-50");
        } else {
            item.classList.remove("bg-sky-50");
        }
    });
}

export function initAutocomplete(onSelect) {
    const input = document.getElementById("place_search");
    if (!input) return;

    const fetchSuggestions = debounce(async (value) => {
        if (!value.trim()) {
            hideDropdown();
            return;
        }

        try {
            const { AutocompleteSuggestion } = await google.maps.importLibrary("places");
            let query = value.trim();
            if (!query.includes("サウナ") && !query.includes("銭湯") && !query.includes("温浴")) {
                query = `${query} サウナ`;
            }
            const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
                input: query,
                language: "ja",
                region: "jp",
                includedRegionCodes: ["jp"],
            });
            renderSuggestions(suggestions, input, onSelect);
        } catch (e) {
            hideDropdown();
        }
    }, 300);

    input.addEventListener("input", (e) => {
        fetchSuggestions(e.target.value);
    });

    input.addEventListener("keydown", (e) => {
        const dropdown = getDropdown();
        if (!autocompleteActive || !dropdown) return;
        const items = Array.from(dropdown.querySelectorAll("li"));
        if (!items.length) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            highlightItem(items, selectedIndex);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            highlightItem(items, selectedIndex);
        } else if (e.key === "Enter" && selectedIndex >= 0) {
            e.stopImmediatePropagation();
            const text = items[selectedIndex].querySelector("span")?.textContent ?? "";
            input.value = text;
            hideDropdown();
            onSelect(text);
        } else if (e.key === "Escape") {
            hideDropdown();
        }
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest("#place_search") && !e.target.closest("#autocomplete_dropdown")) {
            hideDropdown();
        }
    });
}
