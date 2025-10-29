import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

const Navigation = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    setExpanded(false);
  };

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      expanded={expanded}
      className="shadow-sm"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          EventUp
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
        />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              active={location.pathname === "/"}
              onClick={() => setExpanded(false)}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/events"
              active={location.pathname.startsWith("/events")}
              onClick={() => setExpanded(false)}
            >
              Eventos
            </Nav.Link>

            {user ? (
              <NavDropdown
                title={user.name || "Usuário"}
                id="user-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/profile"
                  active={location.pathname === "/profile"}
                  onClick={() => setExpanded(false)}
                >
                  Perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  Sair
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                active={location.pathname === "/login"}
                onClick={() => setExpanded(false)}
              >
                Entrar
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
