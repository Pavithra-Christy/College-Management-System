from db import get_connection

class Result:
    """Handles result-related database operations"""

    @staticmethod
    def add_result(result_id, student_id, exam_id, obtained_marks, grade):
        """Adds a new result entry"""
        conn = get_connection()
        if not conn:
            return False
        
        try:
            cursor = conn.cursor()
            query = """
                INSERT INTO Results (ResultID, StudentID, ExamID, ObtainedMarks, Grade) 
                VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(query, (result_id, student_id, exam_id, obtained_marks, grade))
            conn.commit()
            return True
        except Exception as e:
            print(f"❌ Error adding result: {e}")
            return False
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_all_results():
        """Fetches all results from the database"""
        conn = get_connection()
        if not conn:
            return []

        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM Results")
            results = cursor.fetchall()
            return results
        except Exception as e:
            print(f"❌ Error fetching results: {e}")
            return []
        finally:
            cursor.close()
            conn.close()
