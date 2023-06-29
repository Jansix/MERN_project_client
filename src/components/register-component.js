import React, { useState, useEffect } from 'react'; //useState Hook用來改變狀態
import { useNavigate } from 'react-router-dom'; //useNavigate Hook用來重新導向
import AuthService from '../services/auth.service';

const RegisterComponent = () => {
  const navigate = useNavigate();
  //React 中的useState用法主要是用來處理狀態變更
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [role, setRole] = useState('');
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

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRole = (e) => {
    setRole(e.target.value);
  };

  //信箱驗證邏輯
  const isValidEmail = (value) => {
    // 使用正則表達式進行電子郵件驗證
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleRegister = () => {
    if (!isValidEmail(email)) {
      setMessage('請輸入正確電子郵件格式');
      return;
    } else {
      AuthService.register(username, email, password, role)
        .then(() => {
          alert('註冊成功。您現在將被導向到登入頁面');
          navigate('/login');
        })
        .catch((e) => {
          setMessage(e.response.data);
          // 錯誤訊息也用useState處理
        });
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <p>你已登入會員無須重複註冊</p>
      ) : (
        <div style={{ padding: '3rem' }} className="col-md-12">
          <div>
            {message && <div className="alert alert-danger">{message}</div>}
            {/* 若message為真(也就是有錯誤)，就顯示後面的message訊息 */}
            <div>
              <label htmlFor="username">用戶名稱:</label>
              <input onChange={handleUsername} type="text" className="form-control" name="username" />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="email">電子信箱：</label>
              <input onChange={handleEmail} type="email" className="form-control" name="email" />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="password">密碼：</label>
              <input onChange={handlePassword} type="password" className="form-control" name="password" placeholder="長度至少超過6個英文或數字" />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="role">身份：</label>
              <select name="role" id="role" className="form-control" onChange={handleRole} value={role} required>
                <option value="" disabled>
                  請選擇身分
                </option>
                <option value="student">student</option>
                <option value="instructor">instructor</option>
              </select>
            </div>
            <br />

            <br />
            <button onClick={handleRegister} className="btn btn-primary">
              <span>註冊會員</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterComponent;
