'use client'
import React from 'react'
import Slider from 'react-slick';

import image1 from '@/assets/images/hotDeal/image1.png'
import image2 from '@/assets/images/hotDeal/image2.webp'
import image3 from '@/assets/images/hotDeal/image3.jpg'
import image4 from '@/assets/images/hotDeal/image4.png'
import image5 from '@/assets/images/hotDeal/image5.webp'
import Image from 'next/image';



const categoryList = [image1,image2,image3,image4,image5];

const BannerSlider = () => {
    var settings = {
        // dots: true,
        autoplay: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      };
    
  return (
    <div>
        <Slider {...settings}>
      
        {categoryList.map((item,index)=><>
        <Image src={item} alt='bannerimg' className='h-[350px] w-full rounded-md'/>
        </>)}
      
    </Slider>
    </div>
  )
}

export default BannerSlider