from flask import Flask
from routes.students import students_bp
from routes.courses import courses_bp
from routes.departments import departments_bp
from routes.faculty import faculty_bp
from routes.enrollment import enrollment_bp
from routes.exams import exams_bp
from routes.results import results_bp

app = Flask(__name__)

# Register blueprints
app.register_blueprint(students_bp, url_prefix="/api")
app.register_blueprint(courses_bp, url_prefix="/api")
app.register_blueprint(faculty_bp, url_prefix="/api")
app.register_blueprint(enrollment_bp, url_prefix="/api")
app.register_blueprint(exams_bp, url_prefix="/api")
app.register_blueprint(results_bp, url_prefix="/api")
app.register_blueprint(departments_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)
