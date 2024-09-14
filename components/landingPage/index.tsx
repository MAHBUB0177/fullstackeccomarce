'use client'

import React, { useEffect, useState } from 'react'
import BannerSlider from './bannerSlider'
import OfferCuppon from './offerCuppon'
import Banner from './banner'
import PopularProduct from './product/popularProduct'
import TrendingProduct from './product/trendingProduct'
import TopShops from './product/topShops'
import Product from '../productFilter/product'
import Products from './product/products'
import Service from './service'

const LandingPage = () => {

  const [hide, setIsHide] = useState<boolean>(false)

  return (
    <div className='pt-5 h-auto'>
      {!hide && <>
        <div className='flex justify-between gap-2 '>
          <div className='w-full lg:w-2/3  shadow-md  border  rounded-md'>
            <BannerSlider />
          </div>
          <div className=' hidden lg:block lg:w-1/3   bg-[#F5F5F5] rounded-md'>
            <p className='p-4 text-lg'>Upcoming Campaigns</p>
            <OfferCuppon />
          </div>
        </div>
        <div>
          {/* <Banner /> */}
        </div>
      </>}

      <div>
        <TrendingProduct />
        <PopularProduct />
        <TopShops />
        <Products />
      </div>


      <div>
        {/* <ProductPage setIsHide={setIsHide} hide={hide}/>  */}
      </div>

    </div>



  )
}

export default LandingPage