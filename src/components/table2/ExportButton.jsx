import React, { useState } from "react";
import TooltipItem from "../tooltip/ToolTipItem";
import { CSVLink } from "react-csv";

const ExportButton = (
  //   setExpoDrop,
  //   expoDrop,
  onexportPDF,
  exportData,
  tableName,
  headers
) => {
  const [expoDrop, setExpoDrop] = useState(false);
  return (
    <>
      <TooltipItem position="right" tooltipsText="export">
        <div class="hs-dropdown relative inline-flex flex-col">
          <button
            type="button"
            onClick={() => setExpoDrop((prev) => !prev)}
            className="w-8 h-8 inline-flex items-center justify-center ml-3 gap-x-2 text-xs font-medium rounded-lg border border-gray-200  bg-teal-500 text-white shadow-sm hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-600 dark:border-gray-700 dark:text-white dark:hover:bg-green-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <span className="material-icons text-sm">ios_share</span>
          </button>

          <div
            class={`hs-dropdown-menu transition-[opacity,margin] absolute z-10 top-10 right-[0] ${
              !expoDrop && "hidden opacity-0"
            }  duration hs-dropdown-open:opacity-100  min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700`}
            aria-labelledby="hs-dropdown-with-icons"
          >
            <div class="py-2 first:pt-0 last:pb-0">
              <div
                onClick={onexportPDF}
                class="flex items-center cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
              >
                <span className="material-icons">description</span>
                Report
              </div>
              {/* <CSVLink data={exportData} filename={tableName} headers={headers}>
                <div class="flex items-center cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700">
                  <span className="material-icons">download</span>
                  CSV File
                </div>
              </CSVLink> */}
            </div>
          </div>
        </div>
      </TooltipItem>
    </>
  );
};

export default ExportButton;
