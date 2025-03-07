from db import get_connection

class Exam:
    """Handles exam-related database operations"""

    @staticmethod
    def schedule_exam(exam_id, course_id, exam_date, total_marks, passing_marks):
        """Schedules a new exam"""
        conn = get_connection()
        if not conn:
            return False
        
        try:
            cursor = conn.cursor()
            query = """
                INSERT INTO Exams (ExamID, CourseID, ExamDate, TotalMarks, PassingMarks) 
                VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(query, (exam_id, course_id, exam_date, total_marks, passing_marks))
            conn.commit()
            return True
        except Exception as e:
            print(f"❌ Error scheduling exam: {e}")
            return False
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_all_exams():
        """Fetch all exams"""
        conn = get_connection()
        if not conn:
            return []
        
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM Exams")
            exams = cursor.fetchall()
            return exams
        except Exception as e:
            print(f"❌ Error fetching exams: {e}")
            return []
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_exam_by_id(exam_id):
        """Fetch a single exam by ID"""
        conn = get_connection()
        if not conn:
            return None
        
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM Exams WHERE ExamID = %s", (exam_id,))
            exam = cursor.fetchone()
            return exam
        except Exception as e:
            print(f"❌ Error fetching exam by ID: {e}")
            return None
        finally:
            cursor.close()
            conn.close()