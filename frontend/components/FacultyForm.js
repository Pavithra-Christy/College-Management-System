// src/components/FacultyForm.js
import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { addFaculty, updateFaculty } from "../services/api";

const FacultyForm = ({ selectedFaculty, onFacultyUpdated }) => {
  const [facultyData, setFacultyData] = useState({
    faculty_id: "",
    name: "",
    department_id: "",
    email: "",
  });

  useEffect(() => {
    if (selectedFaculty) {
      setFacultyData(selectedFaculty);
    }
  }, [selectedFaculty]);

  const handleChange = (e) => {
    setFacultyData({ ...facultyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFaculty) {
      await updateFaculty(facultyData.faculty_id, facultyData);
    } else {
      await addFaculty(facultyData);
    }
    onFacultyUpdated();
  };

  return (
    <Card className="p-3">
      <h4>{selectedFaculty ? "Update Faculty" : "Add Faculty"}</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={facultyData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Department ID</Form.Label>
          <Form.Control
            type="text"
            name="department_id"
            value={facultyData.department_id}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={facultyData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          {selectedFaculty ? "Update Faculty" : "Add Faculty"}
        </Button>
      </Form>
    </Card>
  );
};

export default FacultyForm;
