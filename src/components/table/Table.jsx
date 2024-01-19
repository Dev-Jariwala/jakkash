import React from "react";
import Row from "./Row";

const Table = ({
  showIndex,
  currrentRows,
  indexOfFirstRow,
  ths,
  actions,
  mainKeys,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>{ths && ths.map((th, index) => <th key={index}>{th}</th>)}</tr>
      </thead>
      <tbody>
        {currrentRows?.length > 0 &&
          currrentRows.map((row, rowIndex) => {
            const rowNumber = indexOfFirstRow + rowIndex;
            return (
              <tr key={rowIndex}>
                <Row
                  showIndex={showIndex}
                  row={row}
                  rowIndex={rowNumber}
                  actions={actions}
                  mainKeys={mainKeys}
                />
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
