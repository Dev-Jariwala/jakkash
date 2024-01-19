import React, { useContext } from "react";
import WholeSaleDetail from "./WholeSaleDetail";

const WholeSaleTable = ({ onEdit, currentProducts }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Bill No.</th>
          <th>Date</th>
          <th>Name</th>
          <th>Total</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currentProducts &&
          currentProducts.map((bill) => {
            return (
              <WholeSaleDetail
                key={bill.BillNo}
                bill={bill}
                onEdit={onEdit}
              ></WholeSaleDetail>
            );
          })}
      </tbody>
    </table>
  );
};

export default WholeSaleTable;
