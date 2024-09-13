import { message } from "antd"

export const successMessage =async (response:string)=>{
    message.success(response)
}


export const errorMessage =async (response:string)=>{
    message.error(response)
}