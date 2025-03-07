import React, { useState, useEffect } from "react";
import { addData, updateData, getData } from "../services/api";
import { Form, Button, Alert } from "react-bootstrap";

const StudentForm = ({ studentToEdit, onStudentAdded }) => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "Male",
    phone: "",
    address: "",
    department_id: "",
  });

  const [departments, setDepartments] = useState([]); // ✅ Fetch department list dynamically
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Populate form if editing an existing student
  useEffect(() => {
    if (studentToEdit) setStudent(studentToEdit);
    fetchDepartments();
  }, [studentToEdit]);

  // Fetch departments from API
  const fetchDepartments = async () => {
    try {
      const data = await getData("departments");
      setDepartments(data);
    } catch (err) {
      setError("❌ Failed to load departments.");
    }
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!student.name || !student.email || !student.dob || !student.phone || !student.department_id) {
      setError("❌ All fields are required!");
      return;
    }

    try {
      if (studentToEdit) {
        await updateData("students", studentToEdit.id, student);
        setSuccess("✅ Student updated successfully!");
      } else {
        await addData("students", student);
        setSuccess("✅ Student added successfully!");
        setStudent({ name: "", email: "", dob: "", gender: "Male", phone: "", address: "", department_id: "" }); // Reset form
      }
      onStudentAdded(); // Refresh the student list
    } catch (err) {
      setError("❌ Failed to save student. Try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={student.name} onChange={handleChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={student.email} onChange={handleChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control type="date" name="dob" value={student.dob} onChange={handleChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Gender</Form.Label>
        <Form.Control as="select" name="gender" value={student.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" name="phone" value={student.phone} onChange={handleChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" name="address" value={student.address} onChange={handleChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Department</Form.Label>
        <Form.Control as="select" name="department_id" value={student.department_id} onChange={handleChange} required>
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        {studentToEdit ? "Update Student" : "Add Student"}
      </Button>
    </Form>
  );
};

export default StudentForm;
