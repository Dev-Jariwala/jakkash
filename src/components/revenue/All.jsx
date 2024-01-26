import React from "react";
import Piechart from "./PiChart";
import RetailBarChart from "./RetailBarChart";
import WholesaleBarChart from "./WholesaleBarChart";
import TotalRevenue from "./TotalRevenue";
import RevenuePiechart from "./RevenuePieChart";
import Revenue2 from "./Revenue2";
import PurchaseChart from "./PurchaseChart";

const All = () => {
  return (
    <>
      {/* Tab 1 */}
      <div id="tab1" className="p-10">
        <div className="font-bold text-xl text-gray-700 my-5 dark:text-gray-300">
          Monthly Retail and Wholesale sales:
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 mb-10">
          <RetailBarChart height={270} />
          <WholesaleBarChart height={270} />
        </div>
      </div>
      {/* Tab 2 */}
      <div id="tab2" className="p-10">
        <div className="font-bold text-xl text-gray-700 my-5 dark:text-gray-300">
          Monthly Purchases and Overall Sales:
        </div>
        <div className="grid md:grid-cols-2  md:gap-6 mb-10">
          <PurchaseChart height={270} />
          <TotalRevenue height={270} />
        </div>
      </div>
      {/* Tab 3 */}
      <div id="tab3" className="p-10">
        <div className="font-bold text-xl text-gray-700 my-5 dark:text-gray-300">
          Total Revenue:
        </div>
        <div className="grid md:grid-cols-2 py-5 px-10 bg-gray-100 md:gap-6 mb-10 dark:text-gray-300">
          <Revenue2 />
          <Piechart />
        </div>
      </div>
      {/* Tab 4 */}
      <div id="tab4" className="p-10">
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

export default All;
