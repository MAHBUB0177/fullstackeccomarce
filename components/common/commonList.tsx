
import nogod from '@/assets/images/paymentType/nogod.png'
import bkash from '@/assets/images/paymentType/bkash.png'
import rocket from '@/assets/images/paymentType/rocket.png'
import upay from '@/assets/images/paymentType/upay.png'
import dbbl from '@/assets/images/paymentType/download.jpg'

export const paymentType = [
    {paymentType: nogod},
    {paymentType: bkash},
    {paymentType: rocket},
    {paymentType: upay},
    // {paymentType: dbbl},
    ]
export const  categoryList = [
    { title: "Laptop", value: "laptop" },
    { title: "Phone", value: "phone" },
    { title: "Watch", value: "watch" },
    { title: "Shoes", value: "shoes" },
  ];


  type Color = "all" | "red" | "green" | "blue" | "slate" | "purple";

 export const colorClasses: Record<Color, string> = {
  all: "bg-gray-500 border-gray-500",
  red: "bg-red-500 border-red-500",
  green: "bg-green-500 border-green-500",
  blue: "bg-blue-500 border-blue-500",
  slate: "bg-slate-500 border-slate-500",
  purple: "bg-purple-500 border-purple-500",
};

export const colorItem: { color: Color; value: Color }[] = [
  { color: "all", value: "all" },
  { color: "red", value: "red" },
  { color: "green", value: "green" },
  { color: "blue", value: "blue" },
  { color: "slate", value: "slate" },
  { color: "purple", value: "purple" },
];