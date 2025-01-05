import {
  alpha,
  Card,
  CardHeader,
  CardProps,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ApexOptions } from "apexcharts";

import Chart, { useChart } from "../../../../components/chart";
import { fNumber } from "../../../../utils";

import Iconify from "../../../../components/iconify/Iconify";
import { useLocales } from "../../../../locales";

type ItemProps = {
  label: string;
  percent: number;
};

interface ScoreCardProps extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: ItemProps[];
    options?: ApexOptions;
  };
}

const ScoreCard = ({ title, subheader, chart, ...other }: ScoreCardProps) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const { series, options } = chart;
  const total = series[0].percent;

  const chartOptions = useChart({
    legend: {
      show: false,
    },
    grid: {
      padding: { top: -32, bottom: -32 },
    },
    fill: {
      colors: [theme.palette.common.white],
    },
    plotOptions: {
      radialBar: {
        hollow: { size: "70%", margin: 15 },
        track: {
          strokeWidth: "100%",
          background: alpha(theme.palette.common.white, 0.16),
        },
        dataLabels: {
          name: {
            offsetY: -16,
            color: "common.white",
          },
          value: { offsetY: 8, color: theme.palette.common.white },
          total: {
            label: "Building score",
            color: theme.palette.common.white,
            formatter: () => fNumber(total),
          },
        },
      },
    },
    ...options,
  });

  return (
    <Card
      {...other}
      sx={{
        background: `linear-gradient(135deg, #68CDF9 0%, #078DEE 100%)`,
        color: theme.palette.common.white,
      }}
    >
      <CardHeader
        title={title}
        subheader={
          <Typography variant="subtitle2" sx={{ color: "common.white" }}>
            {subheader}
          </Typography>
        }
        sx={{ mb: 8, color: "common.white" }}
      />
      <Chart
        type="radialBar"
        series={[total]}
        options={chartOptions}
        height={346}
      />
      <Stack direction={"row"} alignItems="center">
        <Typography
          sx={{ ml: 3, mt: 3, mb: 4, display: "flex", alignItems: "center" }}
          variant="body2"
        >
          <Iconify
            icon={total < 0 ? "eva:trending-down-fill" : "eva:trending-up-fill"}
            sx={{
              mr: 1,
              p: 0.5,
              width: 24,
              height: 24,
              borderRadius: "50%",
              color: theme.palette.primary.main,
              bgcolor: theme.palette.common.white,
            }}
          />
          {`+3% ${translate("labels.than_last_month")}`}
        </Typography>
      </Stack>
    </Card>
  );
};

export default ScoreCard;
