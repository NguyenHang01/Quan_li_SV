import { apiUrl } from "../environments/environments";
import axios from "axios";

export const listStudents = () =>
  axios({
    method: "get",
    url: apiUrl + "sinh_vien",
  });

export const deleteStudent = (id) =>
  axios({
    method: "delete",
    url: apiUrl + "sinh_vien/"+id,
  });

export const listCourses = () =>
  axios({
    method: "get",
    url: apiUrl + "khoa_so",
  });

export const listFacultys = () =>
  axios({
    method: "get",
    url: apiUrl + "khoa",
  });

export const listClasses = (khoa) =>
  axios({
    method: "get",
    url: apiUrl + "khoa/" + khoa + "/lop",
  });
