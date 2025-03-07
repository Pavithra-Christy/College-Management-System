from flask import Blueprint, request, jsonify
from models.exams import Exam

exams_bp = Blueprint("exams", __name__)

@exams_bp.route("/exams", methods=["GET"])
def get_exams():
    """Fetch all exams"""
    exams = Exam.get_all_exams()
    return jsonify(exams)

@exams_bp.route("/exams/<int:exam_id>", methods=["GET"])
def get_exam(exam_id):
    """Fetch a single exam by ID"""
    exam = Exam.get_exam_by_id(exam_id)
    if exam:
        return jsonify(exam), 200
    return jsonify({"error": "Exam not found"}), 404

@exams_bp.route("/exams", methods=["POST"])
def add_exam():
    """Add a new exam"""
    data = request.json
    success = Exam.schedule_exam(**data)
    return jsonify({"message": "Exam scheduled successfully!"} if success else {"error": "Failed to schedule exam"})
