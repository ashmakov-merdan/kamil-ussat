import axios from "axios";
import Cookies from "js-cookie"

const api = axios.create({
  baseURL: "https://kamilussat.com.tm/api/v2"
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       Cookies.remove('token');

//       return Promise.reject(error);
//     };

//     return Promise.reject(error);
//   }
// );

export default api;