import React from "react";
import nodatafound from "@/assets/images/logo/nodatafound.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NodataFound = () => {
  const pathname = usePathname()
  return (
    <div >
      <Image
        src={nodatafound}
        alt="Picture of the author"
        className="h-[100px] w-[130px] cursor-pointer mx-20 "
      />
      {pathname === '/orders' ?  <p className="text-lg text-slate-800 font-medium pt-2 mx-12">
        Order Cart Is Empty!!
      </p> :  <p className="text-lg text-slate-800 font-medium pt-2 mx-12">
        No Products Found!
      </p>}
      {
        pathname === '/search' ?   <>
      <p className="text-slate-500">Try searching with different keywords</p>
      </> :
      <></>
      }
    </div>
  );
};

export default NodataFound;
