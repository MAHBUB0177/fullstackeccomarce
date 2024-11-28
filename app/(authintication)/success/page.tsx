'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { GiConfirmed } from 'react-icons/gi'

const page = () => {
    const router = useRouter()
    const[called,setIsCalled]=useState(true)
    console.log(called,'called')

    useEffect(() => {
        const timer = setTimeout(() => {
          // router.push('/'); // Redirect to the desired route
          setIsCalled(false)
        }, 15000); // Delay in milliseconds (30 seconds)
    
        // Cleanup to avoid memory leaks if the component unmounts before the timeout
        return () => clearTimeout(timer);
      }, [router]);

  return (

    <div className="w-full max-w-lg mx-auto p-8 mt-[6%]">
    <div className="bg-white rounded-lg shadow-lg p-6">
           <div className='bg-[#41CA99] rounded-full h-[80px] w-[80px] flex justify-center items-center mx-auto'>
       <GiConfirmed className='h-[45px] w-[45px] text-white' />
       </div>
       <h2 className="text-2xl text-[#41CA99] font-bold mt-3  flex justify-center items-center">Thank You!</h2>
       <p className="text-xl t font-medium mt-3  flex justify-center items-center">Payment Done Successfully!</p>

       <p className='text-sm text-slate-500 font-medium mt-3  flex justify-center items-center'>you will be redirected to the home page shortly </p>
       <p className='text-sm text-slate-500 font-medium   flex justify-center items-center'>or click here to return the home page</p>
       
       <div className='flex justify-center items-center mt-2'>
        <Link href={'/'}>
        <button className='bg-[#41CA99] text-white px-4 pt-1 pb-1 text-md rounded-xl w-[150px]'>
        Home
      </button>
        </Link>
     
       </div>
   
    </div>
</div>
  )
}

export default page