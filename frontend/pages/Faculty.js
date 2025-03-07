import React, { useState, useEffect } from "react";
import FacultyForm from "../components/FacultyForm";
import FacultyList from "../components/FacultyList";
import { getData } from "../services/api";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const data = await getData("faculty");
      setFaculty(data);
    } catch (err) {
      setError("❌ Failed to fetch faculty members.");
    }
  };

  const handleAddFaculty = () => {
    setSelectedFaculty(null);
    setShowForm(true);
  };

  const handleEditFaculty = (facultyMember) => {
    setSelectedFaculty(facultyMember);
    setShowForm(true);
  };

  const handleFacultyAdded = () => {
    fetchFaculty();
    setShowForm(false);
    setSuccess("✅ Faculty updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>👨‍🏫 Manage Faculty</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Button variant="primary" onClick={handleAddFaculty}>
            ➕ Add Faculty Member
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={showForm ? 6 : 12}>
          <FacultyList faculty={faculty} onEdit={handleEditFaculty} refreshFaculty={fetchFaculty} />
        </Col>
        {showForm && (
          <Col md={6}>
            <FacultyForm facultyToEdit={selectedFaculty} onFacultyAdded={handleFacultyAdded} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Faculty;
