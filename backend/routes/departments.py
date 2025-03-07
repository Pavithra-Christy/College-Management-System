from flask import Blueprint, request, jsonify
from models.departments import Department

departments_bp = Blueprint("departments", __name__)

@departments_bp.route("/departments", methods=["GET"])
def get_departments():
    """Fetch all departments"""
    departments = Department.get_all_departments()
    return jsonify(departments), 200

@departments_bp.route("/departments/<int:department_id>", methods=["GET"])
def get_department(department_id):
    """Fetch a single department by ID"""
    department = Department.get_department_by_id(department_id)
    if department:
        return jsonify(department), 200
    return jsonify({"error": "Department not found"}), 404

@departments_bp.route("/departments", methods=["POST"])
def add_department():
    """Add a new department"""
    data = request.json
    if not data.get("department_id") or not data.get("department_name") or not data.get("hod"):
        return jsonify({"error": "Missing required fields"}), 400
    
    success = Department.add_department(data["department_id"], data["department_name"], data["hod"])
    return jsonify({"message": "Department added successfully!"} if success else {"error": "Failed to add department"}), 201 if success else 500

@departments_bp.route("/departments/<int:department_id>", methods=["PUT"])
def update_department(department_id):
    """Update department details"""
    data = request.json
    success = Department.update_department(department_id, data.get("department_name"), data.get("hod"))
    return jsonify({"message": "Department updated successfully!"} if success else {"error": "Failed to update department"}), 200 if success else 500

@departments_bp.route("/departments/<int:department_id>", methods=["DELETE"])
def delete_department(department_id):
    """Delete a department"""
    success = Department.delete_department(department_id)
    return jsonify({"message": "Department deleted successfully!"} if success else {"error": "Failed to delete department"}), 200 if success else 500
