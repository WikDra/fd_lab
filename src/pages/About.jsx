// src/pages/About.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedInStorage = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn && !isLoggedInStorage) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h1>O nas</h1>
      <p>Informacje o aplikacji i jej twórcach.</p>
    </div>
  );
};

export default About;

// Ten komponent wyświetla informacje o aplikacji:
// - Dostępny tylko dla zalogowanych użytkowników
// - Wykorzystuje useEffect do sprawdzania stanu logowania
// - Przekierowuje niezalogowanych użytkowników
// - Wyświetla statyczną treść o aplikacji