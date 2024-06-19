import axios from "axios";
import { useState } from "react";


export interface UserType {
    email: string;
    name: string;
  }
  export interface AuthDataType {
    accessToken: string;
    refreshToken: string;
    user: UserType;
  }
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = `${process.env.SERVER}`;
// const [authData, setAuthData] = useState<AuthDataType | null>();
axiosInstance.interceptors.request.use(async (config) => {
    let authData
    // console.log(authData,'authData++++++++++++')
    if (typeof window !== 'undefined') {
     
        const storedAuthData = localStorage.getItem('authdata');
        if (storedAuthData) {
        //   setAuthData(JSON.parse(storedAuthData));
          authData=JSON.parse(storedAuthData)
        }
      }
  if (authData) {
    config.headers.Authorization = `Bearer ${authData?.accessToken}`;
  }
  return config;
});

export default axiosInstance;