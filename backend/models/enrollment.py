from db import get_connection

class Enrollment:
    """Handles course enrollment operations"""

    @staticmethod
    def enroll_student(enrollment_id, student_id, course_id, semester, year, grade=None):
        """Enrolls a student in a course"""
        conn = get_connection()
        if not conn:
            return False
        
        try:
            cursor = conn.cursor()
            query = """
                INSERT INTO Enrollment (EnrollmentID, StudentID, CourseID, Semester, Year, Grade) 
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (enrollment_id, student_id, course_id, semester, year, grade))
            conn.commit()
            return True
        except Exception as e:
            print(f"❌ Error enrolling student: {e}")
            return False
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_all_enrollments():
        """Fetch all enrollments"""
        conn = get_connection()
        if not conn:
            return []
        
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM Enrollment")
            enrollments = cursor.fetchall()
            return enrollments
        except Exception as e:
            print(f"❌ Error fetching enrollments: {e}")
            return []
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_enrollment_by_id(enrollment_id):
        """Fetch a single enrollment by ID"""
        conn = get_connection()
        if not conn:
            return None
        
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM Enrollment WHERE EnrollmentID = %s", (enrollment_id,))
            enrollment = cursor.fetchone()
            return enrollment
        except Exception as e:
            print(f"❌ Error fetching enrollment by ID: {e}")
            return None
        finally:
            cursor.close()
            conn.close()