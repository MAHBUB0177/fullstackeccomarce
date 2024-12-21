"use client"

import { GetCurrentuserInfo } from '@/service/allApi'
import React, { useEffect, useState } from 'react'
import image1 from '@/assets/images/about/shoping1.jpg'
import image2 from '@/assets/images/about/shoping2.jpg'
import Image from 'next/image'
import CommonDetails from '@/components/common/commonDetails'
interface userDataType {
  name: string
}
const page = () => {

  return (
    <div >

      <div className='bg-[#E10102] w-full h-[300px]  mx-auto px-20 '>

        <div className='flex justify-between flex-col md:flex-row  '>
          <div className='flex justify-start items-center mx-auto gap-8  w-1/2 text-3xl font-semibold text-white'>
            About Us
          </div>
          <div className="text-white text-4xl flex pt-[5%] justify-start gap-4">
            <Image
              src={image1}
              alt="Picture of the author"
              className='h-[180px] w-[180px] cursor-pointer mb-[20px] rounded-full'
            />

            <Image
              src={image2}
              alt="Picture of the author"
              className='h-[180px] w-[180px]  cursor-pointer mt-[25px] rounded-full'
            />
          </div>

        </div>


      </div>
      <div className='text-md font-light text-slate-700 px-20 pt-20'>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
      <CommonDetails/>
    </div>

  )
}

export default page