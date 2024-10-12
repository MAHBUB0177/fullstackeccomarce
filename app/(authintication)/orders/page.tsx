'use client'
import { errorMessage } from '@/components/common/commonFunction';
import NodataFound from '@/components/productFilter/nodataFound';
import { setAddProducts, setDicrementProduct, setEmptyCart, setRemoveProduct } from '@/reducer/cartReducer';
import { RootState } from '@/store';
import { Button, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbCoinTakaFilled, TbCurrencyTaka } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';

const OrderCreate = () => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]); // Update type to store full item objects
  const [selectAll, setSelectAll] = useState(false);
  const [subTotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);


  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      // If "Select All" is checked, select all item objects
      setSelectedItems(cartList); // Store the full cart items array
    } else {
      // If unchecked, clear the selected items
      setSelectedItems([]);
    }
  };



  const handleSelectItemChange = (item: any) => {
    let updatedSelectedItems = [...selectedItems];

    // Check if the item is already selected based on its ID
    const isAlreadySelected = updatedSelectedItems.some((selectedItem) => selectedItem._id === item._id);
   console.log(isAlreadySelected,'isAlreadySelected')
    if (isAlreadySelected) {
      // If it's already selected, remove the item by filtering it out
      updatedSelectedItems = updatedSelectedItems.filter((selectedItem) => selectedItem._id !== item._id);
    } else {
      // Otherwise, add the full item object
      updatedSelectedItems.push(item);
    }

    setSelectedItems(updatedSelectedItems);

    // If all items are selected, check the "Select All" box
    if (updatedSelectedItems.length === cartList.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };



  const dispatch = useDispatch()
  const cartList = useSelector((state: RootState) => state.cart.addProducts)
  const addToCart = (item: any) => {
    dispatch(setAddProducts(item));
  }
  const removeProductToCart = (item: any) => {
    dispatch(setRemoveProduct(item))
    errorMessage('Product Is Removed From The Cart')
  }
  const decrementProductToCart = (item: any) => {
    dispatch(setDicrementProduct(item))
  }


  
  useEffect(() => {
    // Calculate Subtotal
    let subtotal = selectedItems.reduce((total, item) => {
      return total + item.qnty * item.price;
    }, 0);
  
    // Calculate Shipping Fee (modify the 0.05 to whatever percentage or value you want for the shipping)
    let shippingFee = selectedItems.reduce((total, item) => {
      return total + item.qnty * 10;// Example: $10 per quantity of the item, adjust as per your logic
    }, 0);
  
    // Update state with calculated values
    setSubtotal(subtotal);
    setShipping(shippingFee);
  }, [selectedItems]);
  
  
  const removeCart=()=>{
    if(selectAll){
      dispatch(setEmptyCart())
    }else{
      return errorMessage('Please Select Item.')
    }
  }
  

  return (
    <div className='mx-4 lg:mx-20 mt-8 '>
      {
        cartList?.length == 0 ? <div className=' mx-auto h-[500px] flex justify-center items-center'>
          <div>
            <NodataFound />
          </div>
        </div> :

          <div className='flex flex-col md:flex-row  justify-between  gap-2'>
            <div className='w-full md:w-2/3'>
              <div className='p-3 mb-3 bg-primary shadow-sm flex justify-between text-textprimary text-sm'>
                <div>
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  >
                    Select All ({cartList?.length} items)
                  </Checkbox>
                </div>
                <div className='flex justify-start gap-1 text-textprimary text-sm cursor-pointer hover:text-red-500'  onClick={() => removeCart()}>
                  <RiDeleteBin6Line className='h-[20px] w-[20px]' />
                  <p> DELETE </p>
                </div>
              </div>

              {/* List of Cart Items */}
              {cartList?.map((item, index) => (
                <div key={item._id} className='bg-primary shadow-sm mb-3'>
                  <div className='flex justify-start gap-1 p-3'>
                    <Checkbox
                      checked={selectedItems.some((selectedItem) => selectedItem._id === item._id)}  // Check if the item is already selected
                      onChange={() => handleSelectItemChange(item)}  // Pass the full item object to the handler
                    >
                      Select
                    </Checkbox>

                  </div>
                  <div className='border-b-[1px] border-slate-200'></div>
                  <div className='flex flex-col md:flex-row justify-between pt-2 p-3'>
                    <div className='w-full md:w-1/3 flex justify-center pb-2 md:pb-0 md:justify-start gap-2'>
                      <img
                        src={item?.image[0]}
                        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                        className="rounded-lg"
                        alt={item?.productName}
                      />
                      <div className='flex justify-center items-center'>
                        <div className='text-sm pt-2'>
                          <p>{item?.productName}</p>
                          <p>Brand: {item?.brand}</p>
                        </div>
                      </div>
                    </div>

                    <div className='w-full md:w-1/3 flex justify-center pb-2 md:pb-0 items-center'>
                      <div className='pt-2'>
                        <div className='text-sm flex justify-start'>
                          <TbCoinTakaFilled className='h-[20px] w-[20px] text-red-400' />
                          <p>{item?.price}</p>
                        </div>
                        <div className='text-sm flex justify-start line-through'>
                          <TbCurrencyTaka className='h-[20px] w-[20px] text-red-400' />
                          <p>{item?.oldprice}</p>
                        </div>
                      </div>
                    </div>

                    <div className='w-full md:w-1/3 flex justify-center pb-2 md:pb-0 items-center gap-3'>
                      <div className="flex items-center">
                        <button className="border rounded-sm bg-slate-200 py-1 px-4 mr-2" onClick={() => decrementProductToCart(item)}>-</button>
                        <span className="text-center w-8">{item?.qnty}</span>
                        <button className="border rounded-sm bg-slate-200 py-1 px-4 ml-2" onClick={() => addToCart(item)}>+</button>
                      </div>
                      <RiDeleteBin6Line className='h-[20px] w-[20px] text-red-400 cursor-pointer' onClick={() => removeProductToCart(item)} />
                    </div>
                  </div>
                </div>
              ))}
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

                <div className='flex justify-start '> 
                  <p><TbCurrencyTaka className='h-[20px] w-[20px]'/>
                  </p>  <p>{subTotal}</p>
                </div>
              </div>

              <div className='flex justify-between pb-4'>
                <p>Shipping</p>
                <div className='flex justify-start '> 
                  <p><TbCurrencyTaka className='h-[20px] w-[20px]'/>
                  </p>  <p>{shipping}</p>
                </div>
                
              </div>

              <div className='flex justify-between pb-4 border-t-[1px] border-slate-200'>
                <p>Total</p>
               
                <div className='flex justify-start '> 
                  <p><TbCurrencyTaka className='h-[20px] w-[20px]'/>
                  </p>   <p>{subTotal + shipping}</p>
                </div>
              </div>
              <p className='text-sm pb-2 text-slate-500'>* Delivery charges might vary depending on product size and weight.</p>
              <div>
                <Button type="primary" danger className='w-full text-md p-4 font-semibold'>
                  Proced To CheckOut
                </Button>
              </div>
            </div>

          </div>




      }

    </div>
  )
}

export default OrderCreate;