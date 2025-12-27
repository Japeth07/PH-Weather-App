PH Weather Dashboard 
A modern, responsive weather dashboard specifically designed for the Philippines. This application integrates the OpenWeather API with Leaflet.js to provide real-time weather data, 5-day forecasts, and interactive weather map layers.

Features
Real-time Weather: Get current temperature and weather descriptions for any city in the Philippines.

Interactive Maps: Visualise weather patterns using Leaflet.js with toggleable layers for Temperature and Wind Speed.

5-Day Forecast: View upcoming weather trends with midday snapshots.

Geolocation Search: specifically filtered for cities within the Philippines using the OpenWeather Geocoding API.

Dynamic UI: * Dark/Light Mode: Toggle between themes for better visibility.

Fullscreen Map: Expand the map view for a more detailed geographical analysis.

Unit Conversion: Automatically converts wind speed from m/s to km/h for local preference.

Tech Stack
Frontend: HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+).

APIs: OpenWeatherMap API (Current Weather, Forecast, and Weather Maps).

Libraries: * Leaflet.js for interactive maps.

Boxicons for modern iconography.

OpenStreetMap for map tiles.

Installation & Setup
Clone the repository:

Bash

git clone https://github.com/yourusername/ph-weather-dashboard.git
API Key Setup: The project currently uses a hardcoded API key. For production, it is recommended to:

Sign up at OpenWeatherMap.

Replace the apiKey variable in script.js with your unique key.

Run the App: Simply open the index.html file in any modern web browser, or use a "Live Server" extension in VS Code.

Project Structure
Plaintext

├── index.html   # Main structure and layout
├── style.css    # Custom styling, glassmorphism effects, and responsiveness
└── script.js    # Logic for API calls, map rendering, and UI interactions
How It Works
Geocoding: When a user searches for a city, the app calls the Geocoding API to get precise latitude and longitude.

Data Fetching: The app fetches data from the weather and forecast endpoints simultaneously.

Map Integration: The Leaflet map updates its view to the city's coordinates and overlays the OpenWeather tile layer (Temperature or Wind) on top of OpenStreetMap.
