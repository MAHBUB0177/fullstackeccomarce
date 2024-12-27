import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-row gap-4">
      <div className="w-20 h-20 rounded-full animate-spin border-y-8 border-solid border-green-500 border-t-transparent shadow-md"></div>
    </div>
  );
};

export default Loading;
