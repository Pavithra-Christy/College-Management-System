from db import get_connection

class Department:
    """Handles Department-related operations"""

    @staticmethod
    def get_all_departments():
        """Fetch all departments"""
        conn = get_connection()
        if not conn:
            return []
        
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM Departments")
            departments = cursor.fetchall()
            return departments
        except Exception as e:
            print(f"❌ Error fetching departments: {e}")
            return []
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_department_by_id(department_id):
        """Fetch a single department by ID"""
        conn = get_connection()
        if not conn:
            return None
        
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM Departments WHERE DepartmentID = %s", (department_id,))
            department = cursor.fetchone()
            return department
        except Exception as e:
            print(f"❌ Error fetching department by ID: {e}")
            return None
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def add_department(department_id, department_name, hod):
        """Add a new department"""
        conn = get_connection()
        if not conn:
            return False

        try:
            cursor = conn.cursor()
            query = """
                INSERT INTO Departments (DepartmentID, DepartmentName, HOD) 
                VALUES (%s, %s, %s)
            """
            cursor.execute(query, (department_id, department_name, hod))
            conn.commit()
            return True
        except Exception as e:
            print(f"❌ Error adding department: {e}")
            return False
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def update_department(department_id, department_name=None, hod=None):
        """Update department details"""
        conn = get_connection()
        if not conn:
            return False

        try:
            updates = []
            values = []

            if department_name:
                updates.append("DepartmentName = %s")
                values.append(department_name)
            if hod:
                updates.append("HOD = %s")
                values.append(hod)

            if not updates:
                print("❌ No updates provided!")
                return False

            values.append(department_id)
            query = f"UPDATE Departments SET {', '.join(updates)} WHERE DepartmentID = %s"

            cursor = conn.cursor()
            cursor.execute(query, tuple(values))
            conn.commit()
            return True
        except Exception as e:
            print(f"❌ Error updating department: {e}")
            return False
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def delete_department(department_id):
        """Delete a department"""
        conn = get_connection()
        if not conn:
            return False

        try:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM Departments WHERE DepartmentID = %s", (department_id,))
            conn.commit()
            return True
        except Exception as e:
            print(f"❌ Error deleting department: {e}")
            return False
        finally:
            cursor.close()
            conn.close()
