from flask import Blueprint, request, jsonify
from models.results import Result

results_bp = Blueprint("results", __name__)

@results_bp.route("/results", methods=["GET"])
def get_results():
    """Fetch all results"""
    results = Result.get_all_results()
    return jsonify(results)

@results_bp.route("/results", methods=["POST"])
def add_result():
    """Add a new result"""
    data = request.json
    success = Result.add_result(**data)
    return jsonify({"message": "Result added successfully!"} if success else {"error": "Failed to add result"})
