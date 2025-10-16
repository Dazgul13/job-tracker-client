import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { showSuccess } from '../services/notificationService';

export default function Navigation() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    user.clearToken();
    showSuccess('Logged out successfully!');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          <i className="bi bi-briefcase-fill me-2"></i>
          Job Tracker
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user.isAuthenticated() && (
              <>
                <Nav.Link as={Link} to="/" className="nav-link-custom">
                  <i className="bi bi-house-fill me-1"></i>
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/addJob" className="nav-link-custom">
                  <i className="bi bi-plus-circle-fill me-1"></i>
                  Add Job
                </Nav.Link>
              </>
            )}
          </Nav>
          
          <Nav>
            {user.isAuthenticated() ? (
              <Button 
                variant="outline-light" 
                size="sm" 
                onClick={handleLogout}
                className="rounded-pill px-3"
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                Logout
              </Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link-custom">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-link-custom">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}