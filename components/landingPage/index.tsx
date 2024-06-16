'use client'

import React from 'react'
import BannerSlider from './bannerSlider'
import OfferCuppon from './offerCuppon'
import Banner from './banner'

const LandingPage = () => {
  return (
    <>
      <div className='flex justify-between gap-2'>
        <div className='w-full lg:w-2/3  shadow-md  border bg-slate-300 rounded-md'>
           <BannerSlider/>
        </div>

    <div className=' hidden lg:block lg:w-1/3   bg-[#F5F5F5] rounded-md'>
    <p className='p-4 text-lg'>Upcoming Campaigns</p>
        <OfferCuppon/>
    </div>
    </div>

    <Banner/>
    </>
  

    
  )
}

export default LandingPage