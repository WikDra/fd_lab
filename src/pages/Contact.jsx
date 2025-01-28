// src/pages/Contact.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Ten komponent zawiera formularz kontaktowy:
// - Chroni dostęp tylko dla zalogowanych użytkowników
// - Zawiera pola: imię, email i wiadomość
// - Wykorzystuje podstawowy formularz HTML
// - Implementuje zabezpieczenie przekierowujące niezalogowanych użytkowników

const Contact = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedInStorage = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn && !isLoggedInStorage) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h1>Kontakt</h1>
      <form>
        <label>
          Imię:
          <input type="text" name="name" />
        </label>
        <label>
          E-mail:
          <input type="email" name="email" />
        </label>
        <label>
          Wiadomość:
          <textarea name="message" />
        </label>
        <button type="submit">Wyślij</button>
      </form>
    </div>
  );
};

export default Contact;