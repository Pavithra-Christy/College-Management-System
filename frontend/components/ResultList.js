// src/components/ResultList.js
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getResults, deleteResult } from "../services/api";

const ResultList = ({ onResultRemoved }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const data = await getResults();
    setResults(data);
  };

  const handleDelete = async (studentId, examId) => {
    await deleteResult(studentId, examId);
    fetchResults();
    onResultRemoved();
  };

  return (
    <div>
      <h4>Student Results</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Exam</th>
            <th>Score</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={`${result.student_id}-${result.exam_id}`}>
              <td>{result.student_name}</td>
              <td>{result.course_name} - {result.exam_date}</td>
              <td>{result.score}</td>
              <td>{result.grade}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(result.student_id, result.exam_id)}>
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

export default ResultList;
