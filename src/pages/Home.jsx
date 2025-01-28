// src/pages/Home.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Ten komponent wyświetla stronę główną:
// - Sprawdza czy użytkownik jest zalogowany
// - Przekierowuje niezalogowanych użytkowników do strony logowania
// - Wykorzystuje useEffect do sprawdzania stanu logowania
// - Wyświetla podstawową treść strony głównej

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedInStorage = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn && !isLoggedInStorage) {
      navigate('/login'); // Przekierowanie na stronę logowania, jeśli użytkownik nie jest zalogowany
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h1>Witaj na stronie głównej!</h1>
      <p>To jest przykładowa aplikacja React z routingiem.</p>
    </div>
  );
};

export default Home;