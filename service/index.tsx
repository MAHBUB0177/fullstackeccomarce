import { getAuthData } from "@/lib";
import { setAuth, setAuthUser } from "@/reducer/authReducer";
import axios from "axios";
import { store } from "@/store"; 
import { signOut } from "next-auth/react";




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
      const sendobj = {
        refreshToken: authData?.refreshToken,
      };

      try {
          // Attempt to refresh the token
          const refreshTokenResponse = await axios.post(
            'http://localhost:500/api/user/refreshToken',
            sendobj
          );
          const newAuthData = refreshTokenResponse?.data?.data;

          if (newAuthData?.accessToken) {
            // Save the new tokens and retry the original request
            store.dispatch(setAuth(newAuthData));
            originalRequest.headers["Authorization"] = "Bearer " + newAuthData.accessToken;
            return axiosInstance(originalRequest);
          }
        
      } catch (refreshError) {
        handelLogout(); // Log out if refresh fails
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Helper function for logging out the user
const handelLogout = () => {
  store.dispatch(setAuth({}))
  store.dispatch(setAuthUser({}))
  signOut({ callbackUrl: "/" });
}

export default axiosInstance;
