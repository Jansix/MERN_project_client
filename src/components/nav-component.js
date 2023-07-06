import React from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../services/auth.service';

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout(); //登出並清空存於使用者端的帳密Cookie
    window.alert('登出成功，將導向首頁');
    setCurrentUser(null);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light  " style={{ backgroundColor: '#e3f2fd' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          學習系統
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                首頁
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
            {currentUser && currentUser.user.role == 'instructor' && (
              <li className="nav-item">
                <Link className="nav-link" to="/postCourse">
                  新增課程
                </Link>
              </li>
            )}
            {currentUser && currentUser.user.role == 'student' && (
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
