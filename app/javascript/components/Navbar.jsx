import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

export default function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#">🐦 Twitter</Navbar.Brand>
        <Nav className="ms-auto">
          <NavDropdown title="Language: English" id="language-dropdown">
            <NavDropdown.Item href="#">English</NavDropdown.Item>
            <NavDropdown.Item href="#">Suomi</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
