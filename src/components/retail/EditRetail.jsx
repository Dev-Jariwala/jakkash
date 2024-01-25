import React, { forwardRef, useContext, useState } from "react";
import { ProductsContext } from "../../store/productContext";
import { toast } from "react-toastify";

const EditRetail = forwardRef(({ formData, setFormState, onSubmit }, ref) => {
  const { products } = useContext(ProductsContext);
  const [billProducts, setBillProducts] = useState(formData.products);
  const releventProducts = products.filter(
    (prod) =>
      (prod.retailPrice > 0 && !prod.muted) ||
      (prod.muted &&
        billProducts.some(
          (billProduct) =>
            billProduct.productId === prod._id && billProduct.quantity > 0
        ))
  );
  return (
    <div className="pt-3 px-3">
      <form
        className="my-4"
        onSubmit={(e) => onSubmit(e, formData._id, formData)}
      >
        <div className="grid md:grid-cols-5 md:gap-6">
          {/* Bill NO. */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              placeholder=" "
              className="block py-2.5 px-0 w-full cursor-not-allowed text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              disabled
            />
            <label className="peer-focus:font-medium pl-3   absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {`Bill No. ${formData.BillNo}`}
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-6">
          {/* Mobile No. */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              ref={ref}
              value={formData.mobileNumber}
              onChange={(e) =>
                setFormState((prev) => {
                  return {
                    ...prev,
                    formData: {
                      ...prev.formData,
                      mobileNumber:
                        parseInt(e.target.value) >= 0
                          ? parseInt(e.target.value)
                          : "",
                    },
                  };
                })
              }
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Mobile Number
            </label>
          </div>
          {/* Name */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.name}
              onChange={(e) =>
                setFormState((prev) => {
                  return {
                    ...prev,
                    formData: {
                      ...prev.formData,
                      name: String(e.target.value),
                    },
                  };
                })
              }
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Name:
            </label>
          </div>
          {/* Address */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.address}
              onChange={(e) =>
                setFormState((prev) => {
                  return {
                    ...prev,
                    formData: {
                      ...prev.formData,
                      address: String(e.target.value),
                    },
                  };
                })
              }
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Address:
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-6 mb-2">
          {/* orderDate */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.orderDate.slice(0, 10)}
              onChange={(e) =>
                setFormState((prev) => {
                  return {
                    ...prev,
                    formData: { ...prev.formData, orderDate: e.target.value },
                  };
                })
              }
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Date:
            </label>
          </div>
          {/* Delivery Date */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.deliveryDate.slice(0, 10)}
              onChange={(e) =>
                setFormState((prev) => {
                  return {
                    ...prev,
                    formData: {
                      ...prev.formData,
                      deliveryDate: e.target.value,
                    },
                  };
                })
              }
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Delivery Date:
            </label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Stock
                </th>
                <th scope="col" className="px-4 py-3">
                  Rate
                </th>
                <th scope="col" className="px-4 py-3">
                  Qty
                </th>
                <th scope="col" className="px-4 py-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {releventProducts.map((prod) => {
                let currProduct = formData.products.filter((product) => {
                  return product.productId === prod._id;
                });
                let orignalProduct = billProducts.filter((product) => {
                  return product.productId === prod._id;
                });
                const originalQuantity = orignalProduct[0]?.quantity || 0;
                return (
                  <tr key={prod._id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={prod.productName}
                        disabled
                      />
                    </td>
                    <td className="px-4 py-3">
                      {" "}
                      <input
                        type="number"
                        className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={prod.stock}
                        disabled
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={prod.retailPrice}
                        disabled
                      />
                    </td>
                    <td>
                      {prod.stock <= 0 && originalQuantity <= 0 ? (
                        <input
                          style={{ textAlign: "center" }}
                          type="text"
                          className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={"Out of Stock"}
                          disabled
                        />
                      ) : (
                        <input
                          type="number"
                          placeholder="Qty"
                          value={currProduct[0]?.quantity}
                          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => {
                            const newQty =
                              parseInt(e.target.value) >= 0
                                ? parseInt(e.target.value)
                                : "";
                            setFormState((prev) => {
                              const updatedProducts =
                                prev.formData.products.map((product) => {
                                  if (product.productId === prod._id) {
                                    if (
                                      (prod.stock <= 0 &&
                                        originalQuantity > 0 &&
                                        newQty <= originalQuantity) ||
                                      (prod.stock > 0 &&
                                        originalQuantity > 0 &&
                                        newQty <=
                                          originalQuantity + prod.stock) ||
                                      newQty <= prod.stock
                                    ) {
                                      return {
                                        ...product,
                                        quantity: newQty,
                                      };
                                    } else {
                                      toast.warn("Insufficiant Stock");
                                      alert("Insufficient stock!");
                                      return {
                                        ...product,
                                        quantity: "",
                                      };
                                    }
                                  }
                                  return product;
                                });

                              const existingProduct = updatedProducts.find(
                                (product) => product.productId === prod._id
                              );
                              if (!existingProduct) {
                                updatedProducts.push({
                                  productId: prod._id,
                                  productName: prod.productName,
                                  price: prod.retailPrice,
                                  quantity: newQty,
                                });
                              }
                              let calculateValue = updatedProducts.reduce(
                                (acc, curr) => acc + curr.price * curr.quantity,
                                0
                              );
                              return {
                                ...prev,
                                formData: {
                                  ...prev.formData,
                                  products: updatedProducts,
                                  subTotal: calculateValue,
                                  totalDue:
                                    calculateValue -
                                    prev.formData.discount -
                                    prev.formData.advance,
                                },
                              };
                            });
                          }}
                        />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {" "}
                      <input
                        type="number"
                        className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Total"
                        value={
                          prod.retailPrice *
                            formData.products.find(
                              (p) => p.productId === prod._id
                            )?.quantity || 0
                        }
                        disabled
                      />
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      let totalQty = formData.products.reduce(
                        (acc, curr) => acc + curr.quantity,
                        0
                      );
                      setFormState((prev) => {
                        return {
                          ...prev,
                          formData: { ...prev.formData, totalFirki: totalQty },
                        };
                      });
                    }}
                    className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Calculate
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3">
                  <label>
                    Total Firki
                    <input
                      type="number"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={formData.totalFirki}
                      onChange={(e) => {
                        setFormState((prev) => {
                          return {
                            ...prev,
                            formData: {
                              ...prev.formData,
                              totalFirki:
                                parseInt(e.target.value) >= 0
                                  ? parseInt(e.target.value)
                                  : "",
                            },
                          };
                        });
                      }}
                      required
                    />
                  </label>
                </td>
                <td className="px-4 py-3">
                  <label>
                    Sub Total
                    <input
                      type="number"
                      className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={formData.subTotal}
                      disabled
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3">
                  {" "}
                  <label>
                    Discount
                    <input
                      type="number"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={formData.discount}
                      onChange={(e) => {
                        setFormState((prev) => {
                          const constSubTotal = parseFloat(
                            prev.formData.products.reduce(
                              (acc, curr) => acc + curr.price * curr.quantity,
                              0
                            )
                          );
                          const enteredDiscount =
                            parseFloat(e.target.value) >= 0
                              ? parseFloat(e.target.value)
                              : "";
                          return {
                            ...prev,
                            formData: {
                              ...prev.formData,
                              discount:
                                enteredDiscount + prev.formData.advance <=
                                constSubTotal
                                  ? enteredDiscount
                                  : constSubTotal - prev.formData.advance,

                              totalDue:
                                constSubTotal -
                                  enteredDiscount -
                                  prev.formData.advance <
                                0
                                  ? 0
                                  : constSubTotal -
                                    prev.formData.advance -
                                    enteredDiscount,
                            },
                          };
                        });
                      }}
                      required
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3">
                  <label>
                    Advance
                    <input
                      type="number"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={formData.advance}
                      onChange={(e) => {
                        const enteredAdvance =
                          parseInt(e.target.value) >= 0
                            ? parseInt(e.target.value)
                            : "";
                        setFormState((prev) => {
                          return {
                            ...prev,
                            formData: {
                              ...prev.formData,
                              advance:
                                enteredAdvance + prev.formData.discount <=
                                prev.formData.subTotal
                                  ? enteredAdvance
                                  : prev.formData.subTotal -
                                    prev.formData.discount,
                              totalDue:
                                enteredAdvance + prev.formData.discount >=
                                prev.formData.subTotal
                                  ? 0
                                  : prev.formData.subTotal -
                                    prev.formData.discount -
                                    enteredAdvance,
                            },
                          };
                        });
                      }}
                      required
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3">
                  <label>
                    Total Due
                    <input
                      className="block w-full p-2 text-black font-semibold border-2 opacity-50 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      value={formData.totalDue}
                      disabled
                      // required
                    />
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Save Bill No. {formData.BillNo}
          </button>
        </div>
      </form>
    </div>
  );
});

export default EditRetail;
