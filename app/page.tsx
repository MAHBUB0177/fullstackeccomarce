import LandingPage from "@/components/landingPage";
import Service from "@/components/landingPage/service";
// import ProductPage from "@/components/productPage";
import Image from "next/image";
import Product from "./(authintication)/search/page";

export default function Home() {
  return (
    <div className="pb-[50px]">
      <div className=" px-4 lg:px-20 ">
        <LandingPage />
      </div>
      <Service />
    </div>

  );
}
