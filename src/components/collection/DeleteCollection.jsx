import React, { forwardRef, useState } from "react";

const DeleteCollection = forwardRef(
  ({ collectionName, cancelDelete, confirmDelete }, ref) => {
    const [cname, setCname] = useState("");
    return (
      <div className="form-container">
        <h2>Delete Collection</h2>
        <p style={{ textAlign: "justify" }}>
          To drop the collection "{collectionName}", type the collection name to
          confirm.
        </p>
        <input
          ref={ref}
          type="text"
          placeholder="Collection Name"
          value={cname}
          onChange={(e) => setCname(e.target.value)}
        />
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
          <button
            className={`btn danger ${cname !== collectionName && "disable"}`}
            onClick={confirmDelete}
            disabled={cname !== collectionName}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
);

export default DeleteCollection;
