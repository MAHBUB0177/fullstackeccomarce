import { getAuthData } from "@/lib";
import { setAuth } from "@/reducer/authReducer";
import axios from "axios";
import { store } from "@/store"; 




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

  if (authData) {
    config.headers.Authorization = `Bearer ${authData.accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const authData = getAuthData();
      let sendobj = {
        refreshToken: authData?.refreshToken,
      };

      try {
        if (authData?.refreshTokenExpiration !== undefined) {
          const refreshTokenExpiration = new Date(authData.refreshTokenExpiration);
          const now = new Date();

          if (now < refreshTokenExpiration) {
            const handleLogout = () => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.href = "/";
            };
            handleLogout();
          } else {
            const refreshTokenResponse = await axios.post('http://localhost:500/api/user/refreshToken', sendobj);
            const newAccessToken = refreshTokenResponse?.data?.data;
            if (newAccessToken) {
              store.dispatch(setAuth(newAccessToken));
              originalRequest.headers["Authorization"] = "Bearer " + newAccessToken?.accessToken;
              return axiosInstance(originalRequest);
            }
          }
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
