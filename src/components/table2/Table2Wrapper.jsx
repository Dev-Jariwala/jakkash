import React, { useContext, useEffect, useState } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import { CollectionContext } from "../../store/collectionContext";
import Table2Features from "./Table2Features";
import { CSVLink } from "react-csv";
import { Tooltip } from "react-tooltip";
import TooltipItem from "../tooltip/ToolTipItem";

const Table2Wrapper = ({
  showIndex = true,
  tableName,
  tableBtn,
  rows,
  onTableBtn,
  ths,
  actions,
  mainKeys,
  headers,
  exportData,
  filters = [],
}) => {
  const { activeColl } = useContext(CollectionContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState(currentPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const filteredRows = rows?.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  // pagination calculation
  const PAGE_SIZE = pageSize;
  const totalPages = Math.ceil(filteredRows?.length / PAGE_SIZE);
  const indexOfLastRow = currentPage * PAGE_SIZE;
  const indexOfFirstRow = indexOfLastRow - PAGE_SIZE;

  const currentRows = filteredRows?.slice(indexOfFirstRow, indexOfLastRow);
  return (
    <div className="mx-auto mt-5 max-w-screen-xl px-4 lg:px-12">
      {/* Start coding here */}
      <div className="bg-white flex items-center justify-between mb-3 py-3 px-4 dark:bg-gray-800  relative shadow-md sm:rounded-lg overflow">
        <div className="text-sm mr-3 font-bold text-gray-600 uppercase dark:text-gray-400">
          {" "}
          ( {activeColl?.collectionName} ) {tableName}
        </div>
        <div className="flex items-center">
          {tableBtn && (
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md text-xs"
              onClick={onTableBtn}
            >
              {tableBtn}
            </button>
          )}
          {/* export button */}
          {exportData && headers && (
            <>
              <TooltipItem position="right" tooltipsText="export">
                <CSVLink
                  data={exportData}
                  filename={tableName}
                  headers={headers}
                >
                  <button
                    data-tip="Export" // Set the tooltip message
                    data-for="export-tooltip" // Specify the tooltip ID
                    type="button"
                    className="w-8 h-8 inline-flex items-center justify-center ml-3 gap-x-2 text-xs font-medium rounded-lg border border-gray-200  bg-teal-500 text-white shadow-sm hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <span className="material-icons text-sm">ios_share</span>
                  </button>
                </CSVLink>
              </TooltipItem>
            </>
          )}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <Table2Features
          filters={filters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPageSize={setPageSize}
        />
        <Table
          ths={ths}
          showIndex={showIndex}
          currrentRows={currentRows}
          indexOfFirstRow={indexOfFirstRow}
          actions={actions}
          mainKeys={mainKeys}
        />
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          setGoto={setGoto}
          goto={goto}
          indexOfFirstRow={indexOfFirstRow}
          indexOfLastRow={indexOfLastRow}
          totalRows={rows.length}
        />
      </div>
    </div>
  );
};

export default Table2Wrapper;
