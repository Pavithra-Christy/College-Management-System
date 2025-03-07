// src/pages/Dashboard.js
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container className="mt-4">
      <h2>Dashboard</h2>
      <Row>
        <Col md={4}>
          <Card className="p-3 text-center">
            <h4>Students</h4>
            <p>Manage student records</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 text-center">
            <h4>Courses</h4>
            <p>Manage courses and curriculum</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 text-center">
            <h4>Faculty</h4>
            <p>Manage faculty details</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
