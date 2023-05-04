import axios from "axios";
const API_URL = "https://mern-project-api-five.vercel.app/api/user";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

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
