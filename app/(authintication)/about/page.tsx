"use client"

import { GetCurrentuserInfo } from '@/service/allApi'
import React, { useEffect, useState } from 'react'

interface userDataType{
name:string
}
const page = () => {
    const[userData,setUserData]=useState<userDataType | null>(null);
  const getCurrentUserInfo=async()=>{
    await GetCurrentuserInfo().then((res)=>{
      setUserData(res?.data?.user)
    })
  }

  useEffect(()=>{
    getCurrentUserInfo()

  },[])
  return (
    <div className='px-20'>

    <div className='shadow-md bg-white rounded-md px-20 font-semibold py-10'>
        <p className='pb-10'>
        {userData?.name}
        </p>
     Welcome to Evaly.com.bd additionally thusly known as "we", "us" or "Evaly". We are an online commercial center and these are the terms and conditions overseeing your entrance and utilization of Evaly alongside its related sub-areas, destinations, portable application, administrations and apparatuses (the "Website"). By utilizing the Site, you thusly acknowledge these terms and conditions (counting the connected data in this) and speak to that you consent to conform to these terms and conditions (the "Client Agreement"). This User Agreement is regarded as successful upon your utilization of the Site which means your acknowledgment of these terms. 
     On the off chance that you don't consent to be bound by this User Agreement kindly don't get to, register with or utilize this Site. This Site is claimed and worked by Evaly Bangladesh Limited, an organization consolidated under the Companies Act, 1994.
    </div>
    </div>

  )
}

export default page