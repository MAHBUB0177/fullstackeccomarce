import axiosInstance from ".";


export const s3URL =
  "https://fstuploaddocument.s3.ap-southeast-1.amazonaws.com/";

export const RegisterUser = (payload:any) => {
  let url = `http://localhost:500/api/user/register`;
  return axiosInstance.post(url,payload);
};

export const LoginUser = (payload:any) => {
    let url = `http://localhost:500/api/user/login`;
    return axiosInstance.post(url,payload);
  };