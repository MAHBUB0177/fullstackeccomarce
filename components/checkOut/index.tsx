import React, { useState } from "react";
import { paymentType } from "../common/commonList";
import Image from "next/image";
const PaymentGetway = () => {
    const[getway,setGetway]=useState(false);

  return (
    <div>
      <div className=" mx-auto border-[1px] border-orange-300 bg-orange-100 text-orange-400  w-[55%] md:w-[65%] lg:w-[35%]  p-1">
        <p>Collect payment voucher & get extra savings on your purchase!</p>
      </div>

      <p className="text-2xl font-medium px-20 ">Select Payment Method</p>

      <div className="pt-4 px-0 md:px-20 w-full flex flex-col md:flex-row justify-between gap-4">
        
        <div className="w-[60%]">
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4  gap-2">
            {paymentType.map((image, i) => (
              <div
                key={i}
                
                className={`border-[1px] border-slate-300 p-1 rounded-md cursor-pointer md:w-[220px] ${getway ? "bg-slate-200" : "bg-white" }`}
                onClick={()=>setGetway(true)}
              >
                <Image
                  src={image.paymentType}
                  alt="Picture of the author"
                  className="h-[130px]  md:w-[220px] cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        <div className=" w-full md:w-[30%] ">
          <div className="bg-white border-[1px] border-slate-300 rounded-md h-[250px] shadow-sm p-4">
            <p className="text-xl font-semibold">Order Summary</p>
            <div className="flex justify-between pt-3 text-sm">
            <p className="text-slate-500">Items Total (1 Items)</p>
            <div className="flex justify-start text-sm">
              
              <p>1200</p>
            </div>
          </div>

          <div className="flex justify-between pt-3 text-sm">
            <p className="text-slate-500 font-semibold"> Total Amount</p>
            <div className="flex justify-start text-sm">
              <p>1200</p>
            </div>
          </div>

          <div className="mt-20 mb-2">
            <button
            //   onClick={ConfirmOrder}
              disabled={!getway}
            //   className={`w-full text-sm p-2 font-semibold bg-red-500 text-white rounded-md`}
            className={`w-full text-sm p-2 font-semibold ${
                !getway ? "bg-slate-400" : "bg-red-500"
              } text-white rounded-md`}
            >
              Proceed To Pay
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGetway;
