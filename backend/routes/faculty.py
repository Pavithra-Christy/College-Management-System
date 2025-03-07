from flask import Blueprint, request, jsonify
from models.faculty import Faculty

faculty_bp = Blueprint("faculty", __name__)

@faculty_bp.route("/faculty", methods=["GET"])
def get_faculty():
    """Fetch all faculty members"""
    try:
        faculty = Faculty.get_all_faculty()
        return jsonify(faculty), 200
    except Exception as e:
        return jsonify({"error": f"Failed to fetch faculty members: {str(e)}"}), 500

@faculty_bp.route("/faculty/<int:faculty_id>", methods=["GET"])
def get_faculty_member(faculty_id):
    """Fetch a single faculty member by ID"""
    try:
        faculty = Faculty.get_faculty_by_id(faculty_id)
        if faculty:
            return jsonify(faculty), 200
        return jsonify({"error": "Faculty member not found"}), 404
    except Exception as e:
        return jsonify({"error": f"Failed to fetch faculty member: {str(e)}"}), 500

@faculty_bp.route("/faculty", methods=["POST"])
def add_faculty():
    """Add a new faculty member"""
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Missing request data"}), 400

        required_fields = ["Name", "DepartmentID", "Email", "Phone", "Salary"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": f"Missing required fields: {required_fields}"}), 400

        success = Faculty.add_faculty(**data)
        if success:
            return jsonify({"message": "Faculty member added successfully!"}), 201
        return jsonify({"error": "Failed to add faculty"}), 500

    except Exception as e:
        return jsonify({"error": f"Failed to add faculty: {str(e)}"}), 500

@faculty_bp.route("/faculty/<int:faculty_id>", methods=["PUT"])
def update_faculty(faculty_id):
    """Update faculty details"""
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Missing request data"}), 400

        success = Faculty.update_faculty(faculty_id, **data)
        if success:
            return jsonify({"message": "Faculty updated successfully!"}), 200
        return jsonify({"error": "Failed to update faculty"}), 500

    except Exception as e:
        return jsonify({"error": f"Failed to update faculty: {str(e)}"}), 500

@faculty_bp.route("/faculty/<int:faculty_id>", methods=["DELETE"])
def delete_faculty(faculty_id):
    """Delete a faculty member"""
    try:
        success = Faculty.delete_faculty(faculty_id)
        if success:
            return jsonify({"message": "Faculty deleted successfully!"}), 200
        return jsonify({"error": "Failed to delete faculty"}), 500
    except Exception as e:
        return jsonify({"error": f"Failed to delete faculty: {str(e)}"}), 500
