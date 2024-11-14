import React, { useEffect, useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import { getOrderInfo } from '@/service/allApi';




interface OrderInfoEditProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

  type orderType = {
    userId:string,
    name:string,
    phoneNumber:any,
    houseNo:string
    address:string
    }
  
const OrderInfoEdit: React.FC<OrderInfoEditProps> = ({ open, setOpen })  => {
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const onClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };


  const [orderInfo, setOrderInfo] = useState<orderType[]>([]); // Use array of orderType
  const getOrderallInfo = async () => {
      try {
        const response = await getOrderInfo(); // Make the API call
        if (response?.data?.isSuccess) {
          setOrderInfo(response.data.item); // Assuming `items` is the array in your API response
        }
      } catch (error) {
        console.error('Error fetching order info:', error);
      }
    };

  useEffect(() => {
    getOrderallInfo();
  }, []);
  return (
    <>
      
      <Drawer
        title="Shipping Address"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        extra={
            <p className='text-[#F97316] cursor-pointer'>Add new address</p>
        }
      >
     <div className='flex justify-start gap-3'>
     <Radio.Group onChange={onChange} value={value}>
  <Space direction="vertical">
    {orderInfo?.map((order, index) => (
      <Radio value={index + 1}>
        <div>
          <p className="flex justify-start gap-2 font-medium text-slate-500">{order.name}</p>
          <p className="font-medium text-slate-500">{order.phoneNumber}</p>
          <p className="font-medium text-slate-500">{order.address}</p>
        </div>
      </Radio>
    ))}
  </Space>
</Radio.Group>


     </div>
      </Drawer>
    </>
  );
};

export default OrderInfoEdit;