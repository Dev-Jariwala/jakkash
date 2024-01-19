import React, { useContext, useState } from "react";
import { ProductsContext } from "../../store/productContext";
import axios from "axios";
import BACKEND_URL from "../../assets/BACKEND_URL";
import { WholeSaleContext } from "../../store/wholeSaleBillContext";
const WholeSaleForm = ({ setCreatingBill, setShowPDF }) => {
  const { products, setProducts } = useContext(ProductsContext);
  const { wholeSaleBills, setWholeSaleBills } = useContext(WholeSaleContext);
  const [newRetailBill, setNewRetailBill] = useState({
    BillNo: wholeSaleBills.length + 1,
    orderDate: "",
    name: "",
    address: "",
    mobileNumber: "",
    deliveryDate: "",
    products: [],
    totalFirki: "",
    subTotal: 0,
    discount: 0,
    advance: 0,
    totalDue: 0,
  });

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      if (newRetailBill.totalDue < 0) {
        return alert("Total Due cannot be Negative!");
      } else {
        await axios.post(
          `${BACKEND_URL}wholesale/create-wholeSaleBill`,
          {
            ...newRetailBill,
          },
          { withCredentials: true }
        );
        const response = await axios.get(
          `${BACKEND_URL}wholesale/fetch-allWholeSaleBills`
        );
        setWholeSaleBills(response.data.wholeSaleBills.reverse());
        const res = await axios.get(`${BACKEND_URL}product/fetch-allProducts`);
        setProducts(res.data.products);
        setNewRetailBill({
          BillNo: wholeSaleBills.length + 1,
          orderDate: "",
          name: "",
          address: "",
          mobileNumber: "",
          deliveryDate: "",
          products: [],
          totalFirki: "",
          subTotal: 0,
          discount: 0,
          advance: 0,
          totalDue: 0,
        });
        setCreatingBill(false);
        setShowPDF((prev) => {
          return { ...prev, status: true, bill: newRetailBill };
        });
      }
    } catch (error) {}
  }
  return (
    <>
      <div className="form-container bill">
        <h4>Enter WholeSale Bill details:</h4>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-row">
            <label>
              Bill No:
              <input
                type="number"
                placeholder="Bill No."
                value={newRetailBill.BillNo}
                disabled
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                placeholder="Date"
                value={newRetailBill.orderDate}
                onChange={(e) =>
                  setNewRetailBill((prev) => {
                    return { ...prev, orderDate: e.target.value };
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
                value={newRetailBill.name}
                onChange={(e) =>
                  setNewRetailBill((prev) => {
                    return { ...prev, name: String(e.target.value) };
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
                value={newRetailBill.address}
                onChange={(e) =>
                  setNewRetailBill((prev) => {
                    return { ...prev, address: String(e.target.value) };
                  })
                }
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Mobile No.:
              <input
                type="number"
                placeholder="Mobile No."
                value={newRetailBill.mobileNo}
                onChange={(e) =>
                  setNewRetailBill((prev) => {
                    return { ...prev, mobileNumber: parseInt(e.target.value) };
                  })
                }
                required
              />
            </label>
            <label>
              Delivery Date:
              <input
                type="date"
                value={newRetailBill.deliveryDate}
                onChange={(e) =>
                  setNewRetailBill((prev) => {
                    return { ...prev, deliveryDate: e.target.value };
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
                        <input
                          type="number"
                          value={prod.wholesalePrice}
                          disabled
                        />
                      </td>
                      <td>
                        {prod.stock > 0 ? (
                          <input
                            type="number"
                            placeholder="Qty"
                            value={
                              newRetailBill.products.find(
                                (product) => product.productId === prod._id
                              )?.quantity
                            }
                            onChange={(e) => {
                              const newQty =
                                parseInt(e.target.value) >= 0
                                  ? parseInt(e.target.value)
                                  : "";
                              setNewRetailBill((prev) => {
                                const updatedProducts = prev.products.map(
                                  (product) => {
                                    if (product.productId === prod._id) {
                                      return {
                                        ...product,
                                        quantity:
                                          newQty <= prod.stock
                                            ? newQty
                                            : prod.stock,
                                      };
                                    }
                                    return product;
                                  }
                                );

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
                                  (acc, curr) =>
                                    acc + curr.price * curr.quantity,
                                  0
                                );
                                return {
                                  ...prev,
                                  products: updatedProducts,
                                  subTotal: calculateValue,
                                  totalDue:
                                    calculateValue -
                                    prev.discount -
                                    prev.advance,
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
                              newRetailBill.products.find(
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
                        let totalQty = newRetailBill.products.reduce(
                          (acc, curr) => acc + curr.quantity,
                          0
                        );
                        setNewRetailBill((prev) => {
                          return { ...prev, totalFirki: totalQty };
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
                        value={newRetailBill.totalFirki}
                        onChange={(e) => {
                          setNewRetailBill((prev) => {
                            return {
                              ...prev,
                              totalFirki:
                                parseInt(e.target.value) >= 0
                                  ? parseInt(e.target.value)
                                  : "",
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
                      <input
                        type="number"
                        value={newRetailBill.subTotal}
                        disabled
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
                    {" "}
                    <label>
                      Discount
                      <input
                        type="number"
                        value={newRetailBill.discount}
                        onChange={(e) => {
                          setNewRetailBill((prev) => {
                            const constSubTotal = parseFloat(
                              prev.products.reduce(
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
                              discount:
                                enteredDiscount + prev.advance <= constSubTotal
                                  ? enteredDiscount
                                  : constSubTotal - prev.advance,

                              totalDue:
                                constSubTotal - enteredDiscount - prev.advance <
                                0
                                  ? 0
                                  : constSubTotal -
                                    prev.advance -
                                    enteredDiscount,
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
                        value={newRetailBill.advance}
                        onChange={(e) => {
                          const enteredAdvance =
                            parseInt(e.target.value) >= 0
                              ? parseInt(e.target.value)
                              : "";
                          setNewRetailBill((prev) => {
                            return {
                              ...prev,
                              advance:
                                enteredAdvance + prev.discount <= prev.subTotal
                                  ? enteredAdvance
                                  : prev.subTotal - prev.discount,
                              totalDue:
                                enteredAdvance + prev.discount >= prev.subTotal
                                  ? 0
                                  : prev.subTotal -
                                    prev.discount -
                                    enteredAdvance,
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
                        value={newRetailBill.totalDue}
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
    </>
  );
};

export default WholeSaleForm;
