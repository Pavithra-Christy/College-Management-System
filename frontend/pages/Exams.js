import React, { useState, useEffect } from "react";
import ExamForm from "../components/ExamForm";
import ExamList from "../components/ExamList";
import { getData } from "../services/api";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const data = await getData("exams");
      setExams(data);
    } catch (err) {
      setError("❌ Failed to fetch exams.");
    }
  };

  const handleAddExam = () => {
    setSelectedExam(null);
    setShowForm(true);
  };

  const handleEditExam = (exam) => {
    setSelectedExam(exam);
    setShowForm(true);
  };

  const handleExamAdded = () => {
    fetchExams();
    setShowForm(false);
    setSuccess("✅ Exam updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>📚 Manage Exams</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Button variant="primary" onClick={handleAddExam}>
            ➕ Schedule Exam
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={showForm ? 6 : 12}>
          <ExamList exams={exams} onEdit={handleEditExam} refreshExams={fetchExams} />
        </Col>
        {showForm && (
          <Col md={6}>
            <ExamForm examToEdit={selectedExam} onExamAdded={handleExamAdded} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Exams;
