// src/components/DepartmentList.js
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getDepartments, deleteDepartment } from "../services/api";

const DepartmentList = ({ onEdit }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const data = await getDepartments();
    setDepartments(data);
  };

  const handleDelete = async (departmentId) => {
    await deleteDepartment(departmentId);
    fetchDepartments();
  };

  return (
    <div>
      <h4>Department List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.department_id}>
              <td>{department.department_id}</td>
              <td>{department.name}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => onEdit(department)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(department.department_id)}>
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

export default DepartmentList;
