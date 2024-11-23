'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { MdCancel } from 'react-icons/md'

const page = () => {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
          router.push('/'); // Redirect to the desired route
        }, 30000); // Delay in milliseconds (30 seconds)
    
        // Cleanup to avoid memory leaks if the component unmounts before the timeout
        return () => clearTimeout(timer);
      }, [router]);

  return (

    <div className="w-full max-w-lg mx-auto p-8 mt-[6%]">
    <div className="bg-white rounded-lg shadow-lg p-6">
           <div className='bg-[#E10101] rounded-full h-[80px] w-[80px] flex justify-center items-center mx-auto'>
       <MdCancel  className='h-[45px] w-[45px] text-white' />
       </div>
       <h2 className="text-2xl text-[#E10101] font-bold mt-3  flex justify-center items-center">Payment Error</h2>
       <p className="text-xl t font-medium mt-3  flex justify-center items-center">Opps! Network Error</p>

       <p className='text-sm text-slate-500 font-medium mt-3  flex justify-center items-center'>There was a probleam with your Trnsaction </p>
       {/* <p className='text-sm text-slate-500 font-medium   flex justify-center items-center'>or click here to return the home page</p> */}
       
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