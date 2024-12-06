import React, { useEffect, useState } from "react";
import { paymentType } from "../common/commonList";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { confirmOrder, confirmOrderPayment, GetCurrentuserInfo } from "@/service/allApi";

import { loadStripe } from "@stripe/stripe-js";
import { setRemovemultipleProduct } from "@/reducer/cartReducer";
import { errorMessage } from "../common/commonFunction";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

type Agent = {
  _id: string;
  name: string;
  email: string;
};

const PaymentGetway = () => {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);
  const [productTotal, setProductTotal] = useState(0);
  const [sheppingFee, setShippingFee] = useState(0);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [totalQntity, settotalQntity] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const cartList = useSelector((state: RootState) => state.cart.checkoutCart);
  const selctedOrderinfo = useSelector(
    (state: RootState) => state.Orderinfo.confirmOrderInfo as any
  );
console.log(selctedOrderinfo,'selctedOrderinfo+++')
  const handleClick = (index: number) => {
    setSelectedIndex(index); // Update state to the clicked item's index
  };

  const [payload, setPayload] = useState<
    { unit_amount: number; quantity: number }[] | undefined
  >([]);

  const getCurrentUserInfo = async () => {
    try {
      const res = await GetCurrentuserInfo();
      if (res?.data?.user) {
        setAgent(res.data.user);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };


  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  useEffect(() => {
    // Calculate Subtotal
    const subtotal = cartList.reduce((total, item) => {
      return total + item.qnty * item.price;
    }, 0);

    const totalQnty = cartList.reduce((total, item) => {
      return total + item.qnty;
    }, 0);

    const shippingFee = cartList.reduce((total, item) => {
      return total + item.qnty * 30;
    }, 0);
    setProductTotal(subtotal)
    setShippingFee(shippingFee)
    setTotal(subtotal + shippingFee);
    settotalQntity(totalQnty);

    if (Array.isArray(cartList)) {
      const newPayload = cartList.map((item) => ({
        unit_amount: item.price,
        quantity: item.qnty,
        product_name: item.productName,
      }));
      setPayload(newPayload);
    }
  }, [cartList]);

  const ConfirmOrder = async () => {
    if (!agent) {
      errorMessage("Agent information is missing");
      return;
    }
    // Map through the cartList and add agent info to each product
    const updatedCartList = cartList.map((product) => ({
      ...product, // Copy existing product details
      userId: agent._id, // Add user ID
      name: agent.name, // Add user name
      email: agent.email, // Add user email
      shippingUserName: selctedOrderinfo?.order?.name ?? "",
      shippingPhone: selctedOrderinfo?.order?.phoneNumber ?? "",
      shippingHouseNo: selctedOrderinfo?.order?.houseNo ?? "",
      shippingCity: selctedOrderinfo?.order?.city ?? "",
      shippingFee:sheppingFee,
      grandTotal:productTotal

    }));

    try {
      const response = await confirmOrder(updatedCartList);
      // if (response?.data?.isSuccess) {
      // } else {
      //   errorMessage(response?.data?.message);
      // }
    } catch (error) {
      errorMessage("Something Went Wrong");
    }
  };

  const confirmPyment = async () => {
    try {
      // Call the backend API to create a Stripe session
      const response = await confirmOrderPayment(payload);
      if (response?.statusText === "OK") {
        dispatch(setRemovemultipleProduct(cartList));
        ConfirmOrder()
      }
      const sessionId = response.data.id;
      // Get the client-side Stripe instance
      const stripe = await stripePromise;

      if (stripe) {
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({ sessionId });
        if (result?.error) {
          window.location.href = "/error";
        }
      } else {
        window.location.href = "/error";
      }
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      window.location.href = "/error";
    }
  };

  return (
    <div>
      <div className="mx-auto border-[1px] border-orange-300 bg-orange-100 text-orange-400 w-[55%] md:w-[65%] lg:w-[35%] p-1">
        <p>Collect payment voucher & get extra savings on your purchase!</p>
      </div>

      <p className="text-2xl font-medium px-20">Select Payment Method</p>

      <div className="pt-4 px-0 lg:px-20 w-full flex flex-col md:flex-row justify-between gap-1">
        <div className="w-[75%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {paymentType.map((image, i) => (
              <div
                key={i}
                className={`border-[1px] border-slate-300 p-1 rounded-md cursor-pointer md:w-[220px] ${
                  selectedIndex === i ? "bg-slate-300" : "bg-white"
                }`}
                onClick={() => handleClick(i)}
              >
                <Image
                  src={image.paymentType}
                  alt="Payment Option"
                  className={`h-[130px] md:w-[220px] cursor-pointer ${
                    selectedIndex === i ? "opacity-50" : "opacity-100"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-[25%]">
          <div className="bg-white border-[1px] border-slate-300 rounded-md h-[250px] shadow-sm p-4">
            <p className="text-xl font-semibold">Order Summary</p>
            <div className="flex justify-between pt-3 text-sm">
              <p className="text-slate-500">
                Subtotal{" "}
                <span className="text-[10px]">
                  ({totalQntity} Items and shipping fee included)
                </span>{" "}
              </p>
              <div className="flex justify-start text-sm">
                <p>{Total}</p>
              </div>
            </div>

            <div className="flex justify-between pt-3 text-sm">
              <p className="text-slate-500 font-semibold">Total Amount</p>
              <div className="flex justify-start text-sm">
                <p>{Total}</p>
              </div>
            </div>

            <div className="mt-16 mb-2">
              <button
                onClick={confirmPyment}
                // When no item is selected, disable the button
                disabled={selectedIndex === null}
                className={`w-full text-sm p-2 font-semibold ${
                  selectedIndex === null ? "bg-slate-400" : "bg-red-500"
                } text-white rounded-md`}
              >
                Confirm to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGetway;
