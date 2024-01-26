// please install npm install react-apexcharts apexcharts
import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { RetailBillContext } from "../../store/retailBillContext";
import { WholeSaleContext } from "../../store/wholeSaleBillContext";
import { PurchasesContext } from "../../store/purchaseContext";
function Revenue2() {
  const [studentMarks, setStudentMarks] = useState([]);
  const { retailBills } = useContext(RetailBillContext);
  const { wholeSaleBills } = useContext(WholeSaleContext);
  const { purchases } = useContext(PurchasesContext);

  useEffect(() => {
    const getStudentdata = async () => {
      const retailTotal = retailBills.reduce((acc, curr) => {
        return acc + curr.subTotal;
      }, 0);
      const wholesaleTotal = wholeSaleBills.reduce((acc, curr) => {
        return acc + curr.subTotal;
      }, 0);
      const purchaseTotal = purchases.reduce((acc, curr) => {
        return acc + curr.rate * curr.quantity;
      }, 0);

      setStudentMarks([retailTotal + wholesaleTotal, purchaseTotal]);
      //console.log(resData);
    };

    getStudentdata();
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <Chart
          type="pie"
          width={500}
          height={500}
          series={studentMarks}
          options={{
            title: {
              text: `Total Revenue = ${studentMarks[0] - studentMarks[1]}/- Rs`,
            },
            noData: { text: "Empty Data" },
            colors: ["#11235A", "#DBCC95"],

            labels: ["Overall Sales", "Investment"],
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
}
export default Revenue2;
