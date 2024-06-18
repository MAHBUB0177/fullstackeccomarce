'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import profilePic from '@/assets/images/logo/airbnb-logo.png'
import { BsCart3 } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import Link from 'next/link';
import { Badge, Input, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';





let beforeList = [
  { title: 'About', path: '/', icon: null },
  { title: 'Contact', path: '/', icon: null },
  { title: '', path: '/', icon: BsCart3 },
  { title: 'Sign In', path: '/auth', icon: FaRegUser },
]



export interface UserType {
  email: string;
  name: string;
}

export interface AuthDataType {
  accessToken: string;
  refreshToken: string;
  user: UserType;
}


const Rootheader = () => {

  const [authData, setAuthData] = useState<AuthDataType | null>(null);
  console.log(authData,'authData+++++++')

  useEffect(() => {
    // Check if the window object is available (only in the browser)
    if (typeof window !== 'undefined') {
      const storedAuthData = localStorage.getItem('authdata');
      if (storedAuthData) {
        setAuthData(JSON.parse(storedAuthData));
      }
    }
  }, []);
  const { Search } = Input;
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  return (
    <div className='bg-primary  w-full z-50 fixed shadow-sm p-5 px-4 lg:px-20'>
      <div className='flex justify-between items-center'>
        <Link href={'/'}>
          <div className='flex gap-1'>
            <Image
              src={profilePic}
              alt="Picture of the author"
              className='h-[30px] w-[30px] cursor-pointer'
            />
            <p className='text-xl text-red-500 font-bold pt-1'>ECOM</p>
          </div>
        </Link>

        <div className="">
        <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
        </div>

        <div className="flex justify-start gap-7 pt-1 ">
          {/* {beforeList?.map((item, i) => (
            <Link href={item?.path} key={i}>
              <div className="text-lg font-base flex justify-between gap-1 text-slate-900">
                <p className='pt-1'>{item?.icon && <item.icon className='h-[20px] w-[20px] font-extrabold' />}</p>
                <p> {item?.title}</p>
              </div>
            </Link>
          ))} */}
          <Link href={'/'} >
              <div className="text-lg font-base flex justify-between gap-1 text-slate-900">
                <p> About</p>
              </div>
            </Link>

            <Link href={'/'} >
              <div className="text-lg font-base flex justify-between gap-1 text-slate-900">
                <p> Contact</p>
              </div>
            </Link>

            <Link href={'/'} >
              <div className="text-lg font-base flex justify-between gap-1 text-slate-900">
                <Badge count={5}>
                  <BsCart3 className='h-[20px] w-[20px] font-extrabold' />
                </Badge>
              </div>
            </Link>

           

            {authData?.accessToken ? (
                <>
                  <p className="flex justify-center items-center text-normal h-[30px] w-[30px] font-semibold rounded-full bg-black text-white">
                    {authData?.user?.name?.charAt(0).toUpperCase()}
                  </p>{" "}
                </>
              ) : (
                <Link href={'/auth'} >
              <div className="text-lg font-base flex justify-between gap-1 text-slate-900">
              <p> <FaRegUser className='h-[20px] w-[20px] font-extrabold' /></p>
                <p> Sign In</p>
              </div>
            </Link>
              )}

            
        </div>

      </div>
    </div>
  )
}

export default Rootheader