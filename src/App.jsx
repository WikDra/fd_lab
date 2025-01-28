// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SpaceFound from './pages/SpaceFound';

// Główny komponent aplikacji:
// - Zarządza stanem logowania użytkownika
// - Konfiguruje routing z React Router
// - Implementuje chronione ścieżki
// - Przekierowuje niezalogowanych użytkowników do strony logowania
// - Renderuje odpowiedni komponent dla każdej ścieżki

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Sprawdź localStorage podczas inicjalizacji
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Dodaj efekt śledzący zmiany stanu logowania
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);
  // Stan globalny aplikacji przechowujący informację o zalogowaniu

  // Funkcja sprawdzająca czy URL zawiera spację
  const hasSpaceInUrl = () => {
    const currentPath = window.location.pathname;
    return currentPath.includes('%20');
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Sprawdzenie spacji musi być przed innymi ścieżkami */}
        <Route
          path="*"
          element={hasSpaceInUrl() ? <SpaceFound /> : <NotFound />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Home isLoggedIn={isLoggedIn} /> : <Navigate to="/login" />}
        />
        // Chroniona ścieżka - przekierowanie niezalogowanych użytkowników
        <Route
          path="/about"
          element={isLoggedIn ? <About isLoggedIn={isLoggedIn} /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={isLoggedIn ? <Contact isLoggedIn={isLoggedIn} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
       
        // Obsługa nieistniejących ścieżek
      </Routes>
    </BrowserRouter>
  );
}

export default App;