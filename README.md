# 🌤 Météo App

Application web qui affiche la météo en temps réel via l'API OpenWeatherMap.

## Aperçu

![Interface sombre avec barre de recherche et carte météo affichant température, humidité, vent et ressenti]

## Fonctionnalités

- Recherche météo par nom de ville
- Affichage : température, ressenti, humidité, vitesse du vent
- Gestion des erreurs (ville introuvable, clé invalide, etc.)
- Interface responsive avec loader animé

## Stack

- HTML / CSS / JavaScript vanilla
- API REST : [OpenWeatherMap](https://openweathermap.org/api)
- `fetch` + `async/await`

## Installation

1. Clone le projet :
   ```bash
   git clone https://github.com/ton-user/weather-app.git
   cd weather-app
   ```

2. Obtiens une clé API gratuite sur [openweathermap.org](https://openweathermap.org/api)

3. Dans `app.js`, remplace la valeur de `API_KEY` :
   ```js
   const API_KEY = 'ta_cle_api_ici';
   ```

4. Ouvre `index.html` dans un navigateur ou utilise Live Server (VS Code).

## Structure

```
weather-app/
├── index.html   # Structure de la page
├── style.css    # Styles et mise en page
├── app.js       # Logique et appels API
└── README.md
```
<img width="481" height="449" alt="image" src="https://github.com/user-attachments/assets/afc94d90-01a1-41e7-83c1-117ebd2d04bd" />

## Concepts abordés

- Consommation d'une API REST avec `fetch`
- Programmation asynchrone (`async/await`)
- Gestion des erreurs HTTP
- Manipulation du DOM

## Licence

MIT
