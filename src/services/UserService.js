import { jwtDecode } from "jwt-decode";

class UserService {
  static getToken() {
    return localStorage.getItem("token");
  }

  static hasPermission(permission) {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      const permissions = decodedToken.permissions || [];
      return permissions.includes(permission);
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  }

  static hasRole(role) {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role || "";
      return userRole === role;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  }
}

export default UserService;
