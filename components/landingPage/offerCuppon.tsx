import React, { useEffect, useState } from 'react'
import image1 from '@/assets/images/hotDeal/cuppon1.png'
import image2 from '@/assets/images/hotDeal/cuppon2.png'
import Image from 'next/image'
import { CountdownStart1, CountdownStart2 } from './countDown'
const OfferCuppon = () => {


    const [countdown1, setCountdown1] = useState({ days1: 0, hours1: 0, minutes1: 0, seconds1: 0 });//card 1
  const [countdown2, setCountdown2] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });//card 2
  
  useEffect(() => {
    CountdownStart1(setCountdown1);//card 1
    CountdownStart2(setCountdown2);//card2
    //   return () => clearInterval(); 
  }, []);
;

    
  return (
    <div className='flex flex-col gap-4 lg:mx-1 xl:mx-4'>
        
        <div className='bg-white shadow-sm p-4 h-[120px] rounded-md flex justify-between'>
            <div className='w-1/2'>
            <Image src={image1} alt='cupponimg' className='h-[60px] w-full rounded-md '/>
            <p className=' text-sm text-red-500 px-4 font-medium'>Campaign starts in</p>
            </div>
            <div className='w-1/2 grid grid-cols-2 pt-2 gap-1'>
            <div className='bg-slate-600 h-[40px] lg:w-[60px] xl:w-[70px] rounded-md text-white font-semibold flex justify-center items-center'>
              {countdown1?.days1}d
            </div>
            <div className='bg-slate-600 h-[40px] lg:w-[60px] xl:w-[70px] rounded-md  text-white font-semibold flex justify-center items-center'>
            {countdown1?.hours1}h
            </div>
            <div className='bg-slate-600 h-[40px] lg:w-[60px] xl:w-[70px] rounded-md text-white font-semibold flex justify-center items-center'>
            {countdown1?.minutes1}m
            </div>
            <div className='bg-slate-600 h-[40px] lg:w-[60px] xl:w-[70px] rounded-md text-white font-semibold flex justify-center items-center'>
            {countdown1?.seconds1}s
            </div>
            </div>
            

        </div>

        <div className='bg-white shadow-sm p-4 h-[120px] rounded-md flex justify-between'>
            <div className='w-1/2'>
            <Image src={image2} alt='cupponimg' className='h-[60px] w-full rounded-md '/>
            <p className=' text-sm text-red-500 px-4 font-medium'>Campaign starts in</p>
            </div>
            <div className='w-1/2 grid grid-cols-2 pt-2 gap-1'>
            <div className='bg-slate-600 h-[40px] lg:w-[60px] xl:w-[70px] rounded-md text-white font-semibold flex justify-center items-center'>
            {countdown2?.days}d
            </div>
            <div className='bg-slate-600 h-[40px] lg:w-[60px] xl:w-[70px] rounded-md  text-white font-semibold flex justify-center items-center'>
            {countdown2?.hours}h
            </div>
            <div className='bg-slate-600 h-[40px] lg:w-[60px] xl:w-[70px] rounded-md text-white font-semibold flex justify-center items-center'>
            {countdown2?.minutes}m
            </div>
            <div className='bg-slate-600 h-[40px] lg:w-[60px] xl:w-[70px] rounded-md text-white font-semibold flex justify-center items-center'>
            {countdown2?.seconds}s
            </div>
            </div>
            

        </div>

    </div>
  )
}

export default OfferCuppon