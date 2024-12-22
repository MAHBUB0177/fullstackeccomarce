import React from 'react'
import CustomInput from '../common/CustomInput'
import { Form } from 'antd';


// Define the types for props
interface passwordChnage {
    oldPassword: string;
    Password: string;
    confirmPassword: string;
  }
  
  interface EditFormProps {
    passwordChnage: passwordChnage;
    handleInputChangepass: (value: string, fieldName: keyof passwordChnage) => void;
  }
const PasswordForm = ({passwordChnage,handleInputChangepass}:EditFormProps) => {
  return (
    <div>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <div>
                        <Form.Item
                            name="oldPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your oldPassword",
                                },
                            ]}
                        >
                            <CustomInput
                                type="text"
                                labelText={"OldPassword"}
                                value={passwordChnage?.oldPassword}
                                onChange={(e) => handleInputChangepass(e.target.value, 'oldPassword')}
                            />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            name="Password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password",
                                },
                            ]}
                        >
                            <CustomInput
                                type="text"
                                labelText={"Password"}
                                value={passwordChnage?.Password}
                                onChange={(e) => handleInputChangepass(e.target.value, 'Password')}
                            />
                        </Form.Item>
                    </div>


                    <div>
                        <Form.Item
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your confirmPassword",
                                },
                            ]}
                        >
                            <CustomInput
                                type="text"
                                labelText={"confirmPassword"}
                                value={passwordChnage?.confirmPassword}
                                onChange={(e) => handleInputChangepass(e.target.value, 'confirmPassword')}
                            />
                        </Form.Item>
                    </div>
                </div>
                
    </div>
  )
}

export default PasswordForm;