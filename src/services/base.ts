import axios from 'axios';

import {store} from '~redux/store';
import {setLogout} from '~redux/reducer/authRtk';

class RequestApi {
  // constructor() {
  //     this.Request = this.Request.bind(this);
  // }

  static Request() {
    // axios.interceptors.request.use(function (config) {
    //     const token = localStorage.getItem('token')
    //     config.headers.Authorization = token;

    //     return config;
    // });
    // let token = await AsyncStorage.getItem('token');
    const token = store.getState().auth.accessToken;

    let instance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    instance.interceptors.response.use(
      response => response,
      async error => {
        // const originalRequest = error.config;
        if (error.response.status === 307 || error.response.status === 403) {
          console.log(error.response);
          store.dispatch(setLogout());
        }

        return Promise.reject(error);
      },
    );

    return instance;
  }

  static getToken() {}
}

export default RequestApi.Request();
