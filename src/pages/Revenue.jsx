import React, { useState } from "react";
import PageTitle from "../components/pageTemp/PageTitle";
import TotalSales from "../components/revenue/TotalSales";
import TotalPurchases from "../components/revenue/TotalPurchases";
import TotalRevenue from "../components/revenue/TotalRevenue";

const Revenue = () => {
  const [activeTab, setActiveTab] = useState("totalSales");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <PageTitle pageName={"Revenue"}>
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="mb-4 border-b border-blue-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
            <li className="w-1/4">
              <button
                className={`inline-block w-full text-xl font-semibold p-4 border-b-2 rounded-t-lg  ${
                  activeTab === "totalSales"
                    ? "border-blue-500  dark:text-gray-200"
                    : "border-blue-200 text-gray-700 dark:border-gray-700 dark:text-gray-500"
                } `}
                type="button"
                onClick={() => handleTabClick("totalSales")}
              >
                Total Sales
              </button>
            </li>
            <li className="w-1/4">
              <button
                className={`inline-bloc w-full text-xl font-semibold p-4 border-b-2 rounded-t-lg  ${
                  activeTab === "totalPurchases"
                    ? "border-blue-500 dark:text-gray-200"
                    : "border-blue-200 text-gray-700 dark:border-gray-700 dark:text-gray-500"
                } `}
                type="button"
                onClick={() => handleTabClick("totalPurchases")}
              >
                Total Purchases
              </button>
            </li>
            <li className="w-1/4">
              <button
                className={`inline-bloc w-full text-xl font-semibold p-4 border-b-2 rounded-t-lg  ${
                  activeTab === "totalRevenue"
                    ? "border-blue-500 dark:text-gray-200"
                    : "border-blue-200 text-gray-700 dark:border-gray-700 dark:text-gray-500"
                } `}
                type="button"
                onClick={() => handleTabClick("totalRevenue")}
              >
                Total Revenue
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl  px-4 lg:px-12">
        {activeTab === "totalSales" && <TotalSales />}
        {activeTab === "totalPurchases" && <TotalPurchases />}
        {activeTab === "totalRevenue" && <TotalRevenue />}
      </div>
    </PageTitle>
  );
};

export default Revenue;
