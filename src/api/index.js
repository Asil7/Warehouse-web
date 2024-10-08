import axios from "axios";
import UserService from "../services/UserService";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Set your base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to clear empty fields from request payload
const clearEmptyFields = (config) => {
  if (config.data) {
    Object.keys(config.data).forEach((key) => {
      if (config.data[key] === null || config.data[key] === "") {
        delete config.data[key];
      }
    });
  }
};

api.interceptors.request.use(
  (config) => {
    const token = UserService.getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    clearEmptyFields(config);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors here, if needed
    return Promise.reject(error);
  }
);

export default api;
