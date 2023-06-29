import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService from '../services/Course.service';

const EnrollComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState('');
  let [searchResult, setSearchResult] = useState(null);
  let [allCourse, setAllCourse] = useState([]);

  //取得所有課程
  useEffect(() => {
    if (searchInput === '') {
      CourseService.getAllCourse()
        .then((res) => {
          const allData = res.data;
          setAllCourse(allData);
          setSearchResult(null);
          console.log('這是allCourse', allCourse);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchInput]);

  const handleTakeToLogin = () => {
    navigate('/login');
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        console.log(data.data.findCourse);
        setSearchResult(data.data.findCourse);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEnroll = (e) => {
    CourseService.enroll(e.target.id)
      .then((response) => {
        if (response.data == '你已註冊') {
          window.alert('你已註冊。重新導向到課程頁面。');
          navigate('/course');
        } else {
          window.alert('課程註冊成功。重新導向到課程頁面。');
          navigate('/course');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ padding: '3rem' }}>
      {!currentUser && (
        <div>
          <p>你必須先登入會員才能使用此功能</p>
          <button className="btn btn-primary btn-lg" onClick={handleTakeToLogin}>
            點我前往登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == 'instructor' && (
        <div>
          <h1>只有學生才能註冊課程</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == 'student' && (
        <div className="search input-group mb-5">
          <input onChange={handleChangeInput} type="text" className="form-control" />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length !== 0 && (
        <div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {searchResult.map((course) => (
              <div key={course._id} className="col mb-4">
                <div className="card card h-100">
                  <div className="card-body">
                    <h5 className="card-title">課程名稱：{course.title}</h5>
                    <p className="card-text"></p>
                    <p>價格: {course.price}</p>
                    <p>目前的學生人數: {course.student.length}</p>
                    <a href="#" onClick={handleEnroll} className="card-text btn btn-primary" id={course._id}>
                      註冊課程
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentUser && (!searchResult || searchResult.length === 0) && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {allCourse.map((item) => (
            <div key={item._id} className="col mb-4">
              <div className="card h-100">
                <div className="card-body ">
                  <h5 className="card-title">課程名稱：{item.title}</h5>
                  <p className="card-text"></p>
                  <p>價格: {item.price}</p>
                  <p>目前的學生人數: {item.student.length}</p>
                  <a href="#" onClick={handleEnroll} className="card-text btn btn-primary" id={item._id}>
                    註冊課程
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
