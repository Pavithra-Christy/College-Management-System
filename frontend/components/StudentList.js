import React, { useEffect, useState } from "react";
import { getData, deleteData } from "../services/api";
import { Table, Button, Alert, Spinner } from "react-bootstrap";

const StudentList = ({ onEdit }) => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getData("students");
      setStudents(data);
    } catch (err) {
      setError("❌ Failed to fetch students.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await deleteData("students", id);
      setSuccess("✅ Student deleted successfully!");
      fetchStudents(); // Refresh the list
    } catch (err) {
      setError("❌ Failed to delete student.");
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p>Loading students...</p>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.department_name || "N/A"}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => onEdit(student)}>
                      ✏️ Edit
                    </Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(student.id)}>
                      🗑 Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default StudentList;
