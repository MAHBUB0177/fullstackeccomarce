import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Checkbox, Col, Row } from 'antd';
import { FaCheck } from 'react-icons/fa';
import Product from './product';
import Pagination from '../common/paginate';
import { GetProductInfo } from '@/service/allApi';
import productData from "@/products.json"

const CheckboxGroup = Checkbox.Group;

let categoryList = [
  // { title: 'All', value: 'All' },
  { title: 'Laptop', value: 'laptop' },
  { title: 'Phone', value: 'phone' },
  { title: 'Watch', value: 'watch' },
  { title: 'Key Pad', value: 'key pad' },
];

type Color = 'all' | 'red' | 'green' | 'blue' | 'slate' | 'purple';

const colorClasses: Record<Color, string> = {
  all: 'bg-gray-500 border-gray-500',
  red: 'bg-red-500 border-red-500',
  green: 'bg-green-500 border-green-500',
  blue: 'bg-blue-500 border-blue-500',
  slate: 'bg-slate-500 border-slate-500',
  purple: 'bg-purple-500 border-purple-500',
};

const colorItem: { color: Color; value: Color }[] = [
  { color: 'all', value: 'all' },
  { color: 'red', value: 'red' },
  { color: 'green', value: 'green' },
  { color: 'blue', value: 'blue' },
  { color: 'slate', value: 'slate' },
  { color: 'purple', value: 'purple' },
];

interface ProductPageProps {
  setIsHide: React.Dispatch<React.SetStateAction<boolean>>;
}


