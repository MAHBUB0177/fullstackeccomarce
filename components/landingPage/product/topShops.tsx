import { GetAllShops } from '@/service/allApi';
import React, { useEffect, useState } from 'react'
import { MdOutlineStarRate } from 'react-icons/md';
import CardLoading from './cardLoading';
import { settings, ShuffledData } from '@/components/common/commonFunction';
import Slider from 'react-slick';
import NodataFound from '@/components/productFilter/nodataFound';
import { useRouter } from 'next/navigation';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const TopShops = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState<any[]>([]);
  const getAllProduct = async () => {
    setIsLoading(true);
    try {
      const res = await GetAllShops();
      setProductList(ShuffledData(res?.data?.shop || []));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  const router=useRouter()
  const handleOnClick = (id:any) => {
    router.push("/shop/" + id);
  };
  return (
    <div className='shadow-lg bg-primary rounded-md w-full h-auto border border-slate-100 mt-8 px-4'>
      <div className='flex justify-start gap-2 pt-4 px-2'>
        <MdOutlineStarRate className='text-white font-semibold h-[25px] w-[25px] bg-secondary rounded-full p-1' />

        <p className='text-xl text-black font-semibold'>Top Rated Shops</p>
      </div>
      {isLoading ? (
        <CardLoading />
      ) : (
        <div className="py-4 px-4">
          {
            productList.length > 0 ?
            <>
            <Slider {...settings()}>
            {
              productList?.map((item, i) => (
                <React.Fragment key={i}>
                  <div  className=" mr-3 mb-3" onClick={() => handleOnClick(item?._id)}>

                    <div key={i} className="w-full cursor-pointer  overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                      <div className="relative overflow-hidden pt-8 pb-3 px-2 rounded-md">
                        <img
                          src={item.image[0]}
                          style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                          className="rounded-lg"
                          alt={item.productName}
                        />
                      </div>
                      <div className="px-3 pb-5">
                        <h5 className="text-md flex justify-center items-center tracking-tight text-slate-900">{item?.description}</h5>
                        <div className="mt-1 mb-5 flex items-center text-orange-400 justify-start gap-1">
                        <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt />
                        <p className='text-slate-500'>
                        ({item?.followers})
                        </p>
                         
                        </div>

                      </div>
                    </div>




                  </div>
                  </React.Fragment >
              )) }
          </Slider>
            </>
            :
            <div className='flex justify-center items-center'>
            <NodataFound />
          </div>
          }
          
        </div>

      )}
    </div>
  )
}

export default TopShops;