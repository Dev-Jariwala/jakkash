import React, { useContext } from "react";
import BarChart from "./BarChart";
import { WholeSaleContext } from "../../store/wholeSaleBillContext";

const WholesaleBarChart = () => {
  const { wholeSaleBills } = useContext(WholeSaleContext);
  // Extract monthly sales data
  const monthlySales = Array.from({ length: 12 }, () => 0); // Initialize an array with zeros for each month

  wholeSaleBills.forEach((bill) => {
    const orderDate = new Date(bill.orderDate);
    const month = orderDate.getMonth();
    monthlySales[month] += bill.subTotal;
  });
  const chartConfig = {
    type: "bar",
    height: 205,
    series: [
      {
        name: "Sales",
        data: monthlySales, //here my monthwise sales will go
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "50%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
  return (
    <BarChart
      icon={"receipt_long"}
      chartConfig={chartConfig}
      barChartTitle={`Wholesale Sales :`}
      smallTitle={"Sum of Sub Totals per Month"}
    />
  );
};

export default WholesaleBarChart;
