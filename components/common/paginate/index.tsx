import React from "react";
// import ReactPaginate from "react-paginate";

interface PaginationProps {
    pageCount: number;
    forcePage: number;
    onPageChange: (selectedItem: { selected: number }) => void;
    scrollToTop: () => void;
  }

const Pagination = ({ pageCount, forcePage, onPageChange ,scrollToTop}:PaginationProps) => {
    console.log(pageCount,forcePage,'++++++++++++')
  return (
    <>
    <div className="flex justify-between pagination px-4 py-1 ml-2">
     
      <div className="flex space-x-2 items-center">
        <button
          disabled={forcePage === 0}
          onClick={() => {
            onPageChange({ selected: forcePage - 1 });
            scrollToTop()
          }}
          className="border border-gray-300 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer"
        >
          {"<"}
        </button>

        {[...Array(pageCount)].map((_, index) => (
          <span
            key={index}
            className={`${
              index === forcePage
                ? "bg-bgsecondarylight rounded-full text-white h-8 w-8 flex justify-center items-center cursor-pointer"
                : "border border-gray-300 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer"
            }`}
            onClick={() => {onPageChange({ selected: index });scrollToTop()}}
          >
            {index + 1}
          </span>
        ))}

        <button
          disabled={forcePage === pageCount - 1}
          onClick={() => {onPageChange({ selected: forcePage + 1 });scrollToTop()}}
          className="border border-gray-300 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer"
        >
          {">"}
        </button>
      </div>
    </div>
    
      
    </>
  );
};

export default Pagination;
