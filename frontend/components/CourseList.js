// src/components/CourseList.js
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getCourses, deleteCourse } from "../services/api";

const CourseList = ({ onEdit }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const handleDelete = async (courseId) => {
    await deleteCourse(courseId);
    fetchCourses();
  };

  return (
    <div>
      <h4>Course List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Name</th>
            <th>Credits</th>
            <th>Department ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.course_id}>
              <td>{course.course_id}</td>
              <td>{course.name}</td>
              <td>{course.credits}</td>
              <td>{course.department_id}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => onEdit(course)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(course.course_id)}>
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

export default CourseList;
