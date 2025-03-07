// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api"; // Ensure it matches Flask backend

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Generic API functions for all entities
export const getData = async (endpoint) => {
  const response = await api.get(`/${endpoint}`);
  return response.data;
};

export const addData = async (endpoint, data) => {
  const response = await api.post(`/${endpoint}`, data);
  return response.data;
};

export const updateData = async (endpoint, id, data) => {
  const response = await api.put(`/${endpoint}/${id}`, data);
  return response.data;
};

export const deleteData = async (endpoint, id) => {
  const response = await api.delete(`/${endpoint}/${id}`);
  return response.data;
};

// ✅ Entity-Specific API Calls (Using Generic Functions)
export const getStudents = () => getData("students");
export const addStudent = (studentData) => addData("students", studentData);
export const updateStudent = (studentId, studentData) => updateData("students", studentId, studentData);
export const deleteStudent = (studentId) => deleteData("students", studentId);

export const getCourses = () => getData("courses");
export const addCourse = (courseData) => addData("courses", courseData);
export const updateCourse = (courseId, courseData) => updateData("courses", courseId, courseData);
export const deleteCourse = (courseId) => deleteData("courses", courseId);

export const getFaculty = () => getData("faculty");
export const addFaculty = (facultyData) => addData("faculty", facultyData);
export const updateFaculty = (facultyId, facultyData) => updateData("faculty", facultyId, facultyData);
export const deleteFaculty = (facultyId) => deleteData("faculty", facultyId);

export const getDepartments = () => getData("departments");
export const addDepartment = (departmentData) => addData("departments", departmentData);
export const updateDepartment = (departmentId, departmentData) => updateData("departments", departmentId, departmentData);
export const deleteDepartment = (departmentId) => deleteData("departments", departmentId);

export const getEnrollments = () => getData("enrollment");
export const enrollStudent = (enrollmentData) => addData("enrollment", enrollmentData);
export const removeEnrollment = (enrollmentId) => deleteData("enrollment", enrollmentId);

export const getExams = () => getData("exams");
export const scheduleExam = (examData) => addData("exams", examData);
export const deleteExam = (examId) => deleteData("exams", examId);

export const getResults = () => getData("results");
export const addResult = (resultData) => addData("results", resultData);
export const deleteResult = (resultId) => deleteData("results", resultId);

export default api;
