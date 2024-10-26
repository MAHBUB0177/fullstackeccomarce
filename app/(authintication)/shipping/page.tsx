
'use client'
import { RootState } from '@/store';
import { Checkbox, Form } from 'antd';
import React, { useEffect, useState } from 'react'
import { TbCurrencyTaka } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import ShippingForm from './shippingForm';
import { confirmOrder, createOrder, GetCurrentuserInfo, getOrderInfo } from '@/service/allApi';
import {errorMessage, successMessage } from '@/components/common/commonFunction';
import { setRemovemultipleProduct } from '@/reducer/cartReducer';
import { useRouter } from 'next/navigation';
import OrderDetailsInfo from './orderDetailsInfo';


type Agent = {
    _id: string;
    name: string;
    email: string;
};

type orderType = {
userId:string,
name:string,
phoneNumber:Number,
houseNo:string
}

const Shipping = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const cartList = useSelector((state: RootState) => state.cart.checkoutCart)
    const [select, setSelect] = useState(false)

    const [Total, setTotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [agent, setAgent] = useState<Agent | null>(null);
  const[orderInfo,setOrderInfo]=useState<orderType | null>(null);
      const getOrderallInfo = async () => {
        try {
          const response = await getOrderInfo();
          if (response?.data?.isSuccess) {
            setOrderInfo(response.data.item);
          }
          
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
    

    const getCurrentUserInfo = async () => {
        try {
          const res = await GetCurrentuserInfo();
          if (res?.data?.user) {
            setAgent(res.data.user);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };

      useEffect(()=>{
        getCurrentUserInfo()
        getOrderallInfo()
      },[])

    useEffect(() => {
        // Calculate Subtotal
        let subtotal = cartList.reduce((total, item) => {
            return total + item.qnty * item.price;
        }, 0);

        let shippingFee = cartList.reduce((total, item) => {
            return total + item.qnty * 30;// Example: $10 per quantity of the item, adjust as per your logic
        }, 0);

        // Update state with calculated values
        setTotal(subtotal);
        setShipping(shippingFee);
    }, [cartList]);

    const [postData, setPostData] = useState({
        name: '',
        phoneNumber: '',
        houseNo: '', 
        postalCode: '',
        division: '',
        city: '',
        area: '',
        address: ''

    })


    const onFinish = async (values: any) => {
        try{
            const response =await createOrder(values)
            successMessage(response?.data?.message)
            if(response?.data?.isSuccess){
                   getOrderallInfo()
            }
        }
        catch(error){
            errorMessage('Something Went Wrong')
        }
    };

    const ConfirmOrder = async () => {
        if (!agent) {
            errorMessage('Agent information is missing');
            return;
        }
    
        // Map through the cartList and add agent info to each product
        const updatedCartList = cartList.map(product => ({
            ...product,           // Copy existing product details
            userId: agent._id,    // Add user ID
            name: agent.name, // Add user name
            email: agent.email // Add user email
        }));
        
        console.log(updatedCartList);
        
        try {
            const response = await confirmOrder(updatedCartList)
            if (response?.data?.isSuccess) {
                successMessage(response?.data?.message)
                dispatch(setRemovemultipleProduct(cartList))
                router.push('/')

            }
            else {
                errorMessage(response?.data?.message)
            }
        }
        catch (error) {
            errorMessage('Something Went Wrong')
        }
    }
    return (
        <div className='mx-4 lg:mx-20 mt-8'>
            <div className='flex flex-col md:flex-row  justify-between  gap-2'>
                <div className='w-full md:w-2/3 bg-primary rounded-sm shadow-sm p-2'>
                    <p className='pt-2 p-4'>Delivery Information</p>
                   { orderInfo !== null ?
                    <>
                    <OrderDetailsInfo orderInfo={ orderInfo} cartList={cartList}/>
                    </>
                   :
                     <Form
                        onFinish={onFinish}
                        id="reset-form"
                        form={form}
                    >
                        <ShippingForm postData={postData} setPostData={setPostData}/>
                        <div className='flex justify-center items-center mb-5'>
                        <button
                            className={`w-full text-sm p-2 font-semibold bg-red-500 text-white rounded-md`}
                        >
                            Save Information
                        </button>
                        </div>
                    </Form> 
                   }


                </div>

                <div className='w-full h-auto md:h-[400px] md:w-1/3 bg-primary rounded-sm shadow-sm p-4'>
                    <p>Promotion</p>
                    <div className="flex flex-1 items-center justify-center ">
                        <div className="w-full max-w-lg">
                            <form className="mt-3 sm:flex sm:items-center">
                                <input id="q" name="q" className="inline w-full  border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="Enter Store/Code" type="search" value="" /><button type="submit" className="mt-3 inline-flex w-full items-center justify-center  border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">APPLY</button>
                            </form>
                        </div>
                    </div>
                    <p className='mt-4'>Order Summary</p>
                    <div className='flex justify-between pt-3 text-sm'>
                        <p className='text-slate-500'>Items Total (1 Items)</p>
                        <div className='flex justify-start text-sm'>
                            <p><TbCurrencyTaka className='h-[20px] w-[20px]' /></p>
                            <p>{Total}</p>
                        </div>
                    </div>

                    <div className='flex justify-between pt-3 text-sm border-b-[1px] border-slate-300 pb-3'>
                        <p className='text-slate-500'>Delivery Fee</p>
                        <div className='flex justify-start text-sm'>
                            <p><TbCurrencyTaka className='h-[20px] w-[20px]' /></p>
                            <p>{shipping}</p>
                        </div>
                    </div>

                    <div className='flex justify-between pt-3 text-sm'>
                        <p>Total</p>
                        <div className='flex justify-start text-sm'>
                            <p><TbCurrencyTaka className='h-[20px] w-[20px]' /></p>
                            <p>{Total + shipping} </p>
                        </div>
                    </div>
                    <p className='text-xs flex justify-end pt-1 text-red-400'>VAT included, where applicable</p>

                    <div className='flex justify-start gap-2 pt-3'>
                        <Checkbox
                            onChange={(e) => setSelect(e.target.checked)}
                        // checked={selectAll}
                        >

                        </Checkbox>
                        <p className='text-xs pt-1'> I agree with Terms&Conditions.</p>
                    </div>
                    <div className='mt-4 mb-5'>


                        <button
                        onClick={ConfirmOrder}
                            disabled={select && orderInfo !== null ? false : true}
                            className={`w-full text-sm p-2 font-semibold ${select && orderInfo !== null  ? 'bg-red-500' : 'bg-slate-400'} text-white rounded-md`}
                        >
                            Proced To Pay
                        </button>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Shipping;