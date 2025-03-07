// src/components/Navbar.js
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/">College Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/students" activeClassName="active">Students</Nav.Link>
            <Nav.Link as={NavLink} to="/courses" activeClassName="active">Courses</Nav.Link>
            <Nav.Link as={NavLink} to="/faculty" activeClassName="active">Faculty</Nav.Link>
            <Nav.Link as={NavLink} to="/departments" activeClassName="active">Departments</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
