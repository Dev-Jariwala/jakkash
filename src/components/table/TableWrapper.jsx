import React, { useContext, useState } from "react";
import "./table.css";
import TableFeatures from "./TableFeatures";
import Table from "./Table";
import Pagination from "./Pagination";
import { CollectionContext } from "../../store/collectionContext";
const TableWrapper = ({
  showIndex = true,
  tableName,
  tableBtn,
  rows,
  onTableBtn,
  ths,
  actions,
  mainKeys,
}) => {
  const { activeColl } = useContext(CollectionContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState(currentPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
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
    <div className="table-container">
      <div className="table-head">
        <div>
          {" "}
          ( {activeColl?.collectionName} ) {tableName}
        </div>
        {tableBtn && <button onClick={onTableBtn}>{tableBtn}</button>}
      </div>
      <div className="table-content">
        <TableFeatures
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
        />
      </div>
    </div>
  );
};

export default TableWrapper;
