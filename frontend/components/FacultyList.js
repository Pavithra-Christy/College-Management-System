// src/components/FacultyList.js
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getFaculty, deleteFaculty } from "../services/api";

const FacultyList = ({ onEdit }) => {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    const data = await getFaculty();
    setFaculty(data);
  };

  const handleDelete = async (facultyId) => {
    await deleteFaculty(facultyId);
    fetchFaculty();
  };

  return (
    <div>
      <h4>Faculty List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Faculty ID</th>
            <th>Name</th>
            <th>Department ID</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((member) => (
            <tr key={member.faculty_id}>
              <td>{member.faculty_id}</td>
              <td>{member.name}</td>
              <td>{member.department_id}</td>
              <td>{member.email}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => onEdit(member)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(member.faculty_id)}>
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

export default FacultyList;
