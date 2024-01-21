import React, { forwardRef, useContext, useEffect } from "react";
import { ProductsContext } from "../../store/productContext";
import { toast } from "react-toastify";
import { ClientContext } from "../../store/clientContext";

const NewRetail = forwardRef(({ formState, setFormState, onSubmit }, ref) => {
  let formData = formState.formData;
  const { products } = useContext(ProductsContext);
  const { clients } = useContext(ClientContext);
  useEffect(() => {
    // Function to check if mobile number matches any previous bills
    const findClient = (mobileNumber) => {
      const Client = clients.find(
        (client) => client.mobileNumber === mobileNumber
      );

      if (Client) {
        // Update the form state with the matched Name and Address
        setFormState((prev) => ({
          ...prev,
          formData: {
            ...prev.formData,
            name: Client.name,
            address: Client.address,
          },
        }));
      }
    };

    if (
      formState.status === "newRetail" &&
      String(formData.mobileNumber).length === 10
    ) {
      // Call the function when mobileNumber changes
      findClient(formData.mobileNumber);
    } else {
      setFormState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          name: "",
          address: "",
        },
      }));
    }
  }, [formData.mobileNumber, setFormState]);
  return (
    <div className="form-container bill">
      <h4>Enter Retail Bill details:</h4>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-row">
          <label>
            Bill No:
            <input
              type="number"
              placeholder="Bill No."
              value={formData.BillNo}
              disabled
            />
          </label>
          <label>
            Mobile No.:
            <input
              type="number"
              placeholder="Mobile No."
              ref={ref}
              value={formData.mobileNumber}
              onChange={(e) =>
                setFormState((prev) => {
                  return {
                    ...prev,
                    formData: {
                      ...prev.formData,
                      mobileNumber: parseInt(e.target.value),
                    },
                  };
                })
              }
              required
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Name:
            <input
              type="text"
              placeholder="Name"
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
          </label>
          <label>
            Address:
            <input
              type="text"
              placeholder="Address"
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
          </label>
        </div>
        <div className="form-row">
          <label>
            Date:
            <input
              type="date"
              placeholder="Date"
              value={formData.orderDate}
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
          </label>

          <label>
            Delivery Date:
            <input
              type="date"
              value={formData.deliveryDate}
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
          </label>
        </div>
        <div className="products-details">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Stock</th>
                <th>Rate</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => {
                return (
                  <tr key={prod._id}>
                    <td>
                      <input type="text" value={prod.productName} disabled />
                    </td>
                    <td>
                      {" "}
                      <input type="number" value={prod.stock} disabled />
                    </td>
                    <td>
                      <input type="number" value={prod.retailPrice} disabled />
                    </td>
                    <td>
                      {prod.stock > 0 ? (
                        <input
                          type="number"
                          placeholder="Qty"
                          value={
                            formData.products.find(
                              (product) => product.productId === prod._id
                            )?.quantity
                          }
                          onChange={(e) => {
                            const newQty =
                              parseInt(e.target.value) >= 0
                                ? parseInt(e.target.value)
                                : "";

                            setFormState((prev) => {
                              const updatedProducts =
                                prev.formData.products.map((product) => {
                                  if (product.productId === prod._id) {
                                    if (newQty > prod.stock) {
                                      toast.warn("Insufficient Quantity!");
                                      return {
                                        ...product,
                                        quantity: "",
                                      };
                                    } else {
                                      return {
                                        ...product,
                                        quantity: newQty,
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
                      ) : (
                        <input
                          style={{ textAlign: "center" }}
                          type="text"
                          value={"Out of Stock"}
                          disabled
                        />
                      )}
                    </td>
                    <td>
                      {" "}
                      <input
                        type="number"
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
                <td></td>
                <td></td>
                <td></td>
                <td>
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
                    className="calculate"
                  >
                    Calculate
                  </button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <label>
                    Total Firki
                    <input
                      type="number"
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
                <td>
                  <label>
                    Sub Total
                    <input type="number" value={formData.subTotal} disabled />
                  </label>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  {" "}
                  <label>
                    Discount
                    <input
                      type="number"
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
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <label>
                    Advance
                    <input
                      type="number"
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
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <label>
                    Total Due
                    <input
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit">Generate</button>
        </div>
      </form>
    </div>
  );
});

export default NewRetail;
