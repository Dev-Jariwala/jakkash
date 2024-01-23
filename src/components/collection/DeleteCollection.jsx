import React, { forwardRef, useState } from "react";

const DeleteCollection = forwardRef(
  ({ collectionName, cancelDelete, confirmDelete }, ref) => {
    const [cname, setCname] = useState("");
    return (
      <div className="px-4 pt-3 w-[500px]">
        <div className="text-sm *:dark:text-gray-300"></div>
        <div
          class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="material-icons mr-2">warning</span>

          <div>
            <span class="font-medium">Droping {collectionName}!</span> ,
            Unexpected bad things can happen if you don’t read this!
          </div>
        </div>
        <div className="text-sm text-justify">
          This action <span className="font-semibold">CANNOT</span> be undone.
          This will permanently delete the{" "}
          <span className="font-semibold">Products</span>,{" "}
          <span className="font-semibold">Stocks</span>, and{" "}
          <span className="font-semibold">Bills</span> from database.
        </div>
        <div className="text-sm text-justify my-2">
          <span className="font-semibold">
            Please type in the name of the collection to confirm.
          </span>
        </div>
        <input
          type="text"
          ref={ref}
          className={`border text-sm rounded-lg  block w-full p-2.5
          }`}
          placeholder="Example 2020"
          alue={cname}
          onChange={(e) => setCname(e.target.value)}
          required
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            marginTop: "20px",
          }}
        >
          {/* <button className="btn primary" onClick={cancelDelete}>
            Cancle
          </button> */}
          {/* <button
            className={`btn danger ${cname !== collectionName && "disable"}`}
            onClick={confirmDelete}
            disabled={cname !== collectionName}
          >
            Delete
          </button> */}
          <button
            type="button"
            onClick={confirmDelete}
            disabled={cname !== collectionName}
            class={`py-3 px-4 w-full inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600${
              cname !== collectionName && "opacity-50"
            }`}
          >
            I Understand, delete "{collectionName}" collection
          </button>
        </div>
      </div>
    );
  }
);

export default DeleteCollection;
