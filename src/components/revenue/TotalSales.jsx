import React from "react";
import Piechart from "./PiChart";
import RetailBarChart from "./RetailBarChart";
import WholesaleBarChart from "./WholesaleBarChart";
import TotalPurchases from "./TotalPurchases";
import TotalRevenue from "./TotalRevenue";
import RevenuePiechart from "./RevenuePieChart";
import Revenue2 from "./Revenue2";

const TotalSales = () => {
  return (
    <>
      <div className="">
        <div className="font-bold text-xl text-gray-700 my-5 dark:text-gray-300">
          Monthly Retail and Wholesale sales:
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 mb-10">
          <RetailBarChart />
          <WholesaleBarChart />
        </div>
      </div>
      <div className="">
        <div className="font-bold text-xl text-gray-700 my-5 dark:text-gray-300">
          Monthly Purchases and Overall Sales:
        </div>
        <div className="grid md:grid-cols-2  md:gap-6 mb-10">
          <TotalPurchases />
          <TotalRevenue />
        </div>
      </div>
      <div className="">
        <div className="font-bold text-xl text-gray-700 my-5 dark:text-gray-300">
          Total Revenue:
        </div>
        <div className="grid md:grid-cols-2 py-5 px-10 bg-gray-100 md:gap-6 mb-10 dark:text-gray-300">
          <Revenue2 />
          <Piechart />
        </div>
        <div className="font-bold text-xl text-gray-700 my-5 dark:text-gray-300">
          All Data:
        </div>
        <div className="flex justify-center py-5 px-10 bg-gray-100 md:gap-6 mb-10 dark:text-gray-300">
          <RevenuePiechart />
        </div>
      </div>
    </>
  );
};

export default TotalSales;
