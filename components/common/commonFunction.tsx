import { message } from "antd"

export const successMessage =async (response:string)=>{
    message.success(response)
}


export const errorMessage =async (response:string)=>{
    message.error(response)
}

export const ShuffledData = (data: any) => {
    return [...data].sort(() => 0.5 - Math.random());
  };
  


export const settings = () => {
    return {
      // dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  };
  