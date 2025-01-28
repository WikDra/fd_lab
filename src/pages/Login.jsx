// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

// Ten komponent obsługuje logowanie użytkownika:
// - Przechowuje stan nazwy użytkownika i hasła
// - Waliduje formularz przed wysłaniem
// - Wykorzystuje React Bootstrap do stylizacji
// - Po udanym logowaniu przekierowuje na stronę główną
// - Używa useNavigate z React Router do nawigacji

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // Inicjalizacja stanów i hooka nawigacji

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true); // Ustaw stan logowania na true
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/'); // Przekierowanie na stronę główną
    } else {
      alert('Proszę wprowadzić nazwę użytkownika i hasło.');
    }
  };
  // Obsługa logowania i walidacji formularza

  return (
    <Container>
      <h1>Logowanie</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUsername">
          <Form.Label>Nazwa użytkownika</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wprowadź nazwę użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type="password"
            placeholder="Wprowadź hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};
// Komponent formularza logowania z walidacją i przekierowaniem

export default Login;

