import React from 'react'
import AppStore from './appStore'

const Service = () => {
    return (
        <div>
            <section className="text-gray-700 body-font mt-8 bg-slate-100 px-4 lg:px-20 mb-[50px]">

                <div className="container px-5 py-12 mx-auto">
                    <div className="flex flex-wrap text-center justify-center">
                        <div className="p-4 md:w-1/3 sm:w-1/2">
                            <div className="px-4 py-6 ">
                                <div className="flex justify-center transform transition duration-500 hover:scale-110">
                                    <img src="https://image3.jdomni.in/banner/13062021/58/97/7C/E53960D1295621EFCB5B13F335_1623567851299.png?output-format=webp" className="w-32 mb-3" />
                                </div>
                                <h2 className="title-font font-regular text-xl text-gray-900">Super fast Delivery</h2>
                                <p className='pt-1'>Faster than your cravings can blink. Experience the super-fast delivery</p>
                            </div>
                        </div>

                        <div className="p-4 md:w-1/3 sm:w-1/2">
                            <div className="px-4 py-6 ">
                                <div className="flex justify-center transform transition duration-500 hover:scale-110">
                                    <img src="https://image2.jdomni.in/banner/13062021/3E/57/E8/1D6E23DD7E12571705CAC761E7_1623567977295.png?output-format=webp" className="w-32 mb-3" />
                                </div>
                                <h2 className="title-font font-regular text-xl text-gray-900">24/7 support</h2>
                                <p className='pt-1'>Track your order while it is delivered to your doorstep from the restaurant</p>
                            </div>
                        </div>



                        <div className="p-4 md:w-1/3 sm:w-1/2">
                            <div className="px-4 py-6 ">
                                <div className="flex justify-center transform transition duration-500 hover:scale-110">
                                    <img src="https://image3.jdomni.in/banner/13062021/EB/99/EE/8B46027500E987A5142ECC1CE1_1623567959360.png?output-format=webp" className="w-32 mb-3" />
                                </div>
                                <h2 className="title-font font-regular text-xl text-gray-900">Your Favorite Shop</h2>
                                <p className='pt-1'> Find the best and nearest top your favorite shops from your selected location.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <div className='px-4 lg:px-20 mt-8 bg-[#FCFCFC]'>
                <AppStore/>
            </div>
        </div>
    )
}

export default Service