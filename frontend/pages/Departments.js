import React, { useState, useEffect } from "react";
import DepartmentForm from "../components/DepartmentForm";
import DepartmentList from "../components/DepartmentList";
import { getData } from "../services/api";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await getData("departments");
      setDepartments(data);
    } catch (err) {
      setError("❌ Failed to fetch departments.");
    }
  };

  const handleAddDepartment = () => {
    setSelectedDepartment(null);
    setShowForm(true);
  };

  const handleEditDepartment = (department) => {
    setSelectedDepartment(department);
    setShowForm(true);
  };

  const handleDepartmentAdded = () => {
    fetchDepartments();
    setShowForm(false);
    setSuccess("✅ Department updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>🏛 Manage Departments</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Button variant="primary" onClick={handleAddDepartment}>
            ➕ Add New Department
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={showForm ? 6 : 12}>
          <DepartmentList
            departments={departments}
            onEdit={handleEditDepartment}
            refreshDepartments={fetchDepartments}
          />
        </Col>
        {showForm && (
          <Col md={6}>
            <DepartmentForm
              departmentToEdit={selectedDepartment}
              onDepartmentAdded={handleDepartmentAdded}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Departments;