const FilterProducts = ({ setIsHide }: ProductPageProps) => {
  const [selectedColor, setSelectedColor] = useState('all');
  const [itemprice, setItemprice] = useState('highest');
  const [item, setItem] = useState('All');
  const [checkedList, setCheckedList] = useState<string[]>([]);
  // console.log(checkedList,'checkedList++++')

  const [productList, setProductList] = useState<any[]>([]);
  const [filteredProductPrice, setFilteredProductPrice] = useState<any[]>([]);
  // console.log(filteredProductPrice,'++++++++++++filteredProductList')
  const [filteredProductCategory, setFilteredProductCategory] = useState<any[]>([]);
  // console.log(filteredProductCategory,'filteredProductCategory++++++++++++++')
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [pageCount, setPageCount] = useState<number>(1);
  // console.log(pageCount,'pageCount++++++++++++')

 
  const onChange = (list: string[]) => {
    setCheckedList(list);
  };
  const _handlePageClick = (data: { selected: number }) => {
    setCurrentPageNumber(data.selected + 1);
  };
 

  const scrollToTop = () => {
    setIsHide(true);
    window.scrollTo({
      top: 30, // Change this value to 30 to stop scrolling at 30 pixels from the top
      behavior: 'smooth',
    });
  };

  // // Get product data
  useEffect(() => {
    getAllProduct(currentPageNumber);
  }, [currentPageNumber]);

  const getAllProduct = async (currentPageNumber: number) => {
    try {
      await GetProductInfo(currentPageNumber, pageSize).then((res) => {
        setProductList(res?.data?.item);
        setPageCount(res?.data?.totalPage);
      });
    } catch (error) {
      // console.error('Error fetching products:', error);
    }
  };

   // Sorting and filtering logic
  //  useEffect(() => {
  //   let result = [...productList];
  //   // let result = [...productData]

  //   // Apply sorting
  //   if (itemprice === 'highest') {
  //     result.sort((a, b) => b?.price - a?.price);
  //   } 
  //   if (itemprice === 'lowest') {
  //     result.sort((a, b) => a?.price - b?.price);
  //   }
  //   if (itemprice === "a-z") {
  //     result.sort((a, b) => a?.productName.localeCompare(b?.productName));
  //   }
  //   if (itemprice === "z-a") {
  //     result.sort((a, b) => b?.productName.localeCompare(a?.productName));
  //   }

    

  //   setFilteredProductPrice(result);
  // }, [itemprice, productList]);

 
  // useEffect(() => {
  //   categoryfilter();
  // }, [checkedList]);

  // const categoryfilter = () => {
  //   // console.log('category filter is called');
  //   let filterList = [...filteredProductPrice];

  //   if (checkedList.length > 0) {
  //     filterList = filterList.filter(product => checkedList.includes(product.company));
  //     // console.log('Filtered product list:', filterList);
  //   } else {
  //     filterList = [...filteredProductPrice]; // Return all products if no category is selected
  //     // console.log('All products returned:', filterList);
  //     console.log('called else block')
  //   }

  //   setFilteredProductCategory(filterList);
  // };
  

  useEffect(() => {
    categoryfilter();
  }, [productList, itemprice, checkedList]);


  const categoryfilter = () => {
    let result = [...productList];

    // Apply sorting and price filtering
    if (itemprice === 'highest') {
      result.sort((a, b) => b?.price - a?.price);
    } else if (itemprice === 'lowest') {
      result.sort((a, b) => a?.price - b?.price);
    } else if (itemprice === "a-z") {
      result.sort((a, b) => a?.productName.localeCompare(b?.productName));
    } else if (itemprice === "z-a") {
      result.sort((a, b) => b?.productName.localeCompare(a?.productName));
    }

    // Apply category filter
    if (checkedList.length > 0) {
      result = result.filter(product => checkedList.includes(product.category));
    }

    setFilteredProductCategory(result);
  };
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-lg font-medium'>Showing {filteredProductPrice.length} results</p>
        </div>
        <div className='flex justify-between '>
          <select
            id='pricingType'
            name='pricingType'
            onChange={(e) => setItemprice(e.target.value)}
            className='w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider'
          >
            <option value='highest'>Price (highest)</option>
            <option value='lowest'>Price (lowest)</option>
            <option value='a-z'>Price (a-z)</option>
            <option value='z-a'>Price (z-a)</option>
          </select>
        </div>
      </div>

      <div className='pt-8 flex justify-between pb-12 w-full gap-2'>
        <div className='w-full top-[85px] sticky h-screen p-2 md:p-0 lg:w-1/5 hidden lg:block shadow-sm border-[1px] border-slate-200 bg-white rounded-md'>
          <div className='border-b-[1px] border-slate-200 flex justify-between items-center'>
            <p className='pt-2 pb-2 px-4'>Filter</p>
            <button className='p-1 h-[30px] mx-2 w-[70px] rounded-md bg-slate-300'>Reset</button>
          </div>

          {/* Filter by category */}
          <p className='pt-2 px-4'>Category</p>
          <div className='px-4 pb-5 pt-3'>
            <CheckboxGroup onChange={onChange}>
              <Row>
                {categoryList.map((category) => (
                  <Col span={24} key={category.value}>
                    <div className='p-1'>
                      <Checkbox value={category.value}>
                        <p className='text-[15px] text-slate-700'>{category.title}</p>
                      </Checkbox>
                    </div>
                  </Col>
                ))}
              </Row>
            </CheckboxGroup>
          </div>

          {/* Filter by Brands */}
          <p className='pt-2 px-4'>Brands</p>
          <div className='px-4 pb-5 pt-3'>
            <select
              id='brandType'
              name='brandType'
              onChange={(e) => setItem(e.target.value)}
              className='w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider'
            >
              <option value='All'>All</option>
              <option value='ASUS'>DELL</option>
              <option value='ASUS'>ASUS</option>
              <option value='Samsung'>Samsung</option>
              <option value='Nokia'>Nokia</option>
              <option value='Asus'>Asus</option>
            </select>
          </div>

          {/* Filter by color */}
          <p className='pt-2 px-4 pb-3'>Colors</p>
          <div className='flex justify-start px-2 pb-2'>
            {colorItem.map((item) => (
              <label key={item.value} className='relative flex items-center space-x-2 mb-2'>
                <input
                  type='radio'
                  name='color'
                  value={item.value}
                  className='hidden peer'
                  checked={selectedColor === item.value}
                  onChange={() => setSelectedColor(item.value)}
                />
                {item.value === 'all' ? (
                  <div className='text-gray-700 cursor-pointer'>All</div>
                ) : (
                  <div
                    className={`w-5 h-5 cursor-pointer rounded-full flex items-center justify-center border-2 border-gray-300 ${colorClasses[item.color]} ${
                      selectedColor === item.value ? 'peer-checked:border-white' : ''
                    }`}
                  >
                    {selectedColor === item.value && <FaCheck className='text-white w-3 h-3' />}
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className='w-full lg:w-4/5 rounded-md bg-white px-4 pb-5 shadow-sm border-[1px] sorder-slate-200'>
        
          <Product item={filteredProductCategory} />
          <div className='pt-5 flex justify-center items-center'>
            <Pagination
              pageCount={pageCount}
              forcePage={currentPageNumber - 1}
              onPageChange={_handlePageClick}
              scrollToTop={scrollToTop}
            />
          </div>
        </div>
      </div>

      <div>
        <p>efrhfurhufref jefurfre</p>
      </div>
    </div>
  );
};

export default FilterProducts;
