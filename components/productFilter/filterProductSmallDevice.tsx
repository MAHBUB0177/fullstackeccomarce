import { Checkbox, Col, Row } from 'antd';
import React from 'react'
import { categoryList, colorClasses, colorItem } from '../common/commonList';
import { FaCheck } from 'react-icons/fa';


const CheckboxGroup = Checkbox.Group;

interface FilterProductSmallDeviceProps {
    checkedList: string[]; // Array of strings for checkedList
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>; // String for selectedColor
    selectedColor:string;
    setIsbrand: React.Dispatch<React.SetStateAction<string>>; // Function to update isbrand state
    onChange: (list: string[]) => void; // Function that accepts a string array
    resetFilterList:()=>void;
  }
  

const FilterProductSmallDevice = ({checkedList,setSelectedColor,selectedColor,setIsbrand,onChange,resetFilterList}:FilterProductSmallDeviceProps) => {
  return (
    <div>

        <div className="w-full top-[85px]  h-screen p-2   shadow-sm border-[1px] border-slate-200 bg-white rounded-md">
          <div className="border-b-[1px] border-slate-200 flex justify-between items-center">
            <p className="pt-2 pb-2 px-4">Filter</p>
            <button
              className="p-1 h-[30px] mx-2 w-[70px] rounded-md bg-slate-300"
              onClick={() => resetFilterList()}
            >
              Reset
            </button>
          </div>

          {/* Filter by category */}
          <p className="pt-2 px-4">Category</p>
          <div className="px-4 pb-5 pt-3">
            <CheckboxGroup onChange={onChange} value={checkedList}>
              <Row>
                {categoryList.map((category) => (
                  <Col span={24} key={category.value}>
                    <div className="p-1">
                      <Checkbox value={category.value}>
                        <p className="text-[15px] text-slate-700">
                          {category.title}
                        </p>
                      </Checkbox>
                    </div>
                  </Col>
                ))}
              </Row>
            </CheckboxGroup>
          </div>

          {/* Filter by Brands */}
          <p className="pt-2 px-4">Brands</p>
          <div className="px-4 pb-5 pt-3">
            <select
              id="brandType"
              name="brandType"
              onChange={(e) => setIsbrand(e.target.value)}
              className="w-full h-10 border-2 border-secondary focus:outline-none focus:border-secondary text-secondary rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            >
              <option value="All">All</option>
              <option value="HP">HP</option>
              <option value="DELL">DELL</option>
              <option value="ASUS">ASUS</option>
              <option value="Samsung">Samsung</option>
              <option value="IPHONE">IPHONE</option>
            </select>
          </div>

          {/* Filter by color */}
          <p className="pt-2 px-4 pb-3">Colors</p>
          <div className="flex justify-start px-2 pb-2">
            {colorItem.map((item) => (
              <label
                key={item.value}
                className="relative flex items-center space-x-2 mb-2"
              >
                <input
                  type="radio"
                  name="color"
                  value={item.value}
                  className="hidden peer"
                  checked={selectedColor === item.value}
                  onChange={() => setSelectedColor(item.value)}
                />
                {item.value === "all" ? (
                  <div className="text-gray-700 cursor-pointer">All</div>
                ) : (
                  <div
                    className={`w-5 h-5 cursor-pointer rounded-full flex items-center justify-center border-2 border-gray-300 ${colorClasses[item.color]
                      } ${selectedColor === item.value
                        ? "peer-checked:border-white"
                        : ""
                      }`}
                  >
                    {selectedColor === item.value && (
                      <FaCheck className="text-white w-3 h-3" />
                    )}
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>
    </div>
  )
}

export default FilterProductSmallDevice;