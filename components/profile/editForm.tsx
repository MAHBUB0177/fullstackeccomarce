import React from 'react'
import CustomInput from '../common/CustomInput'
import { Form } from 'antd';


// Define the types for props
interface UserData {
    name: string;
    email: string;
  }
  
  interface EditFormProps {
    userData: UserData;
    handleInputChange: (value: string, fieldName: keyof UserData) => void;
  }
const EditForm = ({userData,handleInputChange}:EditFormProps) => {
  return (
    <div>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <div>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your FullName",
                                },
                            ]}
                        >
                            <CustomInput
                                type="text"
                                labelText={"Full Name"}
                                value={userData?.name}
                                onChange={(e) => handleInputChange(e.target.value, 'name')}
                            />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Email",
                                },
                            ]}
                        >
                            <CustomInput
                                type="text"
                                labelText={"Email"}
                                value={userData?.email}
                                onChange={(e) => handleInputChange(e.target.value, 'email')}
                            />
                        </Form.Item>
                    </div>


                    <div className="col-span-1 flex items-center justify-center">
                        <input
                            //   onChange={(e) => fileupload(e.target.files[0], index)}
                            //   id={`myFile-${index}`}
                            type="file"
                            //   ref={fileInputRef}
                            className="file:bg-primary file:px-4  file:py-2 file:text-gray-400 rounded-md file:cursor-pointer border border-slate-400 w-full"
                        />
                    </div>
                </div>
                
    </div>
  )
}

export default EditForm