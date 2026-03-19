// 🔧 Mode mock : utilise l'API provisoire locale (node mock-api/server.js)
// 🔑 Mode réel  : remplace API_KEY et passe USE_MOCK à false
const USE_MOCK = true;
const API_KEY = 'VOTRE_CLE_API_ICI';
const BASE_URL = USE_MOCK
  ? 'http://localhost:3000/weather'
  : 'https://api.openweathermap.org/data/2.5/weather';

// Éléments du DOM
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');
const errorDiv = document.getElementById('error');
const loader = document.getElementById('loader');

/**
 * Récupère les données météo pour une ville donnée
 * @param {string} city - Nom de la ville
 */
async function fetchWeather(city) {
  if (!city.trim()) return;

  showLoader(true);
  hideError();
  hideCard();

  try {
    const params = USE_MOCK
      ? `?q=${encodeURIComponent(city)}`
      : `?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`;
    const url = `${BASE_URL}${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      // Gestion des erreurs HTTP (404 ville introuvable, 401 clé invalide, etc.)
      const err = await response.json();
      throw new Error(getErrorMessage(response.status, err.message));
    }

    const data = await response.json();
    displayWeather(data);

  } catch (error) {
    showError(error.message);
  } finally {
    showLoader(false);
  }
}

/**
 * Affiche les données météo dans la carte
 * @param {Object} data - Données JSON de l'API
 */
function displayWeather(data) {
  document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('temp').textContent = `${Math.round(data.main.temp)} °C`;
  document.getElementById('humidity').textContent = `${data.main.humidity} %`;
  document.getElementById('wind').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
  document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)} °C`;

  weatherCard.classList.remove('hidden');
}

/**
 * Retourne un message d'erreur lisible selon le code HTTP
 */
function getErrorMessage(status, fallback) {
  const messages = {
    404: 'Ville introuvable. Vérifiez le nom et réessayez.',
    401: 'Clé API invalide. Vérifiez votre configuration.',
    429: 'Trop de requêtes. Attendez un moment.',
  };
  return messages[status] || fallback || 'Une erreur est survenue.';
}

// Utilitaires d'affichage
function showLoader(visible) {
  loader.classList.toggle('hidden', !visible);
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}

function hideError() {
  errorDiv.classList.add('hidden');
}

function hideCard() {
  weatherCard.classList.add('hidden');
}

// Événements
searchBtn.addEventListener('click', () => fetchWeather(cityInput.value));

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') fetchWeather(cityInput.value);
});
