import React, { useState } from 'react'
import classNames from 'classnames';
import { Checkbox, Col, Row } from 'antd';
import { FaCheck } from 'react-icons/fa';
import Product from './product';
// import Pagination from '../paginate';
import Pagination from '../common/paginate';
const CheckboxGroup = Checkbox.Group;



let categoryList = [
  { title: 'Phone', value: 'phpne' },
  { title: 'Laptop', value: 'laptop' },
  { title: 'Watch', value: 'watch' },
  { title: 'Key Pad', value: 'key pad' },
]


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





const FilterProducts = () => {
  const [selectedColor, setSelectedColor] = useState('all');
  console.log(selectedColor,'selectedColor')
  const [item, setItem] = useState('heighest')
  const [checkedList, setCheckedList] = useState<string[]>();
  const onChange = (list: string[]) => {
    setCheckedList(list);
  };
  let items = [1, 2, 3, 4, 5,6,7,8,9,1, 2, 3, 4, 5,6,7,8,9 ,9,7,6]
  //paginate
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const itemsPerPage: number = 9;
  const totalPages: number = 3

  const visibleItems = items.slice(
    (currentPageNumber - 1) * itemsPerPage,
    currentPageNumber * itemsPerPage
  );

  const _handlePageClick = (data: { selected: number }) => {
    console.log(data,"+++++++++++data")
    setCurrentPageNumber(data.selected + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 30, // Change this value to 30 to stop scrolling at 30 pixels from the top
      behavior: "smooth",
    });
  };
  
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-lg font-medium'>Showing 124 results</p>
        </div>
        <div className='flex justify-between '>
          <select id="pricingType" name="pricingType"
            onChange={(e) => setItem(e.target.value)}
            className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
            <option value="heighest" >Price(heighest)</option>
            <option value="lowest">Price(lowest)</option>
            <option value="atoz">Price(a-z)</option>
            <option value="ztoa">Price(z-a)</option>
          </select>
        </div>
      </div>

      

      <div className="pt-8 flex justify-between pb-12 w-full gap-2">
        <div className="w-full top-[85px] sticky h-screen p-2 md:p-0 lg:w-1/5  hidden lg:block shadow-sm border-[1px] border-slate-200 bg-white rounded-md">
        
        <div className='border-b-[1px] border-slate-200 flex justify-between items-center'>
             <p className='pt-2 pb-2 px-4'>Filter </p>
             <button className='p-1 h-[30px] mx-2 w-[70px] rounded-md  bg-slate-300'>Reset</button>
           </div>
 
           {/* //Filter by category */}
           <p className='pt-2 px-4'>Category </p>
           <div className='px-4 pb-5 pt-3'>
             <CheckboxGroup onChange={onChange} >
               <Row>
                 {categoryList.map((category) => (
                   <Col span={24} key={category.value}>
                     <div className='p-1 '>
                       <Checkbox value={category.value}><p className='text-[15px] text-slate-700'>{category.title}</p></Checkbox>
                     </div>
                   </Col>
 
                 ))}
               </Row>
             </CheckboxGroup>
           </div>
           

           {/* //Filter by Brands */}
           <p className='pt-2 px-4'>Brands </p>
           <div className='px-4 pb-5 pt-3'>
             <select id="pricingType" name="pricingType"
               onChange={(e) => setItem(e.target.value)}
               className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
               <option value="All" >All</option>
               <option value="Apple" >Apple</option>
               <option value="Sumsung">Sumsung</option>
               <option value="Dell">Dell</option>
               <option value="Nokia">Nokia</option>
               <option value="Asus">Asus</option>
             </select>
 
           </div>
 
            {/* //Filter by color */}
           <p className='pt-2 px-4 pb-3'>Colors </p>
           <div className="flex justify-start px-2 pb-2">
             {/* {colorItem.map((item) => (
               <label key={item.value} className="relative flex items-center space-x-2 mb-2">
                 <input
                   type="radio"
                   name="color"
                   value={item.value}
                   className={`hidden peer `}
                   checked={selectedColor === item.value}
                   onChange={() => setSelectedColor(item.value)}
                 />
                 {item.value == 'all' ? (
                   <div className="text-gray-700 cursor-pointer">All</div>
 
                 ) : (
                   <div
                     className={`w-5 h-5 cursor-pointer rounded-full bg-${item.color}-500 flex items-center justify-center border-2 border-gray-300 peer-checked:border-${item.color}-500`}
                   >
                     {selectedColor === item.value && <FaCheck className="text-white w-3 h-3" />}
                   </div>
                 )}
               </label>
             ))} */}

{colorItem.map((item) => (
        <label key={item.value} className="relative flex items-center space-x-2 mb-2">
          <input
            type="radio"
            name="color"
            value={item.value}
            className="hidden peer"
            checked={selectedColor === item.value}
            onChange={() => setSelectedColor(item.value)}
          />
          {item.value === 'all' ? (
            <div className="text-gray-700 cursor-pointer">All</div>
          ) : (
            <div
              className={`w-5 h-5 cursor-pointer rounded-full flex items-center justify-center border-2 border-gray-300 ${colorClasses[item.color]} ${
                selectedColor === item.value ? 'peer-checked:border-white' : ''
              }`}
            >
              {selectedColor === item.value && <FaCheck className="text-white w-3 h-3" />}
            </div>
          )}
        </label>
      ))}
 
           </div>
        
        </div>

        <div className="w-full lg:w-4/5  rounded-md bg-white px-4 pb-5 shadow-sm border-[1px] sorder-slate-200 ">
        <Product item={visibleItems}/>
        <div className='pt-5 flex justify-center items-center '>
            <Pagination
                pageCount={totalPages}
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
  )
}

export default FilterProducts