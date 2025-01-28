// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

// Komponent nawigacyjny:
// - Wyświetla różne opcje menu w zależności od stanu logowania
// - Wykorzystuje React Bootstrap do stylizacji
// - Zawiera przycisk wylogowania dla zalogowanych użytkowników
// - Implementuje responsywne menu typu hamburger
// - Używa React Router do nawigacji między stronami

const CustomNavbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };
  // Funkcja wylogowania użytkownika
            // Warunkowe renderowanie linków nawigacyjnych
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              </>
            )}
            
          </Nav>
          {isLoggedIn ? (
            <Button variant="danger" onClick={handleLogout}>
              Wyloguj
            </Button>
          ) : (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          )}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
          // Warunkowe renderowanie przycisku logowania/wylogowania
export default CustomNavbar;