import React from "react";

const Row = ({ row, rowIndex, actions, mainKeys }) => {
  const renderRowData = () => {
    return mainKeys.map((mainKey, index) => {
      return <td key={index}>{row[mainKey]}</td>;
    });
  };

  return (
    <>
      <td>{rowIndex + 1}</td>
      {renderRowData()}
      <td>
        <div className="action">
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
    </>
  );
};

export default Row;
