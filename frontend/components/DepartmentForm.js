// src/components/DepartmentForm.js
import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { addDepartment, updateDepartment } from "../services/api";

const DepartmentForm = ({ selectedDepartment, onDepartmentUpdated }) => {
  const [departmentData, setDepartmentData] = useState({
    department_id: "",
    name: "",
  });

  useEffect(() => {
    if (selectedDepartment) {
      setDepartmentData(selectedDepartment);
    }
  }, [selectedDepartment]);

  const handleChange = (e) => {
    setDepartmentData({ ...departmentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDepartment) {
      await updateDepartment(departmentData.department_id, departmentData);
    } else {
      await addDepartment(departmentData);
    }
    onDepartmentUpdated();
  };

  return (
    <Card className="p-3">
      <h4>{selectedDepartment ? "Update Department" : "Add Department"}</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Department Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={departmentData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          {selectedDepartment ? "Update Department" : "Add Department"}
        </Button>
      </Form>
    </Card>
  );
};

export default DepartmentForm;
