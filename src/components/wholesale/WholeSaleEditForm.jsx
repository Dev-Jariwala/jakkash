import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../store/productContext";
import axios from "axios";
import BACKEND_URL from "../../assets/BACKEND_URL";
import { StockContext } from "../../store/stockContext";
import { WholeSaleContext } from "../../store/wholeSaleBillContext";

const WholeSaleEditForm = ({
  setEditingBill,
  editRetailBill,
  setEditRetailBIll,
}) => {
  const { products, setProducts } = useContext(ProductsContext);
  const { setWholeSaleBills } = useContext(WholeSaleContext);
  const [billProducts, setBillProducts] = useState(editRetailBill.products);
  async function handleSubmit(e, retailBillId) {
    try {
      e.preventDefault();
      if (editRetailBill.totalDue < 0) {
        return alert("Total Due can not be Negative!");
      } else {
        await axios.put(
          `${BACKEND_URL}retail/update-retailbill/${retailBillId}`,
          {
            ...editRetailBill,
          },
          { withCredentials: true }
        );
        const response = await axios.get(
          `${BACKEND_URL}retail/fetch-allRetailbills`
        );
        setWholeSaleBills(response.data.retailBills.reverse());
        const res = await axios.get(`${BACKEND_URL}product/fetch-allProducts`);
        setProducts(res.data.products);
        setEditRetailBIll({
          BillNo: 0,
          orderDate: "",
          name: "",
          address: "",
          mobileNumber: 0,
          deliveryDate: "",
          products: [],
          totalFirki: 0,
          subTotal: 0,
          discount: 0,
          advance: 0,
          totalDue: 0,
        });
        setEditingBill(false);
      }
    } catch (error) {}
  }
  return (
    <div className="form-container bill">
      <h4>Edit Retail Bill details:</h4>
      <form onSubmit={(e) => handleSubmit(e, editRetailBill._id)}>
        <div className="form-row">
          <label>
            Bill No:
            <input
              type="number"
              placeholder="Bill No."
              value={editRetailBill.BillNo}
              disabled
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              placeholder="Date"
              value={
                editRetailBill.orderDate
                  ? editRetailBill.orderDate.slice(0, 10)
                  : ""
              }
              onChange={(e) =>
                setEditRetailBIll((prev) => {
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
              value={editRetailBill.name}
              onChange={(e) =>
                setEditRetailBIll((prev) => {
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
              value={editRetailBill.address}
              onChange={(e) =>
                setEditRetailBIll((prev) => {
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
              value={editRetailBill.mobileNumber}
              onChange={(e) =>
                setEditRetailBIll((prev) => {
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
              value={
                editRetailBill.deliveryDate
                  ? editRetailBill.deliveryDate.slice(0, 10)
                  : ""
              }
              onChange={(e) =>
                setEditRetailBIll((prev) => {
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
                let currProduct = editRetailBill.products.filter((product) => {
                  return product.productId === prod._id;
                });
                let orignalProduct = billProducts.filter((product) => {
                  return product.productId === prod._id;
                });
                const existingQuantity = currProduct[0]?.quantity || 0;
                const originalQuantity = orignalProduct[0]?.quantity || 0;
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
                      {prod.stock <= 0 && originalQuantity <= 0 ? (
                        <input
                          style={{ textAlign: "center" }}
                          type="text"
                          value={"Out of Stock"}
                          disabled
                        />
                      ) : (
                        <input
                          type="number"
                          placeholder="Qty"
                          value={currProduct[0]?.quantity}
                          onChange={(e) => {
                            const newQty =
                              parseInt(e.target.value) >= 0
                                ? parseInt(e.target.value)
                                : "";
                            setEditRetailBIll((prev) => {
                              const updatedProducts = prev.products.map(
                                (product) => {
                                  if (product.productId === prod._id) {
                                    if (
                                      prod.stock <= 0 &&
                                      originalQuantity > 0
                                    ) {
                                      return {
                                        ...product,
                                        quantity:
                                          newQty <= originalQuantity
                                            ? newQty
                                            : originalQuantity,
                                      };
                                    } else if (
                                      prod.stock > 0 &&
                                      originalQuantity > 0
                                    ) {
                                      return {
                                        ...product,
                                        quantity:
                                          newQty <=
                                          originalQuantity + prod.stock
                                            ? newQty
                                            : originalQuantity + prod.stock,
                                      };
                                    } else {
                                      return {
                                        ...product,
                                        quantity:
                                          newQty <= prod.stock
                                            ? newQty
                                            : prod.stock,
                                      };
                                    }
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
                                (acc, curr) => acc + curr.price * curr.quantity,
                                0
                              );
                              return {
                                ...prev,
                                products: updatedProducts,
                                subTotal: calculateValue,
                                totalDue:
                                  calculateValue - prev.discount - prev.advance,
                              };
                            });
                          }}
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
                            editRetailBill.products.find(
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
                      let totalQty = editRetailBill.products.reduce(
                        (acc, curr) => acc + curr.quantity,
                        0
                      );
                      setEditRetailBIll((prev) => {
                        return {
                          ...prev,
                          totalFirki: totalQty,
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
                      value={editRetailBill.totalFirki}
                      onChange={(e) => {
                        setEditRetailBIll((prev) => {
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
                      value={editRetailBill.subTotal}
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
                      value={editRetailBill.discount}
                      onChange={(e) => {
                        setEditRetailBIll((prev) => {
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
                              constSubTotal - enteredDiscount - prev.advance < 0
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
                      value={editRetailBill.advance}
                      onChange={(e) => {
                        const enteredAdvance =
                          parseInt(e.target.value) >= 0
                            ? parseInt(e.target.value)
                            : "";
                        setEditRetailBIll((prev) => {
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
                      value={editRetailBill.totalDue}
                      disabled
                    />
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit">Update Bill</button>
        </div>
      </form>
    </div>
  );
};

export default WholeSaleEditForm;
