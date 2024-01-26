import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BarChart({
  chartConfig,
  barChartTitle,
  smallTitle,
  icon,
}) {
  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col ml-3 gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 flex items-center justify-center p-3 text-white">
          {/* <Square3Stack3DIcon className="h-6 w-6" /> */}
          <span className="material-icons">{icon}</span>
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            {barChartTitle}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            {smallTitle}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className=" pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
