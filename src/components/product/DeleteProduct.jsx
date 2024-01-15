import React, { forwardRef } from "react";

const DeleteProduct = forwardRef(
  ({ productName, cancelDelete, confirmDelete }, ref) => {
    return (
      <div className="form-container">
        <h3>Delete Product</h3>
        <p style={{ textAlign: "justify" }}>
          You sure you want to delete "{productName}" ?
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

export default DeleteProduct;
