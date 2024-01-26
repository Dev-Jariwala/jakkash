// please install npm install react-apexcharts apexcharts
import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { RetailBillContext } from "../../store/retailBillContext";
import { WholeSaleContext } from "../../store/wholeSaleBillContext";
import { PurchasesContext } from "../../store/purchaseContext";
function RevenuePiechart() {
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

      setStudentMarks([retailTotal, wholesaleTotal, purchaseTotal]);
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
              text: "All Data",
            },
            noData: { text: "Empty Data" },
            colors: ["#256D85", "#31304D", "#DBCC95"],
            labels: [`Retail`, `Wholesale`, "Investment"],
          }}
        ></Chart>
        <div className="flex font-semibold dark:text-gray-700">
          <div className="w-[250px] py-2 px-4 text-gray-200 rounded-md m-1 bg-retail-color">
            Retail = ₹ {studentMarks[0]}/-
          </div>
          <div className="w-[250px] py-2 px-4 text-gray-300 rounded-md m-1 bg-wholesale-color">
            Wholesale = ₹ {studentMarks[1]}/-
          </div>
        </div>
        <div className="flex font-semibold dark:text-gray-700">
          <div className="w-[250px] py-2 px-4 text-gray-600 rounded-md m-1 bg-investment-color">
            Investment = ₹ {studentMarks[2]}/-
          </div>
          <div className="w-[250px] py-2 px-4 text-gray-600 rounded-md m-1 bg-purple-200">
            Profit = ₹{studentMarks[1] + studentMarks[0] - studentMarks[2]}
            /-
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default RevenuePiechart;
