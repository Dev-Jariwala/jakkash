import React, { forwardRef } from "react";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";

const EditProduct = forwardRef(({ formState, setFormState, onSubmit }, ref) => {
  return (
    <Modal
      isOpen={formState.status === "editProduct"}
      onClose={() => setFormState({ status: "", formData: {} })}
      title={"Edit Product : "}
    >
      <div className="pt-3 px-3">
        <form
          className="max-w-md mx-auto my-4"
          onSubmit={(e) =>
            onSubmit(e, formState.formData._id, {
              productName: formState.formData.productName,
              retailPrice: formState.formData.retailPrice,
              wholesalePrice: formState.formData.wholesalePrice,
            })
          }
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              ref={ref}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formState.formData.productName}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  formData: {
                    ...prev.formData,
                    productName: String(e.target.value),
                  },
                }))
              }
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Product Name
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formState.formData.retailPrice}
                onChange={(e) => {
                  setFormState((prev) => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      retailPrice: parseFloat(e.target.value)
                        ? parseFloat(e.target.value)
                        : "",
                    },
                  }));
                }}
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Retail Price
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formState.formData.wholesalePrice}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      wholesalePrice: parseFloat(e.target.value)
                        ? parseFloat(e.target.value)
                        : "",
                    },
                  }))
                }
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Wholesale Price
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              placeholder=" "
              className="block py-2.5 px-0 rounded-lg w-full text-sm bg-gray-200 opacity-50 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              disabled
            />
            <label className="peer-focus:font-medium pl-3  absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Stock = {formState.formData.stock}
            </label>

            <div
              className="bg-yellow-50 mt-2 border border-yellow-200 text-sm text-yellow-600 rounded-lg p-4 dark:bg-white/[.05] dark:border-white/10 dark:text-gray-400"
              role="alert"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="flex-shrink-0 h-4 w-4 mt-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <div className="flex-1 md:flex md:justify-between ms-2">
                  <p className="text-sm">
                    Stock is{" "}
                    <span className="font-semibold">uneditable directly</span>,
                    for corrections, use the{" "}
                    <Link
                      to={"/stocks"}
                      className="font-semibold underline hover:no-underline"
                    >
                      Stock table
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save product
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
});

export default EditProduct;
