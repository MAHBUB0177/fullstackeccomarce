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
  
export  const getNextThreeDaysFormatted = (): string => {
    const today = new Date();
    const nextTwoDays = new Date(today);
    nextTwoDays.setDate(today.getDate() + 2);
  
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  
    const startDate = new Intl.DateTimeFormat('en-US', options).format(today); // Current date
    const endDate = new Intl.DateTimeFormat('en-US', options).format(nextTwoDays); // Next two days
  
    return `${startDate}-${endDate}`;
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
  