import React, { useEffect, useState } from "react";
import { paymentType } from "../common/commonList";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { confirmOrderPayment } from "@/service/allApi";

const PaymentGetway = () => {
  const [Total, setTotal] = useState(0);
  const [totalQntity, settotalQntity] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const cartList = useSelector((state: RootState) => state.cart.checkoutCart);
  console.log(cartList,'cartList+++++')

  const handleClick = (index: number) => {
    setSelectedIndex(index); // Update state to the clicked item's index
  };

  useEffect(() => {
    // Calculate Subtotal
    let subtotal = cartList.reduce((total, item) => {
      return total + item.qnty * item.price;
    }, 0);
    let totalQntity = cartList.reduce((total, item) => {
      return total + item.qnty ;
    }, 0);


    let shippingFee = cartList.reduce((total, item) => {
      return total + item.qnty * 30; // Example: $10 per quantity of the item, adjust as per your logic
    }, 0);

    // Update state with calculated values
    setTotal(subtotal + shippingFee);
    settotalQntity(totalQntity)
  }, [cartList]);

  const confirmPyment=async ()=>{
    let payload={
      productName: '',
      unit_amount : Total,
      quantity: totalQntity
    }

    try {
      const response = await confirmOrderPayment(payload)
      console.log(response)
      
      
    } catch (error) {
      console.log(error)
      
    }
  }

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
              <p className="text-slate-500">Subtotal <span className="text-[10px]">({totalQntity} Items and shipping fee included)
                </span> </p>
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

            <div className="mt-20 mb-2">
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
