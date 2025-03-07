import React, { useState, useEffect } from "react";
import EnrollmentForm from "../components/EnrollmentForm";
import EnrollmentList from "../components/EnrollmentList";
import { getData } from "../services/api";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

const Enrollment = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const data = await getData("enrollment");
      setEnrollments(data);
    } catch (err) {
      setError("❌ Failed to fetch enrollments.");
    }
  };

  const handleAddEnrollment = () => {
    setSelectedEnrollment(null);
    setShowForm(true);
  };

  const handleEditEnrollment = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setShowForm(true);
  };

  const handleEnrollmentAdded = () => {
    fetchEnrollments();
    setShowForm(false);
    setSuccess("✅ Enrollment updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>🎓 Manage Enrollments</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Button variant="primary" onClick={handleAddEnrollment}>
            ➕ Enroll Student
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={showForm ? 6 : 12}>
          <EnrollmentList
            enrollments={enrollments}
            onEdit={handleEditEnrollment}
            refreshEnrollments={fetchEnrollments}
          />
        </Col>
        {showForm && (
          <Col md={6}>
            <EnrollmentForm
              enrollmentToEdit={selectedEnrollment}
              onEnrollmentAdded={handleEnrollmentAdded}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Enrollment;
