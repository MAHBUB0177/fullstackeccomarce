import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Radio, Space } from "antd";
import type { DrawerProps, RadioChangeEvent } from "antd";
import { createOrder, getOrderInfo } from "@/service/allApi";
import CommonModal from "@/components/common/commonModal";
import {
  errorMessage,
  successMessage,
} from "@/components/common/commonFunction";
import ShippingForm from "./shippingForm";

interface OrderInfoEditProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type orderType = {
  userId: string;
  name: string;
  phoneNumber: any;
  houseNo: string;
  address: string;
};

const OrderInfoEdit: React.FC<OrderInfoEditProps> = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const[orderId,setOrderId]=useState<orderType | null>(null);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");
  const onClose = () => {
    setOpen(false);
  };

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const _handleCancel = () => {
    setIsModalOpen(false);
  };
  //radio button
  const [value, setValue] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const [postData, setPostData] = useState({
    name: "",
    phoneNumber: "",
    houseNo: "",
    postalCode: "",
    division: "",
    city: "",
    area: "",
    address: "",
  });
  const [orderInfo, setOrderInfo] = useState<orderType[]>([]); // Use array of orderType
  const getOrderallInfo = async () => {
    try {
      const response = await getOrderInfo(); // Make the API call
      if (response?.data?.isSuccess) {
        setOrderInfo(response.data.item); // Assuming `items` is the array in your API response
      }
    } catch (error) {
      console.error("Error fetching order info:", error);
    }
  };

  const onFinish = async (values: any) => {
    try {
      const response = await createOrder(values);
      successMessage(response?.data?.message);
      if (response?.data?.isSuccess) {
        getOrderallInfo();
        _handleCancel();
        form.resetFields();
      }
    } catch (error) {
      errorMessage("Something Went Wrong");
    }
  };

  const saveOrderInfo=async () => {


  }


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
          <p
            className="text-[#F97316] cursor-pointer"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add new address
          </p>
        }
      >
        <div className="  ">
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              {orderInfo?.map((order, index) => (
                <div className="border-[1px] border-slate-300 p-3 w-[350px] md:w-[450px]  rounded-md">
                  <Radio value={index + 1} onClick={()=>setOrderId(order)}>
                    <div>
                      <p className="flex justify-start gap-2 font-medium text-slate-500">
                        {order.name}
                      </p>
                      <p className="font-medium text-slate-500">
                        {order.phoneNumber}
                      </p>
                      <p className="font-medium text-slate-500">
                        {order.address}
                      </p>
                    </div>
                  </Radio>
                </div>
              ))}
            </Space>
          </Radio.Group>

          <div className="flex gap-4 justify-center items-center mt-5">


          <button
            className={`w-[150px] text-sm p-2 font-semibold bg-slate-300 text-white `}
              onClick={_handleCancel} 
          >
            Cancel
          </button>

          <button
            className={`w-[150px] text-sm p-2 font-semibold bg-red-500 text-white `}
            onClick={saveOrderInfo}
          >
            Save Information
          </button>
          
          </div>
        </div>

        <div>
          <CommonModal
            open={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            title={`EDIT`}
            onCancel={_handleCancel}
            width={"1000px"}
          >
            <Form onFinish={onFinish} id="reset-form" form={form}>
              <ShippingForm postData={postData} setPostData={setPostData} />
              <div className="flex justify-center items-center mb-5">
                <button
                  className={`w-full text-sm p-2 font-semibold bg-red-500 text-white rounded-md`}
                >
                  Save Information
                </button>
              </div>
            </Form>
          </CommonModal>
        </div>
      </Drawer>
    </>
  );
};

export default OrderInfoEdit;
