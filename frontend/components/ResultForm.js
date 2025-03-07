// src/components/ResultForm.js
import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { addResult, getStudents, getExams } from "../services/api";

const ResultForm = ({ onResultAdded }) => {
  const [resultData, setResultData] = useState({
    student_id: "",
    exam_id: "",
    score: "",
    grade: "",
  });

  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchExams();
  }, []);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const fetchExams = async () => {
    const data = await getExams();
    setExams(data);
  };

  const handleChange = (e) => {
    setResultData({ ...resultData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addResult(resultData);
    onResultAdded();
  };

  return (
    <Card className="p-3">
      <h4>Add Student Result</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Student</Form.Label>
          <Form.Select name="student_id" value={resultData.student_id} onChange={handleChange} required>
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.student_id} value={student.student_id}>
                {student.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Exam</Form.Label>
          <Form.Select name="exam_id" value={resultData.exam_id} onChange={handleChange} required>
            <option value="">Select Exam</option>
            {exams.map((exam) => (
              <option key={exam.exam_id} value={exam.exam_id}>
                {exam.course_name} - {exam.exam_date}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Score</Form.Label>
          <Form.Control type="number" name="score" value={resultData.score} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Grade</Form.Label>
          <Form.Control type="text" name="grade" value={resultData.grade} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Submit Result
        </Button>
      </Form>
    </Card>
  );
};

export default ResultForm;
