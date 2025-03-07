# middleware/auth.py - API Key Authentication Middleware
from flask import request, jsonify
import os

def api_key_required(f):
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get("API-Key")
        if not api_key or api_key != os.getenv("API_KEY"):
            return jsonify({"error": "Unauthorized access"}), 401
        return f(*args, **kwargs)
    return decorated_function