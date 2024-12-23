'use client'
import React, { useEffect, useState } from 'react'
import profile from '@/assets/images/user/149071.png'
import Image from 'next/image';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../common/commonModal';
import { Form, message } from 'antd';
import CustomInput from '../common/CustomInput';
import EditForm from './editForm';
import CustomButton from '../common/customButton';
import { GetCurrentuserInfo, updateUserInfo, UserPassChange } from '@/service/allApi';
import { setAuthUser } from '@/reducer/authReducer';
import PasswordForm from './passwordChange';
import { errorMessage } from '../common/commonFunction';

const items = [
    {
        label: "First Name",
        text: "Jeanne",
    },
    {
        label: "Last Name",
        text: "Halvorson",
    },
    {
        label: "Gender",
        text: "Female",
    },
    {
        label: "Contact No.",
        text: "+11 998001001",
    },
    {
        label: "Current Address",
        text: "Beech Creek, PA, Pennsylvania",
    },
    {
        label: "Permanant Address",
        text: "Arlington Heights, IL, Illinois",
    },
    {
        label: "Email.",
        text: "jane@example.com",
    },
    {
        label: "Birthday.",
        text: "Feb 06, 1998",
    },
]


// Type definitions
export interface UserType {
    email: string;
    name: string;
    _id: string; // Ensure the id matches the actual field in your data
  }
  

  export interface passwordChangeType {
    oldPassword: string;
    Password: string;
    confirmPassword: string; // Ensure the id matches the actual field in your data
  }
  
  const Profile = () => {
    const [form] = Form.useForm();
    const dispatch=useDispatch()
 
  
    // State for user data
    const [userData, setUserData] = useState<UserType>({
      _id: '',
      name: '',
      email: ''
    });

    const[passwordChnage,setPasswordChnage] = useState({
        oldPassword:'',
        Password:'',
        confirmPassword:''
    })
  console.log(passwordChnage,'passwordChnage=========')
    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState({
        editModalOpen: false,
        passwordChangedOpen: false
    });
     // Function to toggle specific modals
  const toggleModal = (modalType: 'editModalOpen' | 'passwordChangedOpen', isOpen: boolean) => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [modalType]: isOpen,
    }));
  };

  const _handleCancel = () => {
    toggleModal('editModalOpen', false); // Close the edit modal
  };
  const _handleCancel1 = () => {
    toggleModal('passwordChangedOpen', false);
  };
  
  
    // State for agent data
    const [agentData, setAgentData] = useState<UserType | null>(null);  
    // Fetch current user info
    const getCurrentUserInfo = async () => {
      try {
        const res = await GetCurrentuserInfo();
        if (res?.data?.user) {
          setAgentData(res.data.user);
          dispatch(setAuthUser(res.data.user))
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
  
    // Fetch user info on component mount
    useEffect(() => {
      getCurrentUserInfo();
    }, []);
  
    // Handle editing user info
    const handelEdit = () => {
      if (agentData) {
        setUserData({
          _id: agentData._id,
          name: agentData.name,
          email: agentData.email
        });
  
        // Set form fields with the new values
        form.setFieldsValue({
          name: agentData.name,
          email: agentData.email,
        });
  
      
        // setIsModalOpen({...isModalOpen,editModalOpen:true});
        toggleModal('editModalOpen', true)
      }
    };
  
    // Handle form submission
    const onFinish = async () => {
      try {
        const res = await updateUserInfo(userData);
        message.success(res.data.message);
        _handleCancel();
        getCurrentUserInfo()
      } catch (error) {
        console.error('Error updating user info:', error);
        message.error('Something went wrong!');
      }
    };

    const onFinishPassword = async (values:any) => {
        if(passwordChnage?.Password !== passwordChnage?.confirmPassword){
            return  message.error('passwords do not match');
        }
        try {
            let payloads={
                oldPassword: passwordChnage?.oldPassword,
                Password: passwordChnage?.Password
            }
          const res = await UserPassChange(payloads);
          message.success(res.data.message);
          _handleCancel1()
          getCurrentUserInfo()
        } catch (error) {
          console.error('Error updating user info:', error);
          message.error('Something went wrong!');
        }
      };
  
    // Handle input change
    const handleInputChange = (value: string, key: keyof UserType) => {
      setUserData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };

    const handleInputChangepass = (value: string, key: keyof passwordChangeType) => {
        setPasswordChnage((prevState) => ({
          ...prevState,
          [key]: value,
        }));
      };
    
  

    return (
        <div>
            <div className=" mx-auto max-w-screen-xl py-[100px]  p-3">
                <div className="md:flex no-wrap">

                    <div className="w-full md:w-3/12 m-2 shadow-2xl">
                        <div className="bg-white p-3 border-t-4 border-primary">
                            <div className="image overflow-hidden">
                                <Image className="h-32 w-32 rounded-full border-4 border-white mx-auto my-4" src={profile} alt="" />
                            </div>
                            <div className="py-2">
                                <div className='flex justify-between items-start'>
                                    <h3 className="font-bold text-2xl mb-1">  {agentData?.name}</h3>

                                    <button className='bg-secondary py-1 px-4 rounded text-white text-sm' onClick={handelEdit}>
                                        Edit

                                    </button>

                                </div>
                                <div className="inline-flex text-gray-700 items-center">
                                    <svg className="h-5 w-5 text-gray-400 mr-1" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path className=""
                                            d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                    </svg>
                                    New York, NY
                                </div>
                            </div>
                            <h3 className="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
                            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                                consectetur adipisicing elit.
                                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                            <ul
                                className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto"><span
                                        className="bg-secondary py-1 px-2 rounded text-white text-sm">Active</span></span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto">Nov 07, 2016</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full md:w-9/12 m-2 lg:h-64 h-auto">
                        <div className="bg-white p-3 rounded-sm shadow-2xl">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span className="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide font-medium text-lg">About</span>
                            </div>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    {
                                        items?.map((item, index) => <div className="grid grid-cols-2">
                                            <div className=" py-2 font-semibold text-start">{item?.label}</div>
                                            <div className=" py-2 text-start">{item?.text}</div>
                                        </div>)
                                    }
                                    <div className="grid grid-cols-2 ">
                                        <div className="md:px-4 py-2 font-semibold flex justify-start">
                                            <button type={"submit"} className=' bg-secondary rounded-md p-2 text-white w-auto md:w-[150px] h-[40px]' onClick={() => toggleModal('passwordChangedOpen', true)} >
                                                Change Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <CommonModal
                    open={isModalOpen?.editModalOpen}
                    setIsModalOpen={(isOpen) => toggleModal('editModalOpen', isOpen)}
                    title={`EDIT`}
                    onCancel={_handleCancel}
                    width={"1000px"}
                >
                    <Form onFinish={onFinish} form={form}>
                        <EditForm userData={userData} handleInputChange={handleInputChange} />

                        <div className="flex justify-end mt-3">
                            <div
                                style={{ marginRight: "4px" }}
                                onClick={() => _handleCancel()}
                            >
                                <CustomButton
                                    btnName="Cancle"
                                    size={"w-28 text-sm py-2 bg-red-500"}
                                />
                            </div>
                            <div style={{ marginRight: "4px" }}>
                                <CustomButton type={"submit"} btnName="submit" size={"w-28 text-sm py-2"} bg={'bg-bgsecondary'} />
                            </div>
                        </div>
                    </Form>

                </CommonModal>
            </div>


            
            <div>
                <CommonModal
                    open={isModalOpen?.passwordChangedOpen}
                    setIsModalOpen={(isOpen) => toggleModal('passwordChangedOpen', isOpen)}
                    title={`Change Password`}
                    onCancel={_handleCancel1}
                    width={"1000px"}
                >
                    <Form onFinish={onFinishPassword} form={form}>
                        <PasswordForm passwordChnage={passwordChnage} handleInputChangepass={handleInputChangepass} />

                        <div className="flex justify-end mt-3">
                            <div
                                style={{ marginRight: "4px" }}
                                onClick={() => _handleCancel()}
                            >
                                <CustomButton
                                    btnName="Cancle"
                                    size={"w-28 text-sm py-2 bg-red-500"}
                                />
                            </div>
                            <div style={{ marginRight: "4px" }}>
                                <CustomButton type={"submit"} btnName="submit" size={"w-28 text-sm py-2"} bg={'bg-bgsecondary'} />
                            </div>
                        </div>
                    </Form>

                </CommonModal>
            </div>

        </div>
    )
}

export default Profile;



