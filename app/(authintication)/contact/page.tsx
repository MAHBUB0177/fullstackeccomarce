'use client'
import CommonDetails from '@/components/common/commonDetails';
import { errorMessage, successMessage } from '@/components/common/commonFunction';
import { createMyContact } from '@/service/allApi';
import { Form, Input } from 'antd';
import React, { useState } from 'react'
import { FaHeadphonesSimple, FaPhoneVolume } from "react-icons/fa6";
import { IoMdMail } from 'react-icons/io';
import { TiHomeOutline } from 'react-icons/ti';


const page = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();


  const onFinish = async (values: any) => {

    try {
      const response = await createMyContact(values);
      if (response?.data?.isSuccess) {
        form.resetFields();
        successMessage('Your message sent successfully!')
      }

    } catch (error) {
      errorMessage("Something Went Wrong");
    }
  };

  return (
    <div >
      <div className='bg-[#E10102] w-full h-[300px] flex justify-between mx-auto px-20 pt-[10%] flex-col md:flex-row'>
        <div className='text-white text-4xl'>contact us</div>
        <div className='text-white text-4xl flex justify-start gap-4'>
          <FaPhoneVolume />
          <IoMdMail />
          <FaHeadphonesSimple />
        </div>

      </div>
      <div className='flex justify-between flex-col md:flex-row  px-20 mt-20 gap-10'>
        <div className='flex justify-center items-center mx-auto gap-8  w-1/2'>
          <div className=''>
            <TiHomeOutline className='flex justify-center items-center h-[30px] w-[30px] text-[#E10102]' />
            <p className='font-semibold text-xl'>
              Corporate Office
            </p>
            <p className='text-md font-normal'>uttor baridhara,gulshan 2, road#12,house#147</p>
          </div>
          <div >
            <FaPhoneVolume className='flex justify-center items-center h-[30px] w-[30px] text-[#E10102]' />
            <p className='font-semibold text-xl'>
              Phone
            </p>
            <p className='text-md font-normal'>01870653599</p>
          </div>


        </div>
        <div className="flex flex-col px-4 py-5 w-1/2 bg-primary shadow-md border border-gray-100 h-auto rounded-md">
          <p className='text-2xl font-semibold'>How can we help you</p>
          <p className='text-md'>Please send your feedback or any query.</p>
          <Form onFinish={onFinish} id="reset-form" form={form}>
            <div className="mb-4 mt-3">
              <p className="pb-2">Full Name</p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name",
                  },
                ]}
              >
                <Input
                  className="rounded-md w-full"
                  type="text"
                  size="large"
                  placeholder="Full Name"

                />
              </Form.Item>
            </div>

            <div className="mb-4">
              <p className="pb-2">Email</p>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email",
                  },
                ]}
              >
                <Input
                  className="rounded-md w-full"
                  type="text"
                  size="large"
                  placeholder="Email"

                />
              </Form.Item>
            </div>

            <div className="mb-4">
              <p className="pb-2">Details</p>
              <Form.Item
                name="message"
                rules={[
                  {
                    required: true,
                    message: "Please input the details",
                  },
                ]}
              >
                <TextArea
                  className="rounded-md w-full"
                  rows={4}
                  placeholder="Details"
                />
              </Form.Item>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-full text-sm p-2 font-semibold bg-red-500 text-white rounded-md"
              >
                Send  Message
              </button>
            </div>
          </Form>
        </div>

      </div>
      <CommonDetails/>

      
    </div>
  )
}

export default page