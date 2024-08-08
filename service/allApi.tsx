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

 
  export const GetProductInfo = (currentPageNumber: number, pageSize: number) => {
    const url = `/api/items/getproducts?page=${currentPageNumber}&limit=${pageSize}`;
    http://localhost:500/api/products?name=iphone&select=company,featured
    return axiosInstance.get(url);
};


// export const GetSearchProduct = (currentPageNumber: number, pageSize: number, payload: any) => {
//   console.log(payload, '++++++++++payload');
  
//   const url = `/api/items/getproducts?page=${currentPageNumber}&limit=${pageSize}&${payload}`;

//   return axiosInstance.get(url);
// };

export const GetSearchProduct = (currentPageNumber: number, pageSize: number, payload: any) => {
  // Convert payload object to query string
  const queryParams = new URLSearchParams(payload).toString();
  
  // Build the URL with pagination parameters
  const url = `/api/items/getproducts?page=${currentPageNumber}&limit=${pageSize}&${queryParams}`;
  
  return axiosInstance.get(url);
};