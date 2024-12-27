'use client'
import FilterProducts from '@/components/productFilter/filterProducts';
import React from 'react'

interface ProductPageProps {
  hide:boolean
  setIsHide: React.Dispatch<React.SetStateAction<boolean>>;
}

const Product = () => {
  return (
    <div className={'px-4 lg:px-20'}>
        <FilterProducts />
    </div>
  )
}

export default Product;