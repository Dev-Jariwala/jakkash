import React, { useContext } from "react";
import BarChart from "./BarChart";
import { WholeSaleContext } from "../../store/wholeSaleBillContext";
import { PurchasesContext } from "../../store/purchaseContext";

const PurchaseChart = ({ height = 205 }) => {
  const { purchases } = useContext(PurchasesContext);
  // Extract monthly sales data
  const monthlyPurchases = Array.from({ length: 12 }, () => 0); // Initialize an array with zeros for each month

  purchases.forEach((purchase) => {
    const date = new Date(purchase.date);
    const month = date.getMonth();
    monthlyPurchases[month] += purchase.rate * purchase.quantity;
  });
  const total = monthlyPurchases.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  const chartConfig = {
    type: "bar",
    height,
    series: [
      {
        name: "purchases",
        data: monthlyPurchases, //here my monthwise sales will go
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
      chartConfig={chartConfig}
      icon={"shopping_cart"}
      barChartTitle={`Monthly Purchases : ₹ ${total}/-`}
      smallTitle={"Sum of (rate X quantity) per Month"}
    />
  );
};

export default PurchaseChart;
