'use client';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import Image from 'next/image';
import { getBgImage } from '@/service/allApi';

type BgImage = {
  image: string;
};

const BannerSlider = () => {
  const [bgImag, setBgImg] = useState<BgImage[]>([]);

  const settings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const getCurrentUserInfo = async () => {
    try {
      const res = await getBgImage();
      if (res?.data?.isSuccess) {
        setBgImg(res?.data?.item); // Ensure `item` is an array of objects with `image` keys.
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  return (
    <div>
      <Slider {...settings}>
        {bgImag.length > 0 ? (
          bgImag.map((item, index) => (
            <div key={index}>
              <Image
                src={item.image}
                alt="bannerimg"
                className="h-[170px] md:h-[350px] w-full rounded-md"
                width={1000} // Adjust width
                height={350} // Adjust height
              />
            </div>
          ))
        ) : (
          <div></div>
        )}
      </Slider>
    </div>
  );
};

export default BannerSlider;
