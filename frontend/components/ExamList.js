// src/components/ExamList.js
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getExams, deleteExam } from "../services/api";

const ExamList = ({ onExamRemoved }) => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const data = await getExams();
    setExams(data);
  };

  const handleDelete = async (examId) => {
    await deleteExam(examId);
    fetchExams();
    onExamRemoved();
  };

  return (
    <div>
      <h4>Exam List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Exam ID</th>
            <th>Course</th>
            <th>Exam Date</th>
            <th>Total Marks</th>
            <th>Passing Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.exam_id}>
              <td>{exam.exam_id}</td>
              <td>{exam.course_name}</td>
              <td>{exam.exam_date}</td>
              <td>{exam.total_marks}</td>
              <td>{exam.passing_marks}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(exam.exam_id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExamList;
