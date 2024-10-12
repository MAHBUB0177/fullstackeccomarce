import React from 'react'

const CardLoading = () => {
  const productList = [1, 2, 3, 4, 5]
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 py-4">
        {
          productList.map((item, i) => (
            <div className="rounded-md border-2 border-slate-100 mx-1 cursor-pointer p-1" key={i}>
              <div className="bg-white flex justify-between items-center py-2">
                <div className="text-sm font-medium">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-1"></div>
                  {/* <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div> */}
                </div>
              </div>

              <div
                role="status"
                className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
              >
                {/* <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                </svg> */}

                <svg className="h-12 w-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" aria-hidden="true"
                  fill="currentColor" aria-label="Loading Icon">
                  <path
                    d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>

              <div className="p-2 py-3">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                <div className='flex justify-between gap-3'>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mb-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mb-4"></div>
                </div>

              </div>
            </div>

          ))
        }
      </div>
    </div>
  )
}

export default CardLoading;