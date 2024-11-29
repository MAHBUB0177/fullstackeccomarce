
'use client'
import { settings, ShuffledData, successMessage } from '@/components/common/commonFunction';
import CardLoading from '@/components/landingPage/product/cardLoading';
import NodataFound from '@/components/productFilter/nodataFound';
import SliderImages from '@/components/sliderImage';
import { setAddProducts } from '@/reducer/cartReducer';
import { getProductById, GetRelatedProduct, GetSearchProduct, getShopsById } from '@/service/allApi';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { MdOutlineStarRate } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';

interface ProductParams {
    params: {
        id: number;
    };
}

const ShopDetails = ({ params }: ProductParams) => {
    const dispatch = useDispatch()

    const [product, setProduct] = useState<any>(null);
    const getProductbyId = async (id: string | number) => {
        try {
            const res = await getShopsById(id);
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

    const addToCart = (item: any) => {
        dispatch(setAddProducts(item));
        successMessage('Product Add To Cart')

    }
    return (
        < div className='mx-4 lg:mx-20 mt-8 '>

            <div className="p-8  flex flex-col md:flex-row justify-start md:gap-8 shadow-sm border border-slate-100 bg-primary rounded-md h-auto">
                <div className='flex justify-center items-center'>
                    <Image
                        src={product?.image[0]}
                        width={150}
                        height={150}
                        objectFit='contain'
                        className="rounded-lg"
                        alt={'productname'}
                    />

                </div>
                <div >
                    <p className='text-2xl font-semibold '>{product?.description}</p>
                    <p className='text-md font-medium text-slate-500'> Delivery In  {product?.delivery_date}</p>
                    <div className='flex justify-start gap-1  pt-1 text-orange-400'>
                        <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt />
                        <p className='text-slate-500 mb-2 text-sm'>({product?.followers})</p>
                    </div>
                    <p className='text-slate-700 '>{product?.address}</p>
                </div>
            </div>

            <div className='shadow-sm bg-primary rounded-md w-full h-auto border border-slate-100 mt-8 px-4'>
                <div className='flex justify-start gap-2 pt-4 px-2'>
                    <p className='text-xl text-black font-semibold'>Discover  items</p>
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

                                            <div key={i} className="w-full   overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                                                <div className="relative cursor-pointer overflow-hidden pt-8 pb-3 px-2 rounded-md">
                                                    <Link href={`/products/${item?._id}`}>
                                                        <img
                                                            src={item.image[0]}
                                                            style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                                                            className="rounded-lg"
                                                            alt={item.productName}
                                                        />
                                                    </Link>

                                                    <div className="absolute bg-secondary text-white rounded-xl p-[2px] top-[3%] left-[5%] px-4">
                                                        <p className="font-normal text-[12px]">{item.discount ?? 'No Discount'} OFF</p>
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
                                                                className="h-4 w-4 text-yellow-300"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="h-4 w-4 text-yellow-300"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="h-4 w-4 text-yellow-300"
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
                                                    <div className=' w-full  pt-2 cursor-pointer' onClick={() => addToCart(item)}>
                                                        <a
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

export default ShopDetails;
