// src/components/EnrollmentList.js
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getEnrollments, removeEnrollment } from "../services/api";

const EnrollmentList = ({ onEnrollmentRemoved }) => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    const data = await getEnrollments();
    setEnrollments(data);
  };

  const handleRemove = async (enrollmentId) => {
    await removeEnrollment(enrollmentId);
    fetchEnrollments();
    onEnrollmentRemoved();
  };

  return (
    <div>
      <h4>Enrollment List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Enrollment ID</th>
            <th>Student Name</th>
            <th>Course Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment.enrollment_id}>
              <td>{enrollment.enrollment_id}</td>
              <td>{enrollment.student_name}</td>
              <td>{enrollment.course_name}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleRemove(enrollment.enrollment_id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EnrollmentList;
