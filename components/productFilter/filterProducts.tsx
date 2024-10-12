import React, { useEffect, useState } from "react";
import { Checkbox, Col, Row } from "antd";
import { FaCheck } from "react-icons/fa";
import Product from "./product";
import Pagination from "../common/paginate";
import { GetProductInfo, GetSearchProduct } from "@/service/allApi";
import NodataFound from "./nodataFound";
// import Loading from "./loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSearchData } from "@/reducer/searchReducer";
import CardLoading from "../landingPage/product/cardLoading";
import ProductLoading from "./productLoading";
import { BsFilterRight } from "react-icons/bs";
import CommonModal from "../common/commonModal";
import FilterProductSmallDevice from "./filterProductSmallDevice";
import { categoryList, colorClasses, colorItem } from "../common/commonList";

const CheckboxGroup = Checkbox.Group;







const FilterProducts = () => {
  const searchData = useSelector((state: RootState) => state.search.search);
  const dispatch = useDispatch();
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
  const [pageSize, setPageSize] = useState<number>(12);
  const [pageCount, setPageCount] = useState<number>(1);

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };


  const _handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected + 1; // Adjust to 1-based index
    setCurrentPageNumber(selectedPage); // Update state
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 30, // Change this value to 30 to stop scrolling at 30 pixels from the top
      behavior: "smooth",
    });
  };

  // Get product data
  const payload = {
    searchTerm: searchData ?? "", // Ensure searchTerm is explicitly treated as a string
  };
  const getAllProduct = async (currentPageNumber: number, payload: any) => {
    setIsloading(true);
    try {
      await GetSearchProduct(currentPageNumber, pageSize, payload).then(
        (res) => {
          setProductList(res?.data?.item);
          setPageCount(res?.data?.totalPage);
          setTotalResults(res?.data?.totalRecords);
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsloading(false);
      }, 2000);
    }
  };

  const Productsfilter = () => {
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
        checkedList.map(item => item.toLowerCase()).includes(product.category.toLowerCase())
      );
    }
    
    // Apply brand filter
    // if (isbrand !== "All") {
    //   result = result.filter((product) => product.brand === isbrand);
    // }
    if (isbrand.toLowerCase() !== "all") {
      result = result.filter((product) =>
        product.brand.toLowerCase() === isbrand.toLowerCase()
      );
    }
    
    // Apply color filter
    // if (selectedColor !== "all") {
    //   result = result.filter((product) => product.color === selectedColor);
    // }
    if (selectedColor.toLowerCase() !== "all") {
      result = result.filter((product) =>
        product.color.toLowerCase() === selectedColor.toLowerCase()
      );
    }
    
    setFilteredProductCategory(result);
  };

  const resetFilterList = () => {
    console.log('first')
    // Reset all filters
    setItemprice("highest");
    setCheckedList([]);
    setIsbrand("All");
    setSelectedColor("all");
    // Reset page to 1
    setCurrentPageNumber(1);
    // Scroll to the top of the page
    window.scrollTo({
      top: 30,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    if (Object.keys(searchData).length === 0) {
      // getAllProduct(1, payload);
      setCurrentPageNumber(1);
    } else {
      console.log("searchData has values");

    }
  }, [searchData]);

  useEffect(() => {
    Productsfilter();
  }, [productList, itemprice, checkedList, isbrand, selectedColor]);

  useEffect(() => {
    getAllProduct(currentPageNumber, payload);
  }, [currentPageNumber, searchData]);

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const _handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-4 md:pt-0">
        <div>
          <p className=" text-md md:text-lg font-medium">Showing {totalResults} results</p>
        </div>
        <div className="flex justify-between ">
          <select
            id="pricingType"
            name="pricingType"
            onChange={(e) => setItemprice(e.target.value)}
            className="w-[120px] md:w-full h-7 md:h-10 border-2 border-secondary focus:outline-none focus:border-secondary text-secondary rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
          >
            <option value="highest">Price (highest)</option>
            <option value="lowest">Price (lowest)</option>
            <option value="a-z">Price (a-z)</option>
            <option value="z-a">Price (z-a)</option>
          </select>
        </div>
        <div className="lg:hidden" onClick={() => setIsModalOpen(true)}>
          <BsFilterRight className="font-bold h-[30px] w-[40px] text-red-600" />
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
              className="w-full h-10 border-2 border-secondary focus:outline-none focus:border-secondary text-secondary rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            >
              <option value="All">All</option>
              <option value="HP">HP</option>
              <option value="DELL">DELL</option>
              <option value="ASUS">ASUS</option>
              <option value="Samsung">Samsung</option>
              <option value="Apple">IPHONE</option>
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

        <div className="w-full lg:w-4/5 rounded-md bg-white px-4 pb-5 shadow-sm border-[1px] border-slate-200">
          {isLoading ? (
            <div className="flex flex-grow justify-center items-center h-full">
              <ProductLoading />
            </div>
          ) : (
            <>
              {filteredProductCategory?.length > 0 ? (
                <>
                  <Product item={filteredProductCategory} />
                  <div className="pt-5 flex justify-center items-center sticky top-20 z-10 bg-white">
                    <Pagination
                      pageCount={pageCount}
                      forcePage={currentPageNumber - 1} // Adjust for zero-based index
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

      <CommonModal
        open={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={`FILTER`}
        onCancel={_handleCancel}
        width={"1000px"}
        bodyStyle={{
          height: '300px',      // Set the modal height
          overflowY: 'auto',     // Enable scrolling when content exceeds 300px
        }}
        
      >
       
        <FilterProductSmallDevice checkedList={checkedList} setSelectedColor={setSelectedColor} selectedColor={selectedColor} setIsbrand={setIsbrand} onChange={onChange} resetFilterList={resetFilterList}/>

      </CommonModal>
    </div>
  );
};

export default FilterProducts;
