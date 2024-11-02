import axios from "axios";
import UserService from "../services/UserService";

const api = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://192.168.1.62:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

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
    return Promise.reject(error);
  }
);

export default api;
