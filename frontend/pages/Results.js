import React, { useState, useEffect } from "react";
import ResultForm from "../components/ResultForm";
import ResultList from "../components/ResultList";
import { getData } from "../services/api";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

const Results = () => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const data = await getData("results");
      setResults(data);
    } catch (err) {
      setError("❌ Failed to fetch results.");
    }
  };

  const handleAddResult = () => {
    setSelectedResult(null);
    setShowForm(true);
  };

  const handleEditResult = (result) => {
    setSelectedResult(result);
    setShowForm(true);
  };

  const handleResultAdded = () => {
    fetchResults();
    setShowForm(false);
    setSuccess("✅ Result updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>📊 Manage Results</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Button variant="primary" onClick={handleAddResult}>
            ➕ Add Result
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={showForm ? 6 : 12}>
          <ResultList results={results} onEdit={handleEditResult} refreshResults={fetchResults} />
        </Col>
        {showForm && (
          <Col md={6}>
            <ResultForm resultToEdit={selectedResult} onResultAdded={handleResultAdded} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Results;
