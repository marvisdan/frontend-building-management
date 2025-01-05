import { Box, Card, CardHeader, CardProps } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useState } from "react";

import Chart, { useChart } from "../../../../components/chart";
import { CustomSmallSelect } from "../../../../components/custom-input";
import { fNumber } from "../../../../utils";

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  withAction?: boolean;
  horizontal?: boolean;
  dataType: "categories" | "employees";
  chart: {
    labels: {
      [key: string]: string[];
    };
    colors?: string[];
    series: {
      type: string;
      data: {
        name: string;
        data: number[];
      }[];
    }[];
    options?: ApexOptions;
  };
}

export default function BarChart({
  title,
  subheader,
  chart,
  horizontal = false,
  dataType,
  withAction,
  ...other
}: Props) {
  const { labels, colors, series, options } = chart;
  const [seriesData, setSeriesData] = useState("week");
  const chartOptions = useChart({
    colors,
    stroke: {
      width: 0,
    },
    xaxis: {
      categories:
        (dataType === "employees" && labels.name) ||
        (dataType === "categories" && labels.categories),
    },
    tooltip: {
      y: {
        formatter: (value: number) => fNumber(value),
      },
    },
    plotOptions: {
      bar: {
        horizontal,
        barHeight: "15%",
        borderRadius: 2,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    ...options,
  });

  const nbDataByWeek = series[0].data[0].data.length;

  return (
    <Card {...other} sx={{ borderRadius: 0 }}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          withAction && (
            <CustomSmallSelect
              value={seriesData}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSeriesData(event.target.value)
              }
            >
              {series.map((option) => (
                <option key={option.type} value={option.type}>
                  {option.type}
                </option>
              ))}
            </CustomSmallSelect>
          )
        }
      />

      {series.map((item) => (
        <Box key={item.type} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.type === seriesData && (
            <Chart
              type="bar"
              series={item.data}
              options={chartOptions}
              height={nbDataByWeek > 6 ? 600 : 364}
            />
          )}
        </Box>
      ))}
    </Card>
  );
}
