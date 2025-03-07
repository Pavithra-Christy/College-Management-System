from flask import Blueprint, request, jsonify
from models.enrollment import Enrollment

enrollment_bp = Blueprint("enrollment", __name__)

@enrollment_bp.route("/enrollment", methods=["GET"])
def get_enrollments():
    """Fetch all enrollments"""
    try:
        enrollments = Enrollment.get_all_enrollments()
        return jsonify(enrollments), 200
    except Exception as e:
        return jsonify({"error": f"Failed to fetch enrollments: {str(e)}"}), 500

@enrollment_bp.route("/enrollment/<int:enrollment_id>", methods=["GET"])
def get_enrollment(enrollment_id):
    """Fetch a single enrollment by ID"""
    try:
        enrollment = Enrollment.get_enrollment_by_id(enrollment_id)
        if enrollment:
            return jsonify(enrollment), 200
        return jsonify({"error": "Enrollment not found"}), 404
    except Exception as e:
        return jsonify({"error": f"Failed to fetch enrollment: {str(e)}"}), 500

@enrollment_bp.route("/enrollment", methods=["POST"])
def enroll_student():
    """Enroll a student in a course"""
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Missing request data"}), 400

        required_fields = ["StudentID", "CourseID", "Semester", "Year"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": f"Missing required fields: {required_fields}"}), 400

        success = Enrollment.enroll_student(**data)
        if success:
            return jsonify({"message": "Student enrolled successfully!"}), 201
        return jsonify({"error": "Failed to enroll student"}), 500

    except Exception as e:
        return jsonify({"error": f"Failed to enroll student: {str(e)}"}), 500

@enrollment_bp.route("/enrollment/<int:enrollment_id>", methods=["PUT"])
def update_enrollment(enrollment_id):
    """Update an existing enrollment"""
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Missing request data"}), 400

        success = Enrollment.update_enrollment(enrollment_id, **data)
        if success:
            return jsonify({"message": "Enrollment updated successfully!"}), 200
        return jsonify({"error": "Failed to update enrollment"}), 500

    except Exception as e:
        return jsonify({"error": f"Failed to update enrollment: {str(e)}"}), 500

@enrollment_bp.route("/enrollment/<int:enrollment_id>", methods=["DELETE"])
def delete_enrollment(enrollment_id):
    """Delete an enrollment"""
    try:
        success = Enrollment.delete_enrollment(enrollment_id)
        if success:
            return jsonify({"message": "Enrollment deleted successfully!"}), 200
        return jsonify({"error": "Failed to delete enrollment"}), 500
    except Exception as e:
        return jsonify({"error": f"Failed to delete enrollment: {str(e)}"}), 500
