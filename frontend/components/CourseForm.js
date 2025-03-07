// src/components/CourseForm.js
import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { addCourse, updateCourse } from "../services/api";

const CourseForm = ({ selectedCourse, onCourseUpdated }) => {
  const [courseData, setCourseData] = useState({
    course_id: "",
    name: "",
    credits: "",
    department_id: "",
  });

  useEffect(() => {
    if (selectedCourse) {
      setCourseData(selectedCourse);
    }
  }, [selectedCourse]);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCourse) {
      await updateCourse(courseData.course_id, courseData);
    } else {
      await addCourse(courseData);
    }
    onCourseUpdated();
  };

  return (
    <Card className="p-3">
      <h4>{selectedCourse ? "Update Course" : "Add Course"}</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Credits</Form.Label>
          <Form.Control
            type="number"
            name="credits"
            value={courseData.credits}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Department ID</Form.Label>
          <Form.Control
            type="text"
            name="department_id"
            value={courseData.department_id}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          {selectedCourse ? "Update Course" : "Add Course"}
        </Button>
      </Form>
    </Card>
  );
};

export default CourseForm;
