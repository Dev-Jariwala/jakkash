// please install npm install react-apexcharts apexcharts
import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { RetailBillContext } from "../../store/retailBillContext";
import { WholeSaleContext } from "../../store/wholeSaleBillContext";
function Piechart() {
  const [studentMarks, setStudentMarks] = useState([]);
  const { retailBills } = useContext(RetailBillContext);
  const { wholeSaleBills } = useContext(WholeSaleContext);
  useEffect(() => {
    const getStudentdata = async () => {
      const retailTotal = retailBills.reduce((acc, curr) => {
        return acc + curr.subTotal;
      }, 0);
      const wholesaleTotal = wholeSaleBills.reduce((acc, curr) => {
        return acc + curr.subTotal;
      }, 0);

      setStudentMarks([retailTotal, wholesaleTotal]);
      //console.log(resData);
    };

    getStudentdata();
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid dark:text-gray-300">
        <Chart
          type="pie"
          width={500}
          height={500}
          series={studentMarks}
          options={{
            title: {
              text: `Overall Sales = ₹${studentMarks[0] + studentMarks[1]}/-`,
            },
            noData: { text: "Empty Data" },
            colors: ["#256D85", "#31304D"],
            labels: [`Retail`, `Wholesale`],
          }}
        ></Chart>
        {/* <div className="flex flex-col">
          <div className="flex">
            <h3 className="mt-3">
              <span className="font-bold">Retail Sales</span> = ₹
              {studentMarks[1]}/-
            </h3>
            <h3 className="mt-3 ml-5">
              <span className="font-bold">Wholesale Sales</span> = ₹
              {studentMarks[0]}/-
            </h3>
          </div>
          <h3 className="mt-3">
            <span className="font-bold">Total Sales</span> = ₹
            {studentMarks[0] + studentMarks[1]}/-
          </h3>
        </div> */}
      </div>
    </React.Fragment>
  );
}
export default Piechart;
