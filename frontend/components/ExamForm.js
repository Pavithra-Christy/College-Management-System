// src/components/ExamForm.js
import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { scheduleExam, getCourses } from "../services/api";

const ExamForm = ({ onExamAdded }) => {
  const [examData, setExamData] = useState({
    exam_id: "",
    course_id: "",
    exam_date: "",
    total_marks: "",
    passing_marks: "",
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const handleChange = (e) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await scheduleExam(examData);
    onExamAdded();
  };

  return (
    <Card className="p-3">
      <h4>Schedule Exam</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Course</Form.Label>
          <Form.Select name="course_id" value={examData.course_id} onChange={handleChange} required>
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Exam Date</Form.Label>
          <Form.Control type="date" name="exam_date" value={examData.exam_date} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Total Marks</Form.Label>
          <Form.Control type="number" name="total_marks" value={examData.total_marks} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Passing Marks</Form.Label>
          <Form.Control type="number" name="passing_marks" value={examData.passing_marks} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Schedule Exam
        </Button>
      </Form>
    </Card>
  );
};

export default ExamForm;
