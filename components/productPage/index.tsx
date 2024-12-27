'use client'
import React from 'react'
import FilterProducts from './filterProducts'

interface ProductPageProps {
  hide:boolean
  setIsHide: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductPage = ({setIsHide,hide}:ProductPageProps) => {
  return (
    <div className={hide ? 'pt-0' : 'pt-10'}>
        <FilterProducts setIsHide={setIsHide}/>
    </div>
  )
}

export default ProductPage