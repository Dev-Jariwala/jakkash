import React from "react";
import Modal from "../modal/Modal";

const NewProduct = ({ formState, setFormState, onSubmit }) => {
  return (
    <Modal
      isOpen={formState.status === "newProduct"}
      onClose={() => setFormState({ status: "", formData: {} })}
    >
      <div className="form-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <h4>Enter Product details:</h4>
          <div>
            <label>
              Product Name:
              <input
                type="text"
                placeholder="Product Name"
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
            </label>
            <label>
              Retail Price:
              <input
                type="number"
                placeholder="Retail Price"
                value={formState.formData.retailPrice}
                onChange={(e) => {
                  setFormState((prev) => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      retailPrice: parseFloat(e.target.value),
                    },
                  }));
                }}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Wholesale Price:
              <input
                type="number"
                placeholder="Wholesale Price"
                value={formState.formData.wholesalePrice}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      wholesalePrice: parseFloat(e.target.value),
                    },
                  }))
                }
                required
              />
            </label>
            <label>
              Stock:
              <input type="number" placeholder="Stock" value="0" disabled />
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit">Add Product</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewProduct;
