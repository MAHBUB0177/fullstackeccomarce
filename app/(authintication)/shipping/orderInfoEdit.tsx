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

import { useDispatch, useSelector } from "react-redux";
import { setconfirmOrderInfo } from "@/reducer/confirmCartReducer";
import { RootState } from "@/store";

interface OrderInfoEditProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type orderType = {
  _id: string;
  userId: string;
  name: string;
  phoneNumber: number;
  houseNo: string;
  postalCode: number;
  division: string;
  city: string;
  area: string;
  address: string;
  __v: number;
};

const OrderInfoEdit: React.FC<OrderInfoEditProps> = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [orderInfo, setOrderInfo] = useState<orderType[]>([]); // Use array of orderType

  // const [shippingDetails, setShippingDetails] = useState<orderType | null>(
  //   orderInfo.length > 0 ? orderInfo[0] : null
  // );
  const dispatch = useDispatch();
  const selctedOrderinfo = useSelector(
    (state: RootState) => state.Orderinfo.confirmOrderInfo
  );
  // const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");
  const onClose = () => {
    setOpen(false);
  };
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const _handleCancel = () => {
    setIsModalOpen(false);
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

  //radio button
  const [value, setValue] = useState(1);
  useEffect(() => {
    if (selctedOrderinfo?.value) {
      setValue(selctedOrderinfo.value);
      // setShippingDetails(selctedOrderinfo.order);
    }
  }, [selctedOrderinfo]);

  const handleRadioChange = (e: any) => {
    const newValue = e.target.value;
    setValue(newValue);
    const selectedOrder = orderInfo[newValue - 1];
    dispatch(setconfirmOrderInfo({ value: newValue, order: selectedOrder }));
  };

  // const saveOrderInfo = async () => {
  //   if (selctedOrderinfo?.order) {
  //     setShippingDetails(selctedOrderinfo.order);
  //   }
  //   setTimeout(() => onClose(), 0);
  // };

  useEffect(() => {
    getOrderallInfo();
  }, []);
  return (
    <>
      <Drawer
        title="Shipping Address"
        placement={"right"}
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
          <Radio.Group value={value} onChange={handleRadioChange}>
            <Space direction="vertical">
              {orderInfo.map((order, index) => (
                <div className="border-[1px] border-slate-300 p-3 w-[350px] md:w-[450px] rounded-md">
                  <Radio value={index + 1}>
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
              className={`w-[150px] text-sm p-2 font-semibold bg-red-500 text-white `}
              onClick={onClose}
            >
              Close
            </button>

            {/* <button
              className={`w-[150px] text-sm p-2 font-semibold bg-red-500 text-white `}
              // onClick={saveOrderInfo}
            >
              Save Information
            </button> */}
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
