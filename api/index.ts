import axios from "axios";
import Cookies from "js-cookie";

export const BASE_URL = process.env.API_URL;

const api = axios.create({
  baseURL: `${BASE_URL}/api/v2`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
   (response) => response,
   async (error) => {
     const originalRequest = error.config;

     if (error.response?.status === 401 && !originalRequest._retry) {
       originalRequest._retry = true;

       try {
         const refreshToken = Cookies.get("refresh_token");

         if (!refreshToken) {
           Cookies.remove("access_token");
           Cookies.remove("refresh_token");
           window.location.href = "/login";
           return Promise.reject(error);
         }

         const response = await axios.post(
           `${BASE_URL}/authentications/token`,
           { refresh_token: refreshToken }
         );

         const { token: { access: { token }} } = response.data.payload;

         Cookies.set("access_token", token);

         api.defaults.headers.common.Authorization = `Bearer ${token}`;
         originalRequest.headers.Authorization = `Bearer ${token}`;

         return api(originalRequest);
       } catch (refreshError) {
         Cookies.remove("access_token");
         Cookies.remove("refresh_token");
         window.location.href = "/login";
         return Promise.reject(refreshError);
       }
     }

    return Promise.reject(error);
  }
);

export default api;
