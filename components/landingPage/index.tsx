'use client'

import React, { useEffect, useState } from 'react'
import BannerSlider from './bannerSlider'
import OfferCuppon from './offerCuppon'
import Banner from './banner'
import ProductPage from '../productPage'

const LandingPage = () => {

  const[hide,setIsHide]=useState<boolean>(false)

  return (
    <div className='pt-5 h-auto'>
     { !hide && <>
      <div className='flex justify-between gap-2 '>
        <div className='w-full lg:w-2/3  shadow-md  border bg-slate-300 rounded-md'>
          <BannerSlider />
        </div>
        <div className=' hidden lg:block lg:w-1/3   bg-[#F5F5F5] rounded-md'>
          <p className='p-4 text-lg'>Upcoming Campaigns</p>
          <OfferCuppon />
        </div>
      </div>
      <div>
      <Banner />
      </div>
      </>}


      <div>
      <ProductPage setIsHide={setIsHide} hide={hide}/> 
      </div>

    </div>



  )
}

export default LandingPage