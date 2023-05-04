import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/Course.service";

const CourseComponents = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handelTakeToLogin = () => {
    navigate("/login");
  };

  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        CourseService.get(_id)
          .then((data) => {
            setCourseData(data.data.findCourse);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "student") {
        CourseService.getEnrolledCourses(_id)
          .then((data) => {
            // console.log(data);
            setCourseData(data.data.findCourse);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>你必須先登入</p>

          <button
            className="btn btn-primary btn-lg"
            onClick={handelTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>歡迎來到講師頁面</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>歡迎來到學生頁面</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => {
            return (
              <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">課程名稱: {course.title}</h5>
                  <p
                    style={{ margin: "0.5rem 0rem" }}
                    className="card-text"
                  ></p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數: {course.student.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格: {course.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponents;
