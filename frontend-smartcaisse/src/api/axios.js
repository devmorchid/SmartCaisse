import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8000/api", // عدّلها حسب Laravel API عندك
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
