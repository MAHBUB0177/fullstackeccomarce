import { getAuthData } from "@/lib";
import axios from "axios";
import moment from "moment";
// import { getAuthData } from "./authUtils"; // Adjust the path as necessary

export interface AuthDataType {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiration: string;
  tokenExpiration: string;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
});

axiosInstance.interceptors.request.use(async (config) => {
  const authData = getAuthData();
  console.log(authData, 'authData===========interceptors');

  if (authData) {
    config.headers.Authorization = `Bearer ${authData.accessToken}`;
  }
  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log(error?.response?.status, '+++++++++status');
//     const originalRequest = error.config;

//     if (error?.response?.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const authData = getAuthData();
//       let sendobj = {
//         refreshToken: authData?.refreshToken,
//       };

//       try {
//         if (authData?.refreshTokenExpiration !== undefined) {
//           const refreshTokenExpiration = new Date(authData.refreshTokenExpiration);
//           const now = new Date();
//           console.log(authData, 'authData++++++++++++');
//           console.log(now < refreshTokenExpiration, '++++++time check');

//           if (now < refreshTokenExpiration) {
//             console.log('we are called');
//             const handleLogout = () => {
//               localStorage.clear();
//               sessionStorage.clear();
//               window.location.href = "/";
//             };
//             handleLogout();
//           } else {
//             const refreshTokenResponse = await axios.post('http://localhost:500/api/user/refreshToken', sendobj);
//             const newAccessToken = refreshTokenResponse?.data?.data;
//             console.log(newAccessToken, '++++newAccessToken');
//             if (newAccessToken) {
//               localStorage.setItem('authdata', JSON.stringify(newAccessToken));
//               originalRequest.headers["Authorization"] = "Bearer " + newAccessToken?.accessToken;
//               return axiosInstance(originalRequest);
//             }
//           }
//         }
//       } catch (refreshError) {
//         console.error("Error refreshing token:", refreshError);
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
