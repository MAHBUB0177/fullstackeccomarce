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

 export const updateUserInfo=(payload:any)=>{
  let url=`api/user/update`;
  return axiosInstance.put(url,payload);
 }
  export const GetProductInfo = (currentPageNumber: number, pageSize: number) => {
    const url = `/api/items/getproducts?page=${currentPageNumber}&limit=${pageSize}`;
    http://localhost:500/api/products?name=iphone&select=company,featured
    return axiosInstance.get(url);
};

export const GetSearchProduct = (currentPageNumber: number, pageSize: number, payload: any) => {
  // Convert payload object to query string
  const queryParams = new URLSearchParams(payload).toString();
  const url = `/api/items/getproducts?page=${currentPageNumber}&limit=${pageSize}&${queryParams}`;
  return axiosInstance.get(url);
};

// API call (Update URL to use the path parameter)
export const getProductById = (id: string | number) => {
  const url = `/api/items/fetch/${id}`;  // Using path parameter instead of query parameter
  return axiosInstance.get(url); 
};

export const GetRelatedProduct = ( payload: any) => {
  const queryParams = new URLSearchParams(payload).toString();
  const url = `/api/items/getRelatedProducts?${queryParams}`;
  return axiosInstance.get(url);
};

export const GetAllShops = () => {
  const url = `/api/items/shop/fetch`;
  return axiosInstance.get(url);
};

export const getShopsById = (id: string | number) => {
  const url = `/api/items/shop/fetchbyid/${id}`;  // Using path parameter instead of query parameter
  return axiosInstance.get(url); 
};