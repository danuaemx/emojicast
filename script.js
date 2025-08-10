// Free APIs - No keys required!
const IP_API_URL = 'https://ipapi.co/json/';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

// Temperature unit preference
let currentTempUnit = localStorage.getItem('weather-temp-unit') || 'C';

// Elements
const loadingCard = document.getElementById('loading-card');
const errorCard = document.getElementById('error-card');
const weatherContainer = document.getElementById('weather-container');
const locationNameEl = document.getElementById('location-name');
const locationDetailsEl = document.getElementById('location-details');
const weatherIconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const temperatureUnitEl = document.getElementById('temperature-unit');
const unitToggleEl = document.getElementById('unit-toggle');
const unitTextEl = document.getElementById('unit-text');
const weatherDescEl = document.getElementById('weather-desc');
const feelsLikeEl = document.getElementById('feels-like');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const visibilityEl = document.getElementById('visibility');
const pressureEl = document.getElementById('pressure');
const uvIndexEl = document.getElementById('uv-index');
const uvLevelEl = document.getElementById('uv-level');
const uvIndexCard = document.getElementById('uv-index-card');
const sunriseEl = document.getElementById('sunrise');
const sunsetEl = document.getElementById('sunset');
const lastUpdatedEl = document.getElementById('last-updated');
const forecastContainer = document.getElementById('forecast-container');
const hourlyContainer = document.getElementById('hourly-container');
const themeToggle = document.getElementById('theme-toggle');
const temperatureGraph = document.getElementById('temperature-graph');
const legendLabel = document.getElementById('legend-label');

// Graph variables
let currentGraphType = 'temperature';
let chartData = null;
let weatherData = null;
let userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Temperature conversion functions
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function convertTemperature(temp, fromUnit, toUnit) {
    if (fromUnit === toUnit) return temp;
    if (fromUnit === 'C' && toUnit === 'F') return celsiusToFahrenheit(temp);
    if (fromUnit === 'F' && toUnit === 'C') return fahrenheitToCelsius(temp);
    return temp;
}

function formatTemperature(temp, unit = currentTempUnit, includeUnit = true) {
    const convertedTemp = convertTemperature(temp, 'C', unit);
    const rounded = Math.round(convertedTemp);
    return includeUnit ? `${rounded}°${unit}` : `${rounded}°`;
}

// Comprehensive Unicode weather icons mapping
const weatherCodeToIcon = {
    0: '☀️',    // Clear sky
    1: '🌤️',    // Mainly clear
    2: '⛅',    // Partly cloudy
    3: '☁️',    // Overcast
    45: '🌫️',   // Fog
    48: '🌫️',   // Depositing rime fog
    51: '🌦️',   // Light drizzle
    53: '🌦️',   // Moderate drizzle
    55: '🌧️',   // Dense drizzle
    56: '🧊',   // Light freezing drizzle
    57: '🧊',   // Dense freezing drizzle
    61: '🌧️',   // Slight rain
    63: '🌧️',   // Moderate rain
    65: '🌧️',   // Heavy rain
    66: '🧊',   // Light freezing rain
    67: '🧊',   // Heavy freezing rain
    71: '❄️',   // Slight snow fall
    73: '🌨️',   // Moderate snow fall
    75: '❄️',   // Heavy snow fall
    77: '❄️',   // Snow grains
    80: '🌦️',   // Slight rain showers
    81: '🌧️',   // Moderate rain showers
    82: '⛈️',   // Violent rain showers
    85: '🌨️',   // Slight snow showers
    86: '❄️',   // Heavy snow showers
    95: '⛈️',   // Thunderstorm
    96: '⛈️',   // Thunderstorm with slight hail
    99: '⛈️'    // Thunderstorm with heavy hail
};

