from flask import Blueprint, request, jsonify
from models.courses import Course

courses_bp = Blueprint("courses", __name__)

@courses_bp.route("/courses", methods=["GET"])
def get_courses():
    """Fetch all courses"""
    courses = Course.get_all_courses()
    return jsonify(courses)

@courses_bp.route("/courses/<int:course_id>", methods=["GET"])
def get_course(course_id):
    """Fetch a single course by ID"""
    course = Course.get_course_by_id(course_id)
    return jsonify(course) if course else jsonify({"error": "Course not found"}), 404

@courses_bp.route("/courses", methods=["POST"])
def add_course():
    """Add a new course"""
    data = request.json
    success = Course.add_course(**data)
    return jsonify({"message": "Course added successfully!"} if success else {"error": "Failed to add course"})

@courses_bp.route("/courses/<int:course_id>", methods=["PUT"])
def update_course(course_id):
    """Update course details"""
    data = request.json
    success = Course.update_course(course_id, **data)
    return jsonify({"message": "Course updated successfully!"} if success else {"error": "Failed to update course"})

@courses_bp.route("/courses/<int:course_id>", methods=["DELETE"])
def delete_course(course_id):
    """Delete a course"""
    success = Course.delete_course(course_id)
    return jsonify({"message": "Course deleted successfully!"} if success else {"error": "Failed to delete course"})
