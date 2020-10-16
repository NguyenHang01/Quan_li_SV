import { apiUrl } from "../environments/environments";
import axios from "axios";

export const listSinhVien = () =>
  axios({
    method: "get",
    url: apiUrl + "sinh_vien",
  });
