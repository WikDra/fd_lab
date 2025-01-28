// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import stylów Bootstrap

// Główny punkt wejścia aplikacji:
// - Inicjalizuje aplikację React
// - Importuje i konfiguruje Bootstrap
// - Renderuje główny komponent App
// - Używa StrictMode dla lepszego debugowania

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);