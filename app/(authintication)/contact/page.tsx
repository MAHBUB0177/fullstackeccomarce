'use client'
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
                Save Information
              </button>
            </div>
          </Form>
        </div>

      </div>

      <div className=' h-auto   px-20 py-10 mt-20  bg-[#f3eaea]'>
        <div className='flex justify-between flex-col md:flex-row'>
          <p className='font-semibold text-3xl text-[#E10102]'>Ecom</p>
          <p className='font-semibold text-2xl '><a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-[#E10102] rounded-md mr-1 hover:text-blue-400 hover:border-blue-400">
            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
            </svg>
          </a>
            <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-[#E10102] rounded-md mr-1 hover:text-blue-400 hover:border-blue-400">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
              </svg>
            </a>
            <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-[#E10102] rounded-md mr-1 hover:text-blue-400 hover:border-blue-400">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
              </svg>
            </a></p>
        </div>
        <div>
            <p className='text-xl font-semibold'> Order Any Product From the best shops with Ecom Bangladesh</p>
            <p className='text-md text-slate-600 font-light'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.</p>
          </div>
      </div>
    </div>
  )
}

export default page