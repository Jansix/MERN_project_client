import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 檢查 localStorage 中的資料來判斷使用者是否已登入
    const token = localStorage.getItem('user');

    if (token) {
      // 使用者已登入
      setIsLoggedIn(true);
    } else {
      // 使用者未登入
      setIsLoggedIn(false);
    }
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem('user', JSON.stringify(response.data)); //將Cookie存入使用者瀏覽器

      window.alert('登入成功，您正在被導向個人資料頁面');
      //將重新執行AuthService.getCurrentUser函式取得最新客戶資料內的值並放入currentUser
      setCurrentUser(AuthService.getCurrentUser());
      navigate('/profile');
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  const handleKeyDown = (event) => {
    //設定案Enter同樣可以按下按鈕，
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <h1>你已登入無須重複登入</h1>
      ) : (
        <div style={{ padding: '3rem' }} className="col-md-12">
          <div>{message && <div className="alert alert-danger">{message}</div>}</div>
          <div>
            <div className="form-group">
              <label htmlFor="username">電子信箱：</label>
              <input onChange={handleEmail} type="email" className="form-control" name="email" />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="password">密碼：</label>
              <input
                onKeyDown={handleKeyDown} //設定鍵盤事件
                onChange={handlePassword}
                type="password"
                className="form-control"
                name="password"
              />
            </div>
            <br />
            <div className="form-group">
              <button onClick={handleLogin} className="btn btn-primary btn-block">
                <span>登入系統</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginComponent;
