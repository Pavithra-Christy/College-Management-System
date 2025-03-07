from db import get_connection

class Faculty:
    """Handles faculty-related database operations"""

    @staticmethod
    def add_faculty(faculty_id, name, email, phone, dept_id, salary):
        """Inserts a new faculty member into the database"""
        conn = get_connection()
        if not conn:
            return False

        try:
            cursor = conn.cursor()
            query = """
                INSERT INTO Faculty (FacultyID, Name, Email, Phone, DepartmentID, Salary) 
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (faculty_id, name, email, phone, dept_id, salary))
            conn.commit()
            return True
        except Exception as e:
            print(f"❌ Error adding faculty: {e}")
            return False
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_all_faculty():
        """Fetch all faculty members"""
        conn = get_connection()
        if not conn:
            return []
        
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM Faculty")
            faculty = cursor.fetchall()
            return faculty
        except Exception as e:
            print(f"❌ Error fetching faculty: {e}")
            return []
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_faculty_by_id(faculty_id):
        """Fetch a single faculty member by ID"""
        conn = get_connection()
        if not conn:
            return None
        
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM Faculty WHERE FacultyID = %s", (faculty_id,))
            faculty = cursor.fetchone()
            return faculty
        except Exception as e:
            print(f"❌ Error fetching faculty by ID: {e}")
            return None
        finally:
            cursor.close()
            conn.close()