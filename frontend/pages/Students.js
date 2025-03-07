// src/pages/Students.js
import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

const Students = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <Container className="mt-4">
      <h2>Manage Students</h2>
      <Row>
        <Col md={4}>
          <Card className="p-3">
            <StudentForm onStudentAdded={handleRefresh} />
          </Card>
        </Col>
        <Col md={8}>
          <Card className="p-3">
            <StudentList key={refresh} onStudentRemoved={handleRefresh} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Students;
