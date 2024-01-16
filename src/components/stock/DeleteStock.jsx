import React, { forwardRef } from "react";

const DeleteStock = forwardRef(
  ({ formData, cancelDelete, confirmDelete }, ref) => {
    return (
      <div className="form-container">
        <h3>Delete Stock</h3>
        <p style={{ textAlign: "justify" }}>
          Delete "{formData.addStock}" stock added to product "
          {formData.productName}" ?
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            marginTop: "20px",
          }}
        >
          <button className="btn primary" onClick={cancelDelete}>
            Cancle
          </button>
          <button className="btn danger" onClick={confirmDelete} ref={ref}>
            Delete
          </button>
        </div>
      </div>
    );
  }
);

export default DeleteStock;
