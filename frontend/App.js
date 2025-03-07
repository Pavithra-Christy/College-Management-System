// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Faculty from "./pages/Faculty";
import Departments from "./pages/Departments";
import Enrollment from "./pages/Enrollment";
import Exams from "./pages/Exams";
import Results from "./pages/Results";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Container fluid>
        <Row>
          <Col md={2} className="d-none d-md-block bg-light p-3">
            <Sidebar />
          </Col>
          <Col md={10} className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/enrollment" element={<Enrollment />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
