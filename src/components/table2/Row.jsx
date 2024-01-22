import React, { useState } from "react";
import { Link } from "react-router-dom";

const Row = ({ showIndex, row, rowIndex, actions, mainKeys }) => {
  const renderRowData = () => {
    return mainKeys.map((mainKey, index) => {
      return (
        <td key={index} className="px-4 py-3 font-medium">
          {row[mainKey]}
        </td>
      );
    });
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {showIndex && <td className="px-4 py-3 font-medium">{rowIndex + 1}</td>}
      {renderRowData()}
      <td className="px-4 py-3">
        <div className="">
          {actions?.length > 0 &&
            actions.map((action, index) => (
              <button
                key={index}
                className={action.classNames.join(" ")}
                onClick={(e) => action.onSmash(e, row._id)}
              >
                {action.button}
              </button>
            ))}
        </div>
      </td>
      {/* <td className="px-4 py-3">
        <button type="button" onClick={toggleDropdown}>
          <span className="material-icons">more_horiz</span>
        </button>
      </td> */}
    </>
  );
};

export default Row;
