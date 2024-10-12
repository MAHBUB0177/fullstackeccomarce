'use client'
import { setAddProducts, setRemoveProduct } from '@/reducer/cartReducer';
import { RootState } from '@/store';
import { Button, Checkbox } from 'antd';
import React from 'react'
import { CiLocationOn } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbCoinTakaFilled, TbCurrencyTaka } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';

const OrderCreate = () => {
  const dispatch = useDispatch()
  const cartList = useSelector((state: RootState) => state.cart.addProducts)
  const addToCart = (item: any) => {
    dispatch(setAddProducts(item));

}

const removeProductToCart=(item:any)=>{
  dispatch(setRemoveProduct(item))
}


  return (
    <div className='mx-4 lg:mx-20 mt-8 '>
      <div className='flex flex-col md:flex-row  justify-between  gap-2'>
        <div className='w-full md:w-2/3 '>
          <div className='p-3 mb-3 bg-primary shadow-sm  flex justify-between text-textprimary text-sm'>
            <div>
            <Checkbox onChange={(e) => console.log(e.target.value)}>Select All ({cartList?.length} items)</Checkbox>
            </div>
            <div className='flex justify-start gap-1 text-textprimary text-sm'>
              <RiDeleteBin6Line className=' h-[20px] w-[20px]' />
              <p className=''> DELETE </p>
            </div>
          </div>

          {cartList?.map((item,index)=>
          <div className=' bg-primary shadow-sm  mb-3'>
          <div className='flex justify-start gap-1 p-3'>
            <Checkbox onChange={(e) => console.log(e.target.value)}>Checkbox</Checkbox>
          </div>
          <div className='border-b-[1px] border-slate-200'></div>
          <div className='flex  flex-col md:flex-row  justify-between  pt-2 p-3'>
            <div className='w-full md:w-1/3 flex justify-center pb-2 md:pb-0  md:justify-start gap-2'>
              <img
                src={item?.image[0]}
                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                className="rounded-lg"
                alt={item?.productName}
              />
              <div className='flex justify-center items-center'>
                <div className='text-sm pt-2'>
                  <p >{item?.productName}</p>
                  <p>Brand : {item?.brand}</p>
                </div>
              </div>
            </div>


            <div className='w-full md:w-1/3 flex justify-center pb-2 md:pb-0 items-center'>
              <div className='pt-2 '>
                <div className='text-sm  flex justify-start'>
                  <TbCoinTakaFilled className='h-[20px] w-[20px] text-red-400' />
                  <p >{item?.price}</p>
                </div>
                <div className='text-sm  flex justify-start line-through'>
                  <TbCurrencyTaka className='h-[20px] w-[20px] text-red-400' />
                  <p className=''> {item?.oldprice}</p>
                </div>
              </div>
            </div>

            <div className='w-full md:w-1/3 flex justify-center pb-2 md:pb-0 items-center gap-3'>
              <div className="flex items-center">
                <button className="border rounded-sm bg-slate-200 py-1 px-4 mr-2">-</button>
                <span className="text-center w-8">{item?.qnty}</span>
                <button className="border rounded-sm bg-slate-200 py-1 px-4 ml-2" onClick={() => addToCart(item)}>+</button>
              </div>
              <RiDeleteBin6Line className=' h-[20px] w-[20px] text-red-400 cursor-pointer' onClick={()=>removeProductToCart(item)}/>
            </div>

          </div>
        </div>
          ) }

        </div>

        <div className='w-full h-auto md:h-[450px] lg:h-[400px] md:w-1/3 p-3 bg-primary shadow-sm  rounded-sm sticky top-20'>
          <p className='text-sm text-slate-500'>Location</p>
          <div className='flex justify-start gap-3 border-b-[1px] border-slate-200 pt-2 pb-4'>
            <CiLocationOn className='text-bold text-black' />
            <p className='text-sm text-slate-700'>Add Shipping Address</p>
          </div>
          <div className='rounded-md bg-[#DBEAFE] p-3 mt-2 mb-2'>
            <p className=' text-black'>Collecting from the nearest delivery hub to save 40% on delivery charge</p>
          </div>
          <div className='flex justify-between pb-2'>
            <p>SubTotal</p>
            <p>1230</p>
          </div>

          <div className='flex justify-between pb-4'>
            <p>Shipping</p>
            <p>30</p>
          </div>

          <div className='flex justify-between pb-4 border-t-[1px] border-slate-200'>
            <p>Total</p>
            <p>1230</p>
          </div>
          <p className='text-sm pb-2 text-slate-500'>* Delivery charges might vary depending on product size and weight.</p>
          <div>
            <Button type="primary" danger className='w-full text-md p-4 font-semibold'>
              Proced To CheckOut
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default OrderCreate;