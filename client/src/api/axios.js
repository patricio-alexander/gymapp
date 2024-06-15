import axios from "axios";

// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default instance;
