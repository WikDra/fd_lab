import { Link } from 'react-router-dom';

// Ten komponent wyświetla stronę 404 gdy użytkownik próbuje uzyskać dostęp do nieistniejącej ścieżki
// Zawiera:
// - Nagłówek z komunikatem błędu
// - Informację dla użytkownika
// - Link powrotny do strony głównej używając React Router

const SpaceFound = () => {
  return (
    <div>
      <h1>404 - Strona nie istnieje</h1>
      <p>Przepraszamy, strona, której szukasz, nie została znaleziona i ma spację.</p>
      <Link to="/">Powrót na stronę główną</Link>
    </div>
  );
};

export default SpaceFound;