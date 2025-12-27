# PH Weather Dashboard 

A modern, high-performance weather dashboard specifically tailored for the Philippines. This application harmonizes real-time data from the OpenWeather API with the spatial capabilities of Leaflet.js to offer a comprehensive look at local weather patterns, 5-day forecasts, and interactive atmospheric maps.

---

## Features

### Real-time Intelligence
- **Live Local Data:** Instant access to temperature, humidity, and weather conditions for any Philippine city.
- **Geolocation Search:** Precision filtering via OpenWeather Geocoding API to ensure results stay within the Philippine archipelago.

### Interactive Visualization
- **Weather Map Layers:** Toggleable Leaflet.js overlays for **Temperature** and **Wind Speed**.
- **Fullscreen Experience:** Expand the map view for a deep-dive geographical analysis of weather systems.

### Forecasting & Analysis
- **5-Day Forecast:** Daily snapshots (midday) to help users plan ahead.
- **Local Unit Optimization:** Automatically converts wind speed from meters per second (m/s) to kilometers per hour (km/h) to align with local PAGASA-style reporting.

### Modern UI/UX
- **Dual Themes:** Seamlessly toggle between **Dark** and **Light** modes.
- **Glassmorphism Design:** A clean, frosted-glass aesthetic that remains responsive across mobile and desktop devices.

---

## Tech Stack

- **Core:** HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+).
- **APIs:** [OpenWeatherMap API](https://openweathermap.org/api) (Current, Forecast, and Tile Layers).
- **Libraries:**
  - **[Leaflet.js](https://leafletjs.com/):** For rendering interactive, high-performance maps.
  - **[Boxicons](https://boxicons.com/):** For crisp, modern iconography.
  - **[OpenStreetMap](https://www.openstreetmap.org/):** Base tile provider for the map interface.

---

## Project Structure

```text
├── index.html   # Semantic HTML structure and UI components
├── style.css    # Responsive design, theme variables, and Glassmorphism effects
└── script.js    # API integration, Leaflet map logic, and UI state management
Installation & Setup
Clone the repository:

Bash

git clone [https://github.com/yourusername/ph-weather-dashboard.git](https://github.com/yourusername/ph-weather-dashboard.git)
API Key Setup:

Sign up for a free account at OpenWeatherMap.

Locate the apiKey variable in script.js.

Replace the placeholder string with your unique API key.

Launch the App:

Simply open index.html in your preferred web browser.

Recommendation: Use the Live Server extension in VS Code for the best development experience.

How It Works
Geocoding: When a city is entered, the app requests precise coordinates (Lat/Lon) to prevent cross-country city name confusion.

Synchronized Fetching: The system fetches current weather and the 5-day forecast simultaneously using fetch() and Promise.all logic.

Spatial Rendering: The Leaflet map pans to the city's center, while a specialized tile layer is requested from OpenWeather to overlay real-time heatmaps or wind-flow patterns.
