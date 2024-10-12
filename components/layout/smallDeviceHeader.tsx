'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import profilePic from '@/assets/images/logo/airbnb-logo.png'
import { Badge } from 'antd'
import { BsCart3 } from 'react-icons/bs'
import { IoMdCloseCircleOutline } from 'react-icons/io'

interface SmallDeviceHeaderProps {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    searchTerm: string;
    searchData: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    clearState: () => void; // No need to pass the event, so this type is just a void function
  }
  
  

const SmallDeviceHeader = ({setSearchTerm,searchTerm,handleSubmit,searchData,clearState}:SmallDeviceHeaderProps) => {
    return (

        <>
        <div className='flex justify-between items-center'>
            <Link href={'/'}>
                <div className='flex gap-1'>
                    <Image
                        src={profilePic}
                        alt="Picture of the author"
                        className='h-[30px] w-[30px] cursor-pointer'
                    />
                    <p className='text-xl text-red-500 font-bold pt-1'>ECOM</p>
                </div>
            </Link>

            <div className='flex justify-start gap-7 pt-1'>
                <Link href={'/'} >
                    <div className="text-lg pt-2 font-base flex justify-between gap-1 text-slate-900">
                        <Badge count={5}>
                            <BsCart3 className='h-[20px] w-[20px] font-semibold' />
                        </Badge>
                    </div>
                </Link>

                <Link href={'/auth'} >
                    <button
                        className={"w-20 text-sm p-[6px] font-semibold border hover:bg-red-200 border-red-500  text-secondary rounded-md hover:scale-105 duration-300"}
                    >
                        Sign in

                    </button>
                </Link>

            </div>
        </div>

        <div className="flex justify-center items-center pt-3">
          <form className="flex flex-col md:flex-row " onSubmit={handleSubmit}>
            <div className="flex items-center" >
              <div className="relative w-full ">
                <input
                  type="text"
                  placeholder="Search for Category, Brand, Name"
                  className="w-full px-4  h-10 rounded-l border-2 border-secondary focus:outline-none focus:border-secondary pr-10"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm !== '' ? searchTerm : searchData || ''}
                />


              
                 {(searchTerm || searchData) && <button
                    type="button"
                    onClick={clearState}
                    className="absolute py-2 right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <IoMdCloseCircleOutline className="text-secondary h-[20px] w-[20px]" />
                  </button>}
            

              </div>

              <button type="submit" className="bg-secondary text-white rounded-r px-4  py-2">
                Search
              </button>
            </div>

          </form>
        </div>
        </>
    )
}

export default SmallDeviceHeader