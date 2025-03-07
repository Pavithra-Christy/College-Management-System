// src/components/EnrollmentForm.js
import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { enrollStudent, getStudents, getCourses } from "../services/api";

const EnrollmentForm = ({ onEnrollmentAdded }) => {
  const [enrollmentData, setEnrollmentData] = useState({
    student_id: "",
    course_id: "",
  });
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const fetchCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const handleChange = (e) => {
    setEnrollmentData({ ...enrollmentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await enrollStudent(enrollmentData);
    onEnrollmentAdded();
  };

  return (
    <Card className="p-3">
      <h4>Enroll Student</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Student</Form.Label>
          <Form.Select name="student_id" value={enrollmentData.student_id} onChange={handleChange} required>
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.student_id} value={student.student_id}>
                {student.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Course</Form.Label>
          <Form.Select name="course_id" value={enrollmentData.course_id} onChange={handleChange} required>
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Enroll
        </Button>
      </Form>
    </Card>
  );
};

export default EnrollmentForm;
