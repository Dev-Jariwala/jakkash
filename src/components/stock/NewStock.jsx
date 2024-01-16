import React, { forwardRef } from "react";
import Modal from "../modal/Modal";

const Newstock = forwardRef(({ formState, setFormState, onSubmit }, ref) => {
  return (
    <Modal
      isOpen={formState.status === "addStock"}
      onClose={() => setFormState({ status: "", formData: {} })}
    >
      <div className="form-container">
        <form onSubmit={(e) => onSubmit(e, formState.formData)}>
          <h4>Enter Stock details:</h4>
          <div>
            <label>
              Product Name:
              <input
                type="text"
                placeholder="Product Name"
                value={formState.formData.productName}
                disabled
              />
            </label>
            <label>
              Stock:
              <input
                ref={ref}
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
                value={formState.formData.date}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      date: e.target.value,
                    },
                  }))
                }
              />
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit">Add Stock</button>
          </div>
        </form>
      </div>
    </Modal>
  );
});

export default Newstock;
