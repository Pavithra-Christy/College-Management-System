import React, { useState, useEffect } from "react";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";
import { getData } from "../services/api";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getData("courses");
      setCourses(data);
    } catch (err) {
      setError("❌ Failed to fetch courses.");
    }
  };

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setShowForm(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setShowForm(true);
  };

  const handleCourseAdded = () => {
    fetchCourses();
    setShowForm(false);
    setSuccess("✅ Course updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>📚 Manage Courses</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Button variant="primary" onClick={handleAddCourse}>
            ➕ Add New Course
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={showForm ? 6 : 12}>
          <CourseList courses={courses} onEdit={handleEditCourse} refreshCourses={fetchCourses} />
        </Col>
        {showForm && (
          <Col md={6}>
            <CourseForm courseToEdit={selectedCourse} onCourseAdded={handleCourseAdded} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Courses;
