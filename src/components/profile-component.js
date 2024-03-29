import { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  //currentUser初始狀態為null 透過useState變更狀態
  // let [currentUser, setCurrentUser] = useState(null);  這段要共用到nav頁所以上移到app.js

  return (
    <div style={{ padding: '3rem' }}>
      {/* 若currentUser為假顯示需登入 */}
      {!currentUser && <div>在獲取您的個人資料之前，您必須先登錄。</div>}
      {/* 若 currentUser為真執行後面內容 */}
      {currentUser && (
        <div>
          <h2>以下是您的個人檔案：</h2>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>姓名：{currentUser.user.username}</strong>
                </td>
              </tr>

              <tr>
                <td>
                  <strong>您註冊的電子信箱: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>身份: {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
