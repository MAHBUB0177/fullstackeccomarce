import React, { useEffect, useState } from "react";
import { Checkbox, Col, Row } from "antd";
import { FaCheck } from "react-icons/fa";
import Product from "./product";
import Pagination from "../common/paginate";
import { GetProductInfo } from "@/service/allApi";
import productData from "@/products.json";
import NodataFound from "./nodataFound";
import Loading from "./loading";

const CheckboxGroup = Checkbox.Group;

let categoryList = [
  { title: "Laptop", value: "laptop" },
  { title: "Phone", value: "phone" },
  { title: "Watch", value: "watch" },
  { title: "Key Pad", value: "key pad" },
];

type Color = "all" | "red" | "green" | "blue" | "slate" | "purple";

const colorClasses: Record<Color, string> = {
  all: "bg-gray-500 border-gray-500",
  red: "bg-red-500 border-red-500",
  green: "bg-green-500 border-green-500",
  blue: "bg-blue-500 border-blue-500",
  slate: "bg-slate-500 border-slate-500",
  purple: "bg-purple-500 border-purple-500",
};

const colorItem: { color: Color; value: Color }[] = [
  { color: "all", value: "all" },
  { color: "red", value: "red" },
  { color: "green", value: "green" },
  { color: "blue", value: "blue" },
  { color: "slate", value: "slate" },
  { color: "purple", value: "purple" },
];

interface ProductPageProps {
  setIsHide: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterProducts = ({ setIsHide }: ProductPageProps) => {
  const [isLoading, setIsloading] = useState(false);
  const [selectedColor, setSelectedColor] = useState("all");
  const [itemprice, setItemprice] = useState("highest");
  const [isbrand, setIsbrand] = useState("All");
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [productList, setProductList] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState();
  const [filteredProductCategory, setFilteredProductCategory] = useState<any[]>(
    []
  );
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [pageCount, setPageCount] = useState<number>(1);

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };
  const _handlePageClick = (data: { selected: number }) => {
    setCurrentPageNumber(data.selected + 1);
  };


  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const productData = localStorage.getItem('productData');
  //     if (productData) {
  //         setProductList(JSON.parse(productData));
  //     }
  //   }
  // }, []);
  
  const scrollToTop = () => {
    setIsHide(true);
    window.scrollTo({
      top: 30, // Change this value to 30 to stop scrolling at 30 pixels from the top
      behavior: "smooth",
    });
  };

  // // Get product data
  useEffect(() => {
    getAllProduct(currentPageNumber);
  }, [currentPageNumber]);

  const getAllProduct = async (currentPageNumber: number) => {
    setIsloading(true);
    try {
      await GetProductInfo(currentPageNumber, pageSize).then((res) => {
        setProductList(res?.data?.item);
        setPageCount(res?.data?.totalPage);
        setTotalResults(res?.data?.totalRecords);
        // setTimeout(() => {
        //   setIsloading(false);
        // }, 1000);
        setIsloading(false);
      });
    } catch (error) {
      setIsloading(false);
      // console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    categoryfilter();
  }, [productList, itemprice, checkedList, isbrand, selectedColor]);

  const categoryfilter = () => {
    let result = [...productList];
    // Apply sorting
    if (itemprice === "highest") {
      result.sort((a, b) => b?.price - a?.price);
    } else if (itemprice === "lowest") {
      result.sort((a, b) => a?.price - b?.price);
    } else if (itemprice === "a-z") {
      result.sort((a, b) => a?.productName.localeCompare(b?.productName));
    } else if (itemprice === "z-a") {
      result.sort((a, b) => b?.productName.localeCompare(a?.productName));
    }
    // Apply category filter
    if (checkedList.length > 0) {
      result = result.filter((product) =>
        checkedList.includes(product.category)
      );
    }
    // Apply brand filter
    if (isbrand !== "All") {
      result = result.filter((product) => product.brand === isbrand);
    }
    // Apply color filter
    if (selectedColor !== "all") {
      result = result.filter((product) => product.color === selectedColor);
    }
    setFilteredProductCategory(result);
  };

  const resetFilterList = () => {
    setItemprice("highest");
    setCheckedList([]);
    setIsbrand("All");
    setSelectedColor("all");
    setIsHide(false);
    window.scrollTo({
      top: 30, // Change this value to 30 to stop scrolling at 30 pixels from the top
      behavior: "smooth",
    });
    setFilteredProductCategory(productList);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-medium">Showing {totalResults} results</p>
        </div>
        <div className="flex justify-between ">
          <select
            id="pricingType"
            name="pricingType"
            onChange={(e) => setItemprice(e.target.value)}
            className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
          >
            <option value="highest">Price (highest)</option>
            <option value="lowest">Price (lowest)</option>
            <option value="a-z">Price (a-z)</option>
            <option value="z-a">Price (z-a)</option>
          </select>
        </div>
      </div>

      <div className="pt-8 flex justify-between pb-12 w-full gap-2">
        <div className="w-full top-[85px] sticky h-screen p-2 md:p-0 lg:w-1/5 hidden lg:block shadow-sm border-[1px] border-slate-200 bg-white rounded-md">
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
              className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
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
                    className={`w-5 h-5 cursor-pointer rounded-full flex items-center justify-center border-2 border-gray-300 ${
                      colorClasses[item.color]
                    } ${
                      selectedColor === item.value
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

        

<div className="w-full lg:w-4/5 rounded-md bg-white px-4 pb-5 shadow-sm border-[1px] border-slate-200">
  {isLoading ? (
    <div className="flex flex-grow justify-center items-center h-full">
      <Loading />
    </div>
  ) : (
    <>
      {filteredProductCategory?.length > 0 ? (
        <>
          <Product item={filteredProductCategory} />
          <div className="pt-5 flex justify-center items-center sticky top-20 z-10 bg-white">
            <Pagination
              pageCount={pageCount}
              forcePage={currentPageNumber - 1}
              onPageChange={_handlePageClick}
              scrollToTop={scrollToTop}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-grow justify-center items-center h-full">
          <NodataFound />
        </div>
      )}
    </>
  )}
</div>

      </div>
    </div>
  );
};

export default FilterProducts;