// Fallback text-based icons for better compatibility
const weatherCodeToTextIcon = {
    0: 'SUN',     // Clear sky
    1: 'SUN',     // Mainly clear
    2: 'PCLD',    // Partly cloudy
    3: 'CLDY',    // Overcast
    45: 'FOG',    // Fog
    48: 'FOG',    // Depositing rime fog
    51: 'DRZ',    // Light drizzle
    53: 'DRZ',    // Moderate drizzle
    55: 'RAIN',   // Dense drizzle
    56: 'ICE',    // Light freezing drizzle
    57: 'ICE',    // Dense freezing drizzle
    61: 'RAIN',   // Slight rain
    63: 'RAIN',   // Moderate rain
    65: 'RAIN',   // Heavy rain
    66: 'ICE',    // Light freezing rain
    67: 'ICE',    // Heavy freezing rain
    71: 'SNOW',   // Slight snow fall
    73: 'SNOW',   // Moderate snow fall
    75: 'SNOW',   // Heavy snow fall
    77: 'SNOW',   // Snow grains
    80: 'SHWR',   // Slight rain showers
    81: 'RAIN',   // Moderate rain showers
    82: 'STRM',   // Violent rain showers
    85: 'SNOW',   // Slight snow showers
    86: 'SNOW',   // Heavy snow showers
    95: 'STRM',   // Thunderstorm
    96: 'HAIL',   // Thunderstorm with slight hail
    99: 'HAIL'    // Thunderstorm with heavy hail
};

// Comprehensive weather descriptions
const weatherDescriptions = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing Rime Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    56: 'Light Freezing Drizzle',
    57: 'Dense Freezing Drizzle',
    61: 'Light Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    66: 'Light Freezing Rain',
    67: 'Heavy Freezing Rain',
    71: 'Light Snow',
    73: 'Moderate Snow',
    75: 'Heavy Snow',
    77: 'Snow Grains',
    80: 'Light Rain Showers',
    81: 'Moderate Rain Showers',
    82: 'Heavy Rain Showers',
    85: 'Light Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Hail',
    99: 'Severe Thunderstorm'
};

// Enhanced weather icon function with multiple fallback options
function getWeatherIcon(weatherCode, description = '', useTextFallback = false) {
    // Primary: Use Unicode emoji if supported
    if (!useTextFallback && weatherCodeToIcon[weatherCode]) {
        return weatherCodeToIcon[weatherCode];
    }
    
    // Secondary: Use text-based icons
    if (weatherCodeToTextIcon[weatherCode]) {
        return weatherCodeToTextIcon[weatherCode];
    }
    
    // Tertiary: Keyword-based fallback
    const desc = description.toLowerCase();
    
    if (desc.includes('thunder') || desc.includes('storm')) {
        return useTextFallback ? 'STRM' : '⛈️';
    }
    if (desc.includes('snow') || desc.includes('blizzard')) {
        return useTextFallback ? 'SNOW' : '❄️';
    }
    if (desc.includes('rain') || desc.includes('shower') || desc.includes('drizzle')) {
        return useTextFallback ? 'RAIN' : '🌧️';
    }
    if (desc.includes('freez') || desc.includes('ice') || desc.includes('sleet')) {
        return useTextFallback ? 'ICE' : '🧊';
    }
    if (desc.includes('fog') || desc.includes('mist')) {
        return useTextFallback ? 'FOG' : '🌫️';
    }
    if (desc.includes('cloud')) {
        if (desc.includes('part')) {
            return useTextFallback ? 'PCLD' : '⛅';
        }
        return useTextFallback ? 'CLDY' : '☁️';
    }
    if (desc.includes('clear') || desc.includes('sunny')) {
        return useTextFallback ? 'SUN' : '☀️';
    }
    
    // Ultimate fallback
    return useTextFallback ? 'SUN' : '☀️';
}

// Enhanced weather description function
function getWeatherDescription(weatherCode, description = '') {
    // Primary: Use predefined descriptions
    if (weatherDescriptions[weatherCode]) {
        return weatherDescriptions[weatherCode];
    }
    
    // Secondary: Format custom description
    if (description) {
        return description.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
    
    // Fallback
    return 'Clear Sky';
}

// Temperature unit toggle functionality
function toggleTemperatureUnit() {
    const newUnit = currentTempUnit === 'C' ? 'F' : 'C';
    setTemperatureUnit(newUnit);
    
    // Add animation to toggle button
    if (unitToggleEl) {
        unitToggleEl.style.transform = 'scale(0.9)';
        setTimeout(() => {
            unitToggleEl.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Update displays if weather data is available
    if (weatherData) {
        updateTemperatureDisplays();
    }
    
    // Redraw graph with new unit
    if (chartData && currentGraphType === 'temperature') {
        drawGraph(chartData, currentGraphType);
    }
}

function setTemperatureUnit(unit) {
    currentTempUnit = unit;
    localStorage.setItem('weather-temp-unit', unit);
    
    // Update unit display in main card
    if (temperatureUnitEl) {
        temperatureUnitEl.textContent = unit;
    }
    
    // Update unit text in top bar toggle
    if (unitTextEl) {
        unitTextEl.textContent = `${unit}°`;
    }
    
    // Update legend label
    if (legendLabel && currentGraphType === 'temperature') {
        legendLabel.textContent = `Temperature (°${unit})`;
    }
    
    // Update toggle title
    if (unitToggleEl) {
        const otherUnit = unit === 'C' ? 'F' : 'C';
        unitToggleEl.title = `Switch to ${otherUnit === 'C' ? 'Celsius' : 'Fahrenheit'}`;
    }
}

function updateTemperatureDisplays() {
    if (!weatherData) return;
    
    const current = weatherData.current;
    const daily = weatherData.daily;
    const hourly = weatherData.hourly;
    
    // Update main temperature
    temperatureEl.textContent = formatTemperature(current.temperature_2m, currentTempUnit, false);
    
    // Update feels like
    feelsLikeEl.textContent = formatTemperature(current.apparent_temperature, currentTempUnit);
    
    // Update hourly forecast
    displayHourlyForecast(hourly);
    
    // Update 7-day forecast
    displayForecast(daily);
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('weather-app-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeToggle(theme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('weather-app-theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeToggle(newTheme);
            // Redraw graph with new theme colors
            if (chartData) {
                drawGraph(chartData, currentGraphType);
            }
        }
    });
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('weather-app-theme', newTheme);
    updateThemeToggle(newTheme);
    
    // Redraw graph with new theme colors
    if (chartData) {
        drawGraph(chartData, currentGraphType);
    }
    
    // Add a nice transition effect
    themeToggle.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
}

function updateThemeToggle(theme) {
    const icon = themeToggle.querySelector('.material-icons');
    icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    themeToggle.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
}

// Initialize the app
async function getWeather() {
    try {
        showLoading();
        
        // Add rotation animation to refresh button
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                refreshBtn.style.transform = 'rotate(0deg)';
            }, 600);
        }
        
        // Step 1: Get user's location from IP
        console.log('Getting user location...');
        const locationData = await getUserLocation();
        console.log('Location data:', locationData);
        
        // Step 2: Get weather data for the location
        console.log('Getting weather data...');
        const weatherDataResponse = await getWeatherData(locationData.latitude, locationData.longitude);
        console.log('Weather data:', weatherDataResponse);
        
        // Store weather data globally
        weatherData = weatherDataResponse;
        
        // Step 3: Display the weather information
        displayWeatherInfo(locationData, weatherDataResponse);
        
    } catch (error) {
        console.error('Error in getWeather:', error);
        showError(error.message);
    }
}

// Get user location from IP API
async function getUserLocation() {
    try {
        const response = await fetch(IP_API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.latitude || !data.longitude) {
            throw new Error('Invalid location data received from IP API');
        }
        
        return data;
    } catch (error) {
        console.error('Error getting location:', error);
        // Fallback to a default location (London) if IP detection fails
        return {
            latitude: 51.5074,
            longitude: -0.1278,
            city: 'London',
            region: 'England',
            country_name: 'United Kingdom'
        };
    }
}

// Get weather data from Open-Meteo API (completely free!)
async function getWeatherData(lat, lon) {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'weather_code',
            'surface_pressure',
            'wind_speed_10m',
            'wind_direction_10m'
        ].join(','),
        hourly: [
            'temperature_2m',
            'weather_code',
            'relative_humidity_2m'
        ].join(','),
        daily: [
            'temperature_2m_max',
            'temperature_2m_min',
            'weather_code',
            'uv_index_max',
            'sunrise',
            'sunset'
        ].join(','),
        timezone: 'auto',
        forecast_days: 7
    });
    
    const url = `${WEATHER_API_URL}?${params}`;
    console.log('Weather API URL:', url);
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Weather API error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Failed to fetch weather data. Please try again.');
    }
}

// Display weather information
function displayWeatherInfo(locationData, weatherDataResponse) {
    try {
        const current = weatherDataResponse.current;
        const daily = weatherDataResponse.daily;
        const hourly = weatherDataResponse.hourly;
        
        // Location information
        const cityName = locationData.city || locationData.region || 'Unknown Location';
        const countryName = locationData.country_name || 'Unknown Country';
        locationNameEl.textContent = `${cityName}, ${countryName}`;
        locationDetailsEl.textContent = `${locationData.region || ''}, ${countryName}`.replace(/^,\s*/, '');
        
        // Weather icon and description with enhanced selection
        const weatherCode = current.weather_code;
        const description = getWeatherDescription(weatherCode);
        const iconDisplay = getWeatherIcon(weatherCode, description);
        
        // Check if we should use text fallback
        const useTextIcon = iconDisplay.length <= 4 && !iconDisplay.includes('️');
        
        weatherIconEl.textContent = iconDisplay;
        weatherIconEl.className = useTextIcon ? 'weather-icon weather-text-icon' : 'weather-icon weather-emoji-icon';
        weatherDescEl.textContent = description;
        
        // Temperature with proper unit
        temperatureEl.textContent = formatTemperature(current.temperature_2m, currentTempUnit, false);
        feelsLikeEl.textContent = formatTemperature(current.apparent_temperature, currentTempUnit);
        
        // Weather details
        humidityEl.textContent = `${current.relative_humidity_2m}%`;
        windSpeedEl.textContent = `${Math.round(current.wind_speed_10m * 3.6)} km/h`;
        pressureEl.textContent = `${Math.round(current.surface_pressure)} hPa`;
        
        // Visibility estimation
        const visibility = estimateVisibility(weatherCode);
        visibilityEl.textContent = `${visibility} km`;
        
        // UV Index with proper color coding
        if (daily.uv_index_max && daily.uv_index_max[0] !== undefined) {
            const uvIndex = Math.round(daily.uv_index_max[0]);
            uvIndexEl.textContent = uvIndex;
            
            // Remove existing UV classes
            uvIndexCard.classList.remove('uv-low', 'uv-moderate', 'uv-high', 'uv-very-high', 'uv-extreme');
            
            // Add appropriate UV class and level text
            if (uvIndex <= 2) {
                uvIndexCard.classList.add('uv-low');
                uvLevelEl.textContent = 'Low';
            } else if (uvIndex <= 5) {
                uvIndexCard.classList.add('uv-moderate');
                uvLevelEl.textContent = 'Moderate';
            } else if (uvIndex <= 7) {
                uvIndexCard.classList.add('uv-high');
                uvLevelEl.textContent = 'High';
            } else if (uvIndex <= 10) {
                uvIndexCard.classList.add('uv-very-high');
                uvLevelEl.textContent = 'Very High';
            } else {
                uvIndexCard.classList.add('uv-extreme');
                uvLevelEl.textContent = 'Extreme';
            }
        }
        
        // Sunrise and Sunset
        if (daily.sunrise && daily.sunset) {
            const sunrise = new Date(daily.sunrise[0]);
            const sunset = new Date(daily.sunset[0]);
            sunriseEl.textContent = sunrise.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            sunsetEl.textContent = sunset.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
        
        // Store chart data and draw initial graph (temperature by default)
        chartData = hourly;
        currentGraphType = 'temperature'; // Ensure temperature is default
        
        // Auto-trigger the graph display after a short delay
        setTimeout(() => {
            drawGraph(hourly, currentGraphType);
            // Update graph controls to show temperature as active
            updateGraphControls();
        }, 500);
        
        // Display hourly forecast
        displayHourlyForecast(hourly);
        
        // Display 7-day forecast
        displayForecast(daily);
        
        // Last updated with more detailed timestamp
        const now = new Date();
        const timeString = now.toLocaleString([], {
            weekday: 'short',
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        lastUpdatedEl.textContent = timeString;
        
        // Save last update time
        localStorage.setItem('weather-last-update', Date.now().toString());
        
        // Show weather info with staggered animation
        hideLoading();
        hideError();
        weatherContainer.classList.remove('hidden');
        
        // Add entrance animations
        setTimeout(() => animateCards(), 100);
        
    } catch (error) {
        console.error('Error displaying weather info:', error);
        showError('Failed to display weather information');
    }
}

// Draw enhanced temperature/humidity graph without "NOW" text
function drawGraph(hourly, type = 'temperature') {
    try {
        const canvas = temperatureGraph;
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        // Set canvas size with high DPI support
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        
        const width = rect.width;
        const height = rect.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Get theme colors with better contrast
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
        const textColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
        const backgroundColor = isDark ? '#1e1e1e' : '#ffffff';
        
        // Enhanced colors for better distinction
        const lineColor = type === 'temperature' 
            ? (isDark ? '#bb86fc' : '#1976d2')
            : (isDark ? '#03dac6' : '#ff6f00');
        
        const gradientStartColor = type === 'temperature'
            ? (isDark ? 'rgba(187, 134, 252, 0.3)' : 'rgba(25, 118, 210, 0.3)')
            : (isDark ? 'rgba(3, 218, 198, 0.3)' : 'rgba(255, 111, 0, 0.3)');
        
        const gradientEndColor = type === 'temperature'
            ? (isDark ? 'rgba(187, 134, 252, 0.05)' : 'rgba(25, 118, 210, 0.05)')
            : (isDark ? 'rgba(3, 218, 198, 0.05)' : 'rgba(255, 111, 0, 0.05)');
        
        // Get data for next 24 hours
        let dataPoints = hourly[type === 'temperature' ? 'temperature_2m' : 'relative_humidity_2m'].slice(0, 24);
        const timePoints = hourly.time.slice(0, 24);
        
        // Convert temperature data if needed
        if (type === 'temperature' && currentTempUnit === 'F') {
            dataPoints = dataPoints.map(temp => convertTemperature(temp, 'C', 'F'));
        }
        
        if (!dataPoints || dataPoints.length === 0) {
            console.error('No data points available for graph');
            return;
        }
        
        // Calculate bounds with padding for better visualization
        const padding = { top: 50, right: 40, bottom: 60, left: 60 };
        const graphWidth = width - padding.left - padding.right;
        const graphHeight = height - padding.top - padding.bottom;
        
        const minValue = Math.min(...dataPoints);
        const maxValue = Math.max(...dataPoints);
        const valueRange = maxValue - minValue || 1;
        
        // Add some padding to the value range for better visualization
        const paddedMin = minValue - valueRange * 0.1;
        const paddedMax = maxValue + valueRange * 0.1;
        const paddedRange = paddedMax - paddedMin;
        
        // Draw background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
        
        // Draw grid with better styling
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        
        // Horizontal grid lines (5 lines)
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (graphHeight / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
            
            // Y-axis labels with better formatting
            const value = paddedMax - (paddedRange / 4) * i;
            ctx.fillStyle = textColor;
            ctx.font = 'bold 13px Roboto';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            
            const label = type === 'temperature' 
                ? `${Math.round(value)}°${currentTempUnit}` 
                : `${Math.round(value)}%`;
            
            ctx.fillText(label, padding.left - 10, y);
        }
        
        // Reset line dash for solid lines
        ctx.setLineDash([]);
        
        // Enhanced X-axis with local timezone hours
        const now = new Date();
        const currentHour = now.getHours();
        
        // Vertical grid lines and labels (every 4 hours for clarity)
        for (let i = 0; i < 24; i += 4) {
            const x = padding.left + (graphWidth / 23) * i;
            
            // Grid line
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, padding.top);
            ctx.lineTo(x, height - padding.bottom);
            ctx.stroke();
            
            // X-axis labels with local time
            const hourOffset = i;
            const displayHour = (currentHour + hourOffset) % 24;
            const timeLabel = `${displayHour.toString().padStart(2, '0')}:00`;
            
            ctx.fillStyle = textColor;
            ctx.font = 'bold 12px Roboto';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(timeLabel, x, height - padding.bottom + 10);
            
            // Add day indicator for midnight
            if (displayHour === 0 && i > 0) {
                ctx.font = '11px Roboto';
                ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
                const tomorrow = new Date(now.getTime() + (i * 60 * 60 * 1000));
                const dayLabel = tomorrow.toLocaleDateString([], { weekday: 'short' });
                ctx.fillText(dayLabel, x, height - padding.bottom + 25);
            }
        }
        
        // Draw gradient area under the line
        const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
        gradient.addColorStop(0, gradientStartColor);
        gradient.addColorStop(1, gradientEndColor);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(padding.left, height - padding.bottom);
        
        dataPoints.forEach((value, index) => {
            const x = padding.left + (graphWidth / (dataPoints.length - 1)) * index;
            const y = padding.top + graphHeight - ((value - paddedMin) / paddedRange) * graphHeight;
            
            if (index === 0) {
                ctx.lineTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.lineTo(width - padding.right, height - padding.bottom);
        ctx.closePath();
        ctx.fill();
        
        // Draw main data line with enhanced styling
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = lineColor;
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 2;
        
        ctx.beginPath();
        dataPoints.forEach((value, index) => {
            const x = padding.left + (graphWidth / (dataPoints.length - 1)) * index;
            const y = padding.top + graphHeight - ((value - paddedMin) / paddedRange) * graphHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
        // Draw enhanced data points with improved highlighting for current hour
        dataPoints.forEach((value, index) => {
            const x = padding.left + (graphWidth / (dataPoints.length - 1)) * index;
            const y = padding.top + graphHeight - ((value - paddedMin) / paddedRange) * graphHeight;
            
            // Regular points
            ctx.fillStyle = lineColor;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // White border for contrast
            ctx.strokeStyle = backgroundColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.stroke();
            
            // Highlight current hour (first point) with larger circle - NO "NOW" text
            if (index === 0) {
                ctx.strokeStyle = lineColor;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.stroke();
                
                // Show current value with better positioning
                const valueLabel = type === 'temperature' 
                    ? `${Math.round(value)}°${currentTempUnit}` 
                    : `${Math.round(value)}%`;
                
                ctx.font = 'bold 12px Roboto';
                ctx.fillStyle = lineColor;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(valueLabel, x, y - 15);
            }
            
            // Show value on hover points (every 6 hours, excluding first point)
            if (index % 6 === 0 && index !== 0) {
                ctx.fillStyle = textColor;
                ctx.font = 'bold 11px Roboto';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                const valueLabel = type === 'temperature' 
                    ? `${Math.round(value)}°` 
                    : `${Math.round(value)}%`;
                ctx.fillText(valueLabel, x, y - 15);
            }
        });
        
        // Draw title
        ctx.fillStyle = textColor;
        ctx.font = 'bold 16px Roboto';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const title = type === 'temperature' ? '24-Hour Temperature Forecast' : '24-Hour Humidity Forecast';
        ctx.fillText(title, width / 2, 10);
        
        // Update legend with enhanced styling
        if (legendLabel) {
            legendLabel.textContent = type === 'temperature' ? `Temperature (°${currentTempUnit})` : 'Humidity (%)';
            legendLabel.style.fontWeight = 'bold';
            legendLabel.style.color = lineColor;
        }
        
        console.log(`Graph drawn successfully for ${type}`);
        
    } catch (error) {
        console.error('Error drawing graph:', error);
    }
}

// Display hourly forecast for next 24 hours with enhanced descriptions
function displayHourlyForecast(hourly) {
    try {
        hourlyContainer.innerHTML = '';
        
        const now = new Date();
        
        // Show next 24 hours starting from current hour
        for (let i = 0; i < Math.min(24, hourly.time.length); i++) {
            // Convert to local time
            const utcTime = new Date(hourly.time[i]);
            const localTime = new Date(utcTime.getTime());
            
            const weatherCode = hourly.weather_code[i];
            const temp = hourly.temperature_2m[i];
            
            const isCurrent = i === 0;
            const hourDisplay = isCurrent ? 'Now' : localTime.toLocaleTimeString([], { 
                hour: '2-digit',
                minute: '2-digit',
                hour12: false 
            });
            
            // Get enhanced weather description and icon
            const description = getWeatherDescription(weatherCode);
            const iconDisplay = getWeatherIcon(weatherCode, description);
            const useTextIcon = iconDisplay.length <= 4 && !iconDisplay.includes('️');
            
            const hourlyItem = document.createElement('div');
            hourlyItem.className = `hourly-item ${isCurrent ? 'current' : ''}`;
            hourlyItem.innerHTML = `
                <div class="hourly-time">${hourDisplay}</div>
                <div class="hourly-icon ${useTextIcon ? 'text-icon' : 'emoji-icon'}" title="${description}">${iconDisplay}</div>
                <div class="hourly-temp">${formatTemperature(temp, currentTempUnit, false)}</div>
                <div class="hourly-desc">${description}</div>
            `;
            
            // Add click animation
            hourlyItem.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
            
            hourlyContainer.appendChild(hourlyItem);
        }
    } catch (error) {
        console.error('Error displaying hourly forecast:', error);
    }
}

// Display 7-day forecast with enhanced descriptions
function displayForecast(daily) {
    try {
        forecastContainer.innerHTML = '';
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(daily.time[i]);
            const weatherCode = daily.weather_code[i];
            const maxTemp = daily.temperature_2m_max[i];
            const minTemp = daily.temperature_2m_min[i];
            
            const isToday = i === 0;
            const isTomorrow = i === 1;
            
            let dayName;
            if (isToday) dayName = 'Today';
            else if (isTomorrow) dayName = 'Tomorrow';
            else dayName = date.toLocaleDateString([], { weekday: 'short' });
            
            const dayDate = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
            
            // Get enhanced weather description and icon
            const description = getWeatherDescription(weatherCode);
            const iconDisplay = getWeatherIcon(weatherCode, description);
            const useTextIcon = iconDisplay.length <= 4 && !iconDisplay.includes('️');
            
            const forecastItem = document.createElement('div');
            forecastItem.className = `forecast-item ${isToday ? 'today' : ''}`;
            forecastItem.innerHTML = `
                <div class="forecast-date">${dayName}</div>
                <div class="forecast-date" style="font-size: 0.75rem; opacity: 0.7; margin-bottom: 4px;">${dayDate}</div>
                <div class="forecast-icon ${useTextIcon ? 'text-icon' : 'emoji-icon'}" title="${description}">${iconDisplay}</div>
                <div class="forecast-temps">
                    <span class="forecast-high">${formatTemperature(maxTemp, currentTempUnit, false)}</span>
                    <span class="forecast-low">${formatTemperature(minTemp, currentTempUnit, false)}</span>
                </div>
                <div class="forecast-desc">${description}</div>
            `;
            
            // Add click animation
            forecastItem.addEventListener('click', function() {
                this.style.transform = 'scale(0.98) translateY(-2px)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
            
            forecastContainer.appendChild(forecastItem);
        }
    } catch (error) {
        console.error('Error displaying forecast:', error);
    }
}

// Update graph controls to show current selection
function updateGraphControls() {
    const graphToggles = document.querySelectorAll('.graph-toggle');
    
    graphToggles.forEach(toggle => {
        toggle.classList.remove('active');
        if (toggle.dataset.type === currentGraphType) {
            toggle.classList.add('active');
        }
    });
}

// Animate cards entrance
function animateCards() {
    try {
        const cards = document.querySelectorAll('.weather-container .mdc-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    } catch (error) {
        console.error('Error animating cards:', error);
    }
}

// Estimate visibility based on weather conditions
function estimateVisibility(weatherCode) {
    if (weatherCode === 45 || weatherCode === 48) return '0.5'; // Fog
    if (weatherCode >= 51 && weatherCode <= 67) return '5'; // Rain/drizzle
    if (weatherCode >= 71 && weatherCode <= 86) return '2'; // Snow
    if (weatherCode >= 95) return '3'; // Thunderstorm
    return '10'; // Clear/cloudy
}

// UI Helper functions
function showLoading() {
    loadingCard.classList.remove('hidden');
    errorCard.classList.add('hidden');
    weatherContainer.classList.add('hidden');
}

function hideLoading() {
    loadingCard.classList.add('hidden');
}

function showError(message = 'Something went wrong') {
    hideLoading();
    weatherContainer.classList.add('hidden');
    errorCard.classList.remove('hidden');
    
    // Update error message if provided
    const errorText = errorCard.querySelector('.mdc-typography--body2');
    if (errorText && message) {
        errorText.textContent = message;
    }
}

function hideError() {
    errorCard.classList.add('hidden');
}

// Setup graph controls with enhanced functionality
function setupGraphControls() {
    const graphToggles = document.querySelectorAll('.graph-toggle');
    
    graphToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const type = this.dataset.type;
            
            // Update active state
            graphToggles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update current graph type and redraw
            currentGraphType = type;
            if (chartData) {
                // Add smooth transition effect
                const canvas = temperatureGraph;
                if (canvas) {
                    canvas.style.opacity = '0.5';
                    setTimeout(() => {
                        drawGraph(chartData, type);
                        canvas.style.opacity = '1';
                    }, 150);
                }
            }
        });
    });
}

// Setup temperature unit toggle
function setupTemperatureUnitToggle() {
    if (unitToggleEl) {
        unitToggleEl.addEventListener('click', toggleTemperatureUnit);
    }
    
    // Initialize temperature unit display
    setTemperatureUnit(currentTempUnit);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    try {
        initializeTheme();
        setupGraphControls();
        setupTemperatureUnitToggle();
        
        // Auto-trigger weather data loading
        setTimeout(() => {
            getWeather();
        }, 100);
        
    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Failed to initialize weather app');
    }
});

// Theme toggle
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
        event.preventDefault();
        getWeather();
    }
    
    // Toggle theme with 'T' key
    if (event.key === 't' || event.key === 'T') {
        if (!event.ctrlKey && !event.altKey && !event.metaKey) {
            event.preventDefault();
            toggleTheme();
        }
    }
    
    // Switch graph type with 'G' key
    if (event.key === 'g' || event.key === 'G') {
        if (!event.ctrlKey && !event.altKey && !event.metaKey) {
            event.preventDefault();
            const newType = currentGraphType === 'temperature' ? 'humidity' : 'temperature';
            currentGraphType = newType;
            updateGraphControls();
            if (chartData) {
                drawGraph(chartData, newType);
            }
        }
    }
    
    // Toggle temperature unit with 'U' key
    if (event.key === 'u' || event.key === 'U') {
        if (!event.ctrlKey && !event.altKey && !event.metaKey) {
            event.preventDefault();
            toggleTemperatureUnit();
        }
    }
});

// Enhanced pull-to-refresh for mobile
let startY = 0;
let currentY = 0;
let isRefreshing = false;
let pullDistance = 0;

document.addEventListener('touchstart', function(e) {
    startY = e.touches[0].pageY;
    currentY = startY;
});

document.addEventListener('touchmove', function(e) {
    if (isRefreshing) return;
    
    currentY = e.touches[0].pageY;
    pullDistance = currentY - startY;
    
    if (pullDistance > 0 && window.scrollY === 0) {
        e.preventDefault();
        
        // Visual feedback for pull-to-refresh
        if (pullDistance > 60 && pullDistance < 120) {
            document.body.style.transform = `translateY(${Math.min(pullDistance * 0.5, 60)}px)`;
            document.body.style.transition = 'none';
        }
    }
});

document.addEventListener('touchend', function(e) {
    if (pullDistance > 100 && window.scrollY === 0 && !isRefreshing) {
        isRefreshing = true;
        document.body.style.transform = 'translateY(60px)';
        document.body.style.transition = 'transform 0.3s ease';
        
        getWeather().finally(() => {
            setTimeout(() => {
                document.body.style.transform = 'translateY(0)';
                setTimeout(() => {
                    document.body.style.transition = '';
                    isRefreshing = false;
                }, 300);
            }, 500);
        });
    } else {
        document.body.style.transform = 'translateY(0)';
        document.body.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    pullDistance = 0;
});

// Auto-refresh every 10 minutes
setInterval(() => {
    if (document.visibilityState === 'visible' && !isRefreshing) {
        console.log('Auto-refreshing weather data...');
        getWeather();
    }
}, 10 * 60 * 1000);

// Handle visibility change to refresh when coming back to tab
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !isRefreshing) {
        // Check if data is older than 5 minutes
        const lastUpdate = localStorage.getItem('weather-last-update');
        const now = Date.now();
        if (!lastUpdate || (now - parseInt(lastUpdate)) > 5 * 60 * 1000) {
            console.log('Refreshing weather data after visibility change...');
            getWeather();
        }
    }
});

// Handle canvas resize with debouncing
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (chartData) {
            drawGraph(chartData, currentGraphType);
        }
    }, 200);
});

// Error handling for failed network requests
window.addEventListener('online', function() {
    console.log('Connection restored, refreshing weather data...');
    if (!isRefreshing) {
        getWeather();
    }
});

window.addEventListener('offline', function() {
    console.log('Connection lost');
    showError('No internet connection. Please check your network and try again.');
});

// Global error handler
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

console.log('Enhanced weather app with Unicode icons loaded successfully');