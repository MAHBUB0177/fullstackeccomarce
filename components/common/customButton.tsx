import React from 'react'


interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: string;  // Optional size prop for custom styling
    btnName: string;
    type?: 'button' | 'submit' | 'reset'; 
    bg?:string // Required btnName prop for button text
  }
const CustomButton = ({ size,bg,btnName,type, ...rest }:CustomButtonProps) => {
    return (
        <button
          {...rest}
          type={type ? type : 'button'} 
          className={`${
            size ? size : "w-full mt-6 px-4"
          } ${bg ? bg : "bg-secondary"}  shadow-shadow-glow text-white text-custom-size rounded-md
        hover:scale-105 duration-300`}
        >
          {btnName}
        </button>
      );
}

export default CustomButton