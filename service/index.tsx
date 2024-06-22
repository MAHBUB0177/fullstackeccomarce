import axios from "axios";
import moment from "moment";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
});

axiosInstance.interceptors.request.use(async (config) => {
  let authData;
  if (typeof window !== 'undefined') {
    const storedAuthData = localStorage.getItem('authdata');
    if (storedAuthData) {
      authData = JSON.parse(storedAuthData);
    }
  }
  if (authData) {
    config.headers.Authorization = `Bearer ${authData?.accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error?.response?.status, '+++++++++status')
    const originalRequest = error.config;

    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      let authData;
      if (typeof window !== 'undefined') {
        const storedAuthData = localStorage.getItem('authdata');
        if (storedAuthData) {
          authData = JSON.parse(storedAuthData);
        }
      }
      let sendobj = {
        refreshToken: authData?.refreshToken
      }

      try {
        if (authData?.refreshTokenExpiration !== undefined) {
          // Check if the refresh token has expired
          const refreshTokenExpiration = moment(authData.refreshTokenExpiration);
          const now = moment();
        console.log(refreshTokenExpiration.isBefore(now),'++++++time check')
          if (refreshTokenExpiration.isBefore(now)) {
            console.log('we are called')
            const handleLogout = () => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.href = "/";
            };
            handleLogout();
          } else {
            const refreshTokenResponse = await axios.post('http://localhost:500/api/user/refreshToken', sendobj);
            const newAccessToken = refreshTokenResponse?.data?.data;
            console.log(newAccessToken, '++++newAccessToken')
            if (newAccessToken) {
              localStorage.setItem('authdata', JSON.stringify(newAccessToken));
              originalRequest.headers["Authorization"] = "Bearer " + newAccessToken?.accessToken;
              return axiosInstance(originalRequest);
            }
          }
        }

      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
