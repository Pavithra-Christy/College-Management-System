// src/components/Sidebar.js
import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaUserGraduate, FaBook, FaChalkboardTeacher, FaBuilding } from "react-icons/fa";

const Sidebar = () => {
  return (
    <Nav className="flex-column bg-light vh-100 p-3 sidebar">
      <Nav.Link as={NavLink} to="/students" activeClassName="active">
        <FaUserGraduate className="me-2" /> Students
      </Nav.Link>
      <Nav.Link as={NavLink} to="/courses" activeClassName="active">
        <FaBook className="me-2" /> Courses
      </Nav.Link>
      <Nav.Link as={NavLink} to="/faculty" activeClassName="active">
        <FaChalkboardTeacher className="me-2" /> Faculty
      </Nav.Link>
      <Nav.Link as={NavLink} to="/departments" activeClassName="active">
        <FaBuilding className="me-2" /> Departments
      </Nav.Link>
    </Nav>
  );
};

export default Sidebar;
