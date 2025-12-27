const apiKey = "8b2b46d97a67a0bf20d8d9b9d2432c77";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorMsg = document.getElementById("errorMsg");

const mainValueEl = document.getElementById("mainValue");
const iconEl = document.getElementById("weatherIcon");
const descEl = document.getElementById("description");

const themeToggle = document.getElementById("themeToggle");
const mapToggle = document.getElementById("mapToggle");

/* MAP */
const map = L.map("map").setView([12.8797, 121.7740], 6);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

let marker;
let weatherLayer = L.tileLayer(
    `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    { opacity: 0.6 }
).addTo(map);

/* SIDEBAR LAYERS */
const sidebarLinks = document.querySelectorAll(".sidebar nav a");

sidebarLinks.forEach(link => {
    link.addEventListener("click", async () => {
        sidebarLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        const layer = link.dataset.layer;
        map.removeLayer(weatherLayer);
        weatherLayer = L.tileLayer(
            `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`,
            { opacity: 0.6 }
        ).addTo(map);

        if (marker) {
            const lat = marker.getLatLng().lat;
            const lon = marker.getLatLng().lng;
            updateWeatherCard(lat, lon, layer);
        }
    });
});

/* FULLSCREEN MAP */
mapToggle.addEventListener("click", () => {
    document.body.classList.toggle("map-fullscreen");
    mapToggle.innerHTML = document.body.classList.contains("map-fullscreen")
        ? "<i class='bx bx-exit-fullscreen'></i>"
        : "<i class='bx bx-fullscreen'></i>";
    map.invalidateSize();
});

/* DAY/NIGHT TOGGLE */
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

/* GET CITY COORDINATES */
async function getCityCoordinates(city) {
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},PH&limit=1&appid=${apiKey}`);
    const data = await res.json();
    if (!data || data.length === 0) throw new Error("City not found in PH");
    return { lat: data[0].lat, lon: data[0].lon, name: data[0].name };
}

/* UPDATE WEATHER CARD + FORECAST */
async function updateWeatherCard(lat, lon, layer) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const data = await res.json();

        descEl.textContent = data.weather[0].description;
        iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        if (layer === "temp_new") {
            mainValueEl.textContent = Math.round(data.main.temp) + "°C";
        } else if (layer === "wind_new") {
            const windKmh = (data.wind.speed * 3.6).toFixed(1);
            mainValueEl.textContent = windKmh + " km/h";
        }

        // 5-DAY FORECAST
        const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const forecastData = await forecastRes.json();
        const daily = forecastData.list.filter(f => f.dt_txt.includes("12:00:00")).slice(0, 5);

        const forecastEl = document.getElementById("forecast");
        forecastEl.innerHTML = "";
        daily.forEach(day => {
            const date = new Date(day.dt_txt);
            const options = { weekday: "short" };
            const dayName = date.toLocaleDateString("en-US", options);

            const card = document.createElement("div");
            card.classList.add("forecast-card");
            card.innerHTML = `
                <p>${dayName}</p>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Icon">
                <p>${Math.round(day.main.temp)}°C</p>
            `;
            forecastEl.appendChild(card);
        });

    } catch (err) {
        errorMsg.textContent = err.message;
    }
}

/* SEARCH CITY */
async function searchCity(city) {
    errorMsg.textContent = "";
    try {
        const coords = await getCityCoordinates(city);

        if (marker) map.removeLayer(marker);
        marker = L.marker([coords.lat, coords.lon]).addTo(map)
            .bindPopup(`<b>${coords.name}</b>`).openPopup();

        map.setView([coords.lat, coords.lon], 8);

        const activeLayer = document.querySelector(".sidebar nav a.active").dataset.layer;
        updateWeatherCard(coords.lat, coords.lon, activeLayer);

    } catch (err) {
        errorMsg.textContent = err.message;
    }
}

/* EVENTS */
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) searchCity(city);
});

cityInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) searchCity(city);
    }
});
