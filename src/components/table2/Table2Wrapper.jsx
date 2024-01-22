import React, { useContext, useEffect, useState } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import { CollectionContext } from "../../store/collectionContext";
import Table2Features from "./Table2Features";
const Table2Wrapper = ({
  showIndex = true,
  tableName,
  tableBtn,
  rows,
  onTableBtn,
  ths,
  actions,
  mainKeys,
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
      <div className="bg-white flex items-center justify-between mb-3 py-3 px-4 dark:bg-gray-800  relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="text-sm font-bold text-gray-600 uppercase dark:text-gray-400">
          {" "}
          ( {activeColl?.collectionName} ) {tableName}
        </div>
        {tableBtn && (
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md text-xs"
            onClick={onTableBtn}
          >
            {tableBtn}
          </button>
        )}
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
