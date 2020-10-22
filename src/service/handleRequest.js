import { apiUrl } from "../environments/environments";
import axios from "axios";


// Student
export const listStudents = () =>
  axios({
    method: "get",
    url: apiUrl + "sinh_vien",
  });

export const getStudent = (id) =>
  axios({
    method: "get",
    url: apiUrl + "sinh_vien/" + id,
  });

export const editStudent = (id, data) =>
  axios({
    method: "put",
    url: apiUrl + "sinh_vien/" + id,
    data: data,
  });

export const addStudent = (data) =>
  axios({
    method: "post",
    url: apiUrl + "sinh_vien",
    data: data,
  });

export const deleteStudent = (id) =>
  axios({
    method: "delete",
    url: apiUrl + "sinh_vien/" + id,
  });


// Course
export const listCourses = () =>
  axios({
    method: "get",
    url: apiUrl + "khoa_so",
  });


// Facultys
export const listFacultys = () =>
  axios({
    method: "get",
    url: apiUrl + "khoa",
  });

export const getFaculty = (id) =>
  axios({
    method: "get",
    url: apiUrl + "khoa/"+ id,
  });


// Class
export const listClasses = (khoa) =>
  axios({
    method: "get",
    url: apiUrl + "khoa/" + khoa + "/lop",
  });
