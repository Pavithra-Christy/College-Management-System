from db import get_connection

class Student:
    """Handles student-related database operations"""

    @staticmethod
    def add_student(student_id, name, dob, gender, email, phone, address, dept_id):
        """Inserts a new student into the database"""
        conn = get_connection()
        if not conn:
            return False

        try:
            cursor = conn.cursor()
            query = """
                INSERT INTO Students (StudentID, Name, DOB, Gender, Email, Phone, Address, DepartmentID) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (student_id, name, dob, gender, email, phone, address, dept_id))
            conn.commit()
            return True
        except Exception as e:
            print(f"❌ Error adding student: {e}")
            return False
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_all_students():
        """Fetches all students from the database"""
        conn = get_connection()
        if not conn:
            return []

        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM Students")
            students = cursor.fetchall()
            return students
        except Exception as e:
            print(f"❌ Error fetching students: {e}")
            return []
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_student_by_id(student_id):
        """Fetch a student by ID."""
        connection = get_connection()
        if not connection:
            return None

        try:
            cursor = connection.cursor(dictionary=True)
            query = "SELECT * FROM Students WHERE StudentID = %s"
            cursor.execute(query, (student_id,))
            student = cursor.fetchone()
            return student
        except Exception as e:
            print(f"❌ Error fetching student: {e}")
            return None
        finally:
            cursor.close()
            connection.close()
