import React, { forwardRef } from "react";
import Modal from "../modal/Modal";

const EditStock = forwardRef(({ formState, setFormState, onSubmit }, ref) => {
  return (
    <Modal
      isOpen={formState.status === "editStock"}
      onClose={() => setFormState({ status: "", formData: {} })}
    >
      <div className="form-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <h4>Edit Stock details:</h4>
          <div>
            <label>
              Product Name:
              <input
                ref={ref}
                type="text"
                placeholder="Product Name"
                value={formState.formData.productName}
                disabled
              />
            </label>
            <label>
              stock:
              <input
                type="number"
                placeholder="Stock"
                value={formState.formData.addStock}
                onChange={(e) => {
                  setFormState((prev) => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      addStock: parseFloat(e.target.value),
                    },
                  }));
                }}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Date:
              <input
                type="date"
                placeholder="Date"
                value={formState.formData.date.slice(0, 10)}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      date: e.target.value,
                    },
                  }))
                }
                required
              />
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit">Update Stock</button>
          </div>
        </form>
      </div>
    </Modal>
  );
});

export default EditStock;
