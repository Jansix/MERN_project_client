import axios from "axios";
const API_URL = "https://mern-project-api-five.vercel.app/api/user/";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
    //定義一個函式 用parse解析出用戶餅乾內的user資料
  }
}

export default new AuthService();
