from db import get_connection

class Course:
    """Handles course-related database operations"""

    @staticmethod
    def add_course(course_id, name, credits, dept_id):
        """Inserts a new course into the database"""
        conn = get_connection()
        if not conn:
            return False

        try:
            cursor = conn.cursor()
            query = """
                INSERT INTO Courses (CourseID, Name, Credits, DepartmentID) 
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, (course_id, name, credits, dept_id))
            conn.commit()
            return True
        except Exception as e:
            print(f"❌ Error adding course: {e}")
            return False
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_all_courses():
        """Fetches all courses from the database"""
        conn = get_connection()
        if not conn:
            return []

        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM Courses")
            courses = cursor.fetchall()
            return courses
        except Exception as e:
            print(f"❌ Error fetching courses: {e}")
            return []
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_course_by_id(course_id):
        """Fetch a single course by ID"""
        conn = get_connection()
        if not conn:
            return None
        
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM Courses WHERE CourseID = %s", (course_id,))
            course = cursor.fetchone()
            return course
        except Exception as e:
            print(f"❌ Error fetching course by ID: {e}")
            return None
        finally:
            cursor.close()
            conn.close()