import React from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout(); //清空存於使用者端的帳密Cookie
    window.alert("登出成功，將導向首頁");
    setCurrentUser(null);
  };

  return (
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          學習系統
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                首頁
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/test">
                測試
              </Link>
            </li>
            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  註冊會員
                </Link>
              </li>
            )}
            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  會員登入
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link onClick={handleLogout} className="nav-link" to="/">
                  登出
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  個人頁面
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/course">
                  課程頁面
                </Link>
              </li>
            )}
            {currentUser && currentUser.user.role == "instructor" && (
              <li className="nav-item">
                <Link className="nav-link" to="/postCourse">
                  新增課程
                </Link>
              </li>
            )}
            {currentUser && currentUser.user.role == "student" && (
              <li className="nav-item">
                <Link className="nav-link" to="/enroll">
                  註冊課程
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
