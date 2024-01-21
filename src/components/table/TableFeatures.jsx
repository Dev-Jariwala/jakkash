import React, { useState } from "react";

const TableFeatures = ({ setPageSize, searchQuery, setSearchQuery }) => {
  const [filterOptions, setFilterOptions] = useState([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const handleFilterChange = (option) => {
    // Toggle the option in the filterOptions array
    if (filterOptions.includes(option)) {
      setFilterOptions(filterOptions.filter((item) => item !== option));
    } else {
      setFilterOptions([...filterOptions, option]);
    }
  };
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
        <div
          className="filter-container"
          onMouseOver={() => setIsFilterDropdownOpen(true)}
          onMouseLeave={() => setIsFilterDropdownOpen(false)}
        >
          <i className="material-icons table-filter filter-button">tune</i>
          <div className="filter-options">
            {isFilterDropdownOpen && (
              <div className="filter-dropdown">
                {/* Add checkboxes for filter options */}
                <label>
                  <input
                    type="checkbox"
                    value="option1"
                    checked={filterOptions.includes("option1")}
                    onChange={() => handleFilterChange("option1")}
                  />
                  Option 1
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="option2"
                    checked={filterOptions.includes("option2")}
                    onChange={() => handleFilterChange("option2")}
                  />
                  Option 2
                </label>
                {/* Add more checkboxes as needed */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableFeatures;
