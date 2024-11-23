import Link from 'next/link'
import React from 'react'
import { GiConfirmed } from 'react-icons/gi'

const page = () => {
  return (

    <div className="w-full max-w-lg mx-auto p-8">
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
        <button className='bg-[#41CA99] text-white px-4 pt-1 pb-1 text-md rounded-xl'>
        Home
      </button>
        </Link>
     
       </div>
   
    </div>
</div>
  )
}

export default page