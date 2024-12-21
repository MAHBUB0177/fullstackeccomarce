
'use client'
import { settings, ShuffledData, successMessage } from '@/components/common/commonFunction';
import CardLoading from '@/components/landingPage/product/cardLoading';
import NodataFound from '@/components/productFilter/nodataFound';
import SliderImages from '@/components/sliderImage';
import { setAddProducts } from '@/reducer/cartReducer';
import { getProductById, GetRelatedProduct, GetSearchProduct } from '@/service/allApi';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';

interface ProductParams {
  params: {
    id: number;
  };
}

const ProductDetails = ({ params }: ProductParams) => {

  const dispatch = useDispatch()
  const [product, setProduct] = useState<any>(null);
  const getProductbyId = async (id: string | number) => {
    try {
      const res = await getProductById(id);
      setProduct((res?.data?.data || {}));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState<any[]>([]);

  const getRelatedProduct = async () => {
    let payload = {
      category: product?.category ?? ''
    }
    setIsLoading(true);
    try {
      const res = await GetRelatedProduct(payload);
      setProductList(ShuffledData(res?.data?.item || []));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000)
    }
  };

  useEffect(() => {
    getRelatedProduct()
  }, [product?.category])

  useEffect(() => {
    getProductbyId(params.id);
  }, []);

  const addToCart=(item:any)=>{
    dispatch(setAddProducts(item));
    successMessage('Product Add To Cart')

  }
  return (
    < div className='mx-4 pb-[50px] lg:mx-20 mt-8 '>

      <div className="  p-4 flex flex-col md:flex-row justify-between  md:gap-40 shadow-sm border border-slate-100 bg-primary rounded-md h-auto">
        <div >
          <SliderImages image={product?.image} />

        </div>
        <div className='pt-8'>
          <p className='text-2xl font-semibold '>{product?.description}</p>
          <div className='flex justify-start gap-4 pt-1'>
            <p className='text-md font-medium'> Category : <span className='text-red-500'> {product?.category}</span></p>
            <p className='text-md font-medium'>| Brand : <span className='text-red-500'> {product?.brand}</span></p>
          </div>
          <p className='text-lg pt-4 font-medium'>Specifications:</p>
          <div className='flex justify-start w-[300px] md:w-[500px]  pt-1'>
            <p className='font-medium w-[150px]  md:w-[250px]'>Brand :</p>
            <p className='font-normal text-slate-600 text-start w-[150px] md:w-[250px]'>{product?.brand}</p>
          </div>

          <div className='flex justify-between w-[300px] md:w-[500px]   pt-1'>
            <p className='font-medium w-[250px]'>Product Type :</p>
            <p className='font-normal text-slate-600 text-start w-[250px]'>{product?.productName}</p>
          </div>

          <div className='flex justify-between w-[300px] md:w-[500px]  pt-1'>
            <p className='font-medium w-[150px]  md:w-[250px]'>price:</p>
            <p className='font-normal text-slate-600 text-start w-[150px]  md:w-[250px]'>{product?.price}</p>
          </div>

          <div className='flex justify-between w-[300px] md:w-[500px]  pt-1'>
            <p className='font-medium w-[150px]  md:w-[250px]'>Rating :</p>
            <p className='font-normal text-slate-600 text-start w-[150px]  md:w-[250px]'>{product?.rating}</p>
          </div>
          <div>
            <div className='w-[200px] pt-2' onClick={()=>addToCart(product)}>

          
                <a
                
                  href="#"
                  className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to cart
                </a>
                </div>
          </div>
        </div>
      </div>

      <div className='shadow-sm bg-primary rounded-md w-full h-auto border border-slate-100 mt-8 px-4'>
        <div className='flex justify-start gap-2 pt-4 px-2'>
          <p className='text-xl text-black font-semibold'>Discover similar items</p>
        </div>
        {isLoading ? (
          <CardLoading />
        ) : (
          <div className="py-4 px-4">
            <Slider {...settings()}>
              {productList.length > 0 ?
                productList?.map((item, i) => (
                  <React.Fragment key={i}>
                    <div className=" mr-3 mb-3">

                      <div key={i} className="w-full cursor-pointer  overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                        <div className="relative overflow-hidden pt-8 pb-3 px-2 rounded-md">
                          <Link href={`/products/${item?._id}`}>
                            <img
                              src={item.image[0]}
                              style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                              className="rounded-lg"
                              alt={item.productName}
                            />
                          </Link>
                          <div className="absolute bg-secondary text-white rounded-xl p-[2px] top-[3%] left-[5%] px-4">
                            <p className="font-normal text-[12px]">{item.discount ?? '0%'} OFF</p>
                          </div>
                        </div>
                        <div className="px-3 pb-5">
                          <h5 className="text-md tracking-tight text-slate-900">{item?.productName?.substring(0, 20)}{item?.productName?.length > 20 ? '...' : ''}</h5>
                          <div className="mt-1 mb-5 flex items-center justify-between">
                            <p>
                              <span className="text-lg font-bold text-slate-900">${item?.price}</span>
                              <span className="text-sm text-slate-900 line-through">
                                ${item?.oldprice ?? 699}
                              </span>
                            </p>
                            <div className="flex items-center">

                              <svg
                                aria-hidden="true"
                                className="h-5 w-5 text-yellow-300"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>

                              <span className="mr-2 ml-1 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                                {item?.rating ?? 5.0}
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>




                    </div>
                  </React.Fragment >
                )) : (
                  <>
                    <NodataFound />
                  </>
                )}
            </Slider>
          </div>

        )}
      </div>

    </div>
  );
};

export default ProductDetails;
