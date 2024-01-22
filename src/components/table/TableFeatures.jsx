import React, { useState } from "react";
import OptionButton from "./OptionButton";

const TableFeatures = ({
  filters,
  setPageSize,
  searchQuery,
  setSearchQuery,
  setSelectedFilters,
  selectedFilters,
}) => {
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
        <OptionButton
          filters={filters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>
    </div>
  );
};

export default TableFeatures;
