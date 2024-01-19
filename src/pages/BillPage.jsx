import React, { useState } from "react";
import { Link } from "react-router-dom";
import Retail from "../components/retail/Retail";
import WholeSale from "../components/wholesale/WholeSale";
import "./Bill.css";

const BillPage = () => {
  const [bill, setBill] = useState("retail");
  return (
    <div className="page">
      <div className="p-title">
        <h2>
          <Link to={"/"}>Dashboard</Link>
          <span className="material-icons">navigate_next</span> Bills
        </h2>
      </div>
      <div className="bill-toggle">
        <h2
          className={bill === "retail" ? "active" : ""}
          onClick={() => setBill("retail")}
        >
          Retail Bill
        </h2>
        <h2
          className={bill === "wholesale" ? "active" : ""}
          onClick={() => setBill("wholesale")}
        >
          WholeSale Bill
        </h2>
      </div>

      <div className="bill-content">
        {bill === "retail" ? <Retail /> : <WholeSale />}
      </div>
    </div>
  );
};

export default BillPage;
