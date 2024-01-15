import React, { useState } from "react";

const TableFeatures = ({ setPageSize, searchQuery, setSearchQuery }) => {
  return (
    <div className="table-features">
      <div className="page-size-dropdown">
        <select id="pageSize" onChange={(e) => setPageSize(e.target.value)}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div className="search-bar">
        <form>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default TableFeatures;
