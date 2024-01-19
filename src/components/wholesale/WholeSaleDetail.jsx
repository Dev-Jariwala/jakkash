import React, { useState } from "react";
import { convertToReadableDate } from "../../assets/helper";
import { PDFViewer } from "@react-pdf/renderer";

import Modal from "../modal/Modal";
import WholeSaleBillPDF from "./WholeSaleBillPdf";

const WholeSaleDetail = ({ bill, onEdit }) => {
  const { _id, BillNo, orderDate, name, subTotal, totalDue } = bill;
  const [showPDF, setShowPDF] = useState(false);

  const togglePDF = () => {
    setShowPDF(!showPDF);
  };
  return (
    <>
      {showPDF && (
        <tr>
          <td>
            <Modal isOpen={showPDF} onClose={() => setShowPDF(false)}>
              <PDFViewer width="1000" height="600">
                <WholeSaleBillPDF bill={bill} />
              </PDFViewer>
            </Modal>
          </td>
        </tr>
      )}
      <tr id="print-content">
        <td>{BillNo}</td>
        <td>{convertToReadableDate(orderDate)}</td>
        <td>{name}</td>
        <td>{subTotal}/-</td>
        <td>
          <button
            className={`btn-outline ${totalDue > 0 ? "danger" : "success"}`}
          >
            {totalDue > 0 ? totalDue : "Paid"}
          </button>
        </td>
        <td>
          <button onClick={() => onEdit(_id)}>Edit</button>
          <button onClick={togglePDF}>View</button>
          <button>Edit-Advance</button>
          <button>Print</button>
        </td>
      </tr>
    </>
  );
};

export default WholeSaleDetail;
