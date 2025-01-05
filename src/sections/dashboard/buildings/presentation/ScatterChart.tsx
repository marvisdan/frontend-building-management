import { Box, Card, CardHeader, CardProps, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useMemo, useState } from "react";
import { CustomSmallSelect } from "../../../../components/custom-input";
import Chart from "../../../../components/chart";

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      year: string;
      data: ApexOptions["series"];
    }[];
    options?: ApexOptions;
  };
}

export default function ScatterChart({ title, chart }: Props) {
  const theme = useTheme();
  const { colors, series, options, ...other } = chart;

  const [seriesData, setSeriesData] = useState("2022");
  const chartOptions = useMemo(
    () => ({
      colors,
      ...options,
      tooltip: {
        theme: theme.palette.mode,
      },
      legend: {
        labels: {
          colors: theme.palette.text.primary,
        },
      },
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: { enabled: false },
        foreColor: theme.palette.text.disabled,
        fontFamily: theme.typography.fontFamily,
      },
    }),
    [theme, options, colors]
  );

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        action={
          <CustomSmallSelect
            value={seriesData}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSeriesData(event.target.value)
            }
          >
            {series &&
              series.map((option) => (
                <option key={option.year} value={option.year}>
                  {option.year}
                </option>
              ))}
          </CustomSmallSelect>
        }
      />

      {series.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <Chart
              options={chartOptions}
              series={item.data}
              type="scatter"
              height={350}
              zoom={{
                type: "xy",
              }}
            />
          )}
        </Box>
      ))}
    </Card>
  );
}
