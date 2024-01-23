import React, { forwardRef } from "react";

const DeleteProduct = forwardRef(
  ({ productName, cancelDelete, confirmDelete }, ref) => {
    return (
      <div className="px-4 pt-3 w-[500px]">
        <div
          class="flex flex-col p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <div className="flex items-center">
            <span className="material-icons text-m mr-2">warning</span>
            <span class="font-bold text-m">Warning!</span>
          </div>

          <div className="mt-2 text-justify">
            By deleting <span className="font-semibold">"{productName}"</span>,
            associated <span className="font-semibold">stocks</span> will also
            be permanently deleted.
          </div>
        </div>
        <div className="flex items-center justify-end mt-5">
          <button
            type="button"
            onClick={cancelDelete}
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Cancle
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            ref={ref}
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
);

export default DeleteProduct;
