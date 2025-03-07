from flask import Blueprint, request, jsonify
from models.students import Student

students_bp = Blueprint("students", __name__)

@students_bp.route("/students", methods=["GET"])
def get_students():
    """Fetch all students"""
    students = Student.get_all_students()
    return jsonify(students)

@students_bp.route("/students/<int:student_id>", methods=["GET"])
def get_student(student_id):
    """Fetch a single student by ID"""
    student = Student.get_student_by_id(student_id)
    if student:
        return jsonify(student), 200
    return jsonify({"error": "Student not found"}), 404

@students_bp.route("/students", methods=["POST"])
def add_student():
    """Add a new student"""
    data = request.json
    success = Student.add_student(**data)
    return jsonify({"message": "Student added successfully!"} if success else {"error": "Failed to add student"})

@students_bp.route("/students/<int:student_id>", methods=["PUT"])
def update_student(student_id):
    """Update student details"""
    data = request.json
    success = Student.update_student(student_id, **data)
    return jsonify({"message": "Student updated successfully!"} if success else {"error": "Failed to update student"})

@students_bp.route("/students/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):
    """Delete a student"""
    success = Student.delete_student(student_id)
    return jsonify({"message": "Student deleted successfully!"} if success else {"error": "Failed to delete student"})
