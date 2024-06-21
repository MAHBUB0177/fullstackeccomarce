import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = `${process.env.SERVER}`;
axiosInstance.interceptors.request.use(async (config) => {
    let authData
    if (typeof window !== 'undefined') {
     
        const storedAuthData = localStorage.getItem('authdata');
        if (storedAuthData) {
          authData=JSON.parse(storedAuthData)
        }
      }
  if (authData) {
    config.headers.Authorization = `Bearer ${authData?.accessToken}`;
  }
  return config;
});

export default axiosInstance;