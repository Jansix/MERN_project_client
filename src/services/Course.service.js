import axios from 'axios';
const API_URL = 'https://mern-project-api-five.vercel.app/api/course';

class CourseService {
  post(title, description, price) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }
    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  //使用學生id找到學生註冊的課程
  getEnrolledCourses(_id) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }
    return axios.get(API_URL + '/student/' + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  //使用instructor的id來找到講師擁有的課程
  get(_id) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }
    return axios.get(API_URL + '/instructor/' + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
  //用課程名稱找課程
  getCourseByName(name) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }

    return axios.get(API_URL + '/findByName/' + name, {
      headers: {
        Authorization: token,
      },
    });
  }

  //取得所有課程資料
  getAllCourse() {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }
    return axios.get(API_URL, {
      headers: {
        Authorization: token,
      },
    });
  }

  //註冊課程
  enroll(_id) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }

    return axios.post(
      API_URL + '/enroll/' + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //用課程id刪除課程
  delete(_id) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else {
      token = '';
    }
    return axios.delete(API_URL + '/' + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new CourseService();
