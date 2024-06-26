import axiosInstance from ".";


export const s3URL =
  "https://fstuploaddocument.s3.ap-southeast-1.amazonaws.com/";

export const RegisterUser = (payload:any) => {
  let url = `api/user/register`;
  return axiosInstance.post(url,payload);
};

export const LoginUser = (payload:any) => {
    let url = `api/user/login`;
    return axiosInstance.post(url,payload);
  };


  export const GetCurrentuserInfo = () => {
    let url = `api/user/currenuserinfo`;
    return axiosInstance.get(url);
  };

  // export const GetProductInfo = (currentPageNumber: number, pageSize: number) => {
  //   let url = `/api/items/getproducts`;
  //   return axiosInstance.get(url);
  // };
  export const GetProductInfo = (currentPageNumber: number, pageSize: number) => {
    const url = `/api/items/getproducts?page=${currentPageNumber}&limit=${pageSize}`;
    return axiosInstance.get(url);
};