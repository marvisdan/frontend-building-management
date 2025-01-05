import {
  alpha,
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { CustomSmallSelect } from "../../../../components/custom-input";
import { WorkordersSummary } from "../../../../components/workorders";
import BarChart from "../presentation/BarChart";
import LineChart from "../presentation/LineChart";
import ScatterChart from "../presentation/ScatterChart";
import PieChart from "./PieChart";
import WorkordersTimeLine from "./WorkordersTimeLine";

import Iconify from "../../../../components/iconify/Iconify";
import { getMonths } from "../../../../helpers";
import { useFetchWorkorders } from "../../../../hooks";
import { useLocales } from "../../../../locales";
import { getScatterSeries } from "../../../../utils/getScatterSeries";

const LABELS = {
  name: [
    "Edmund Hart - company",
    "Ali Bomaye - company",
    "Beatriz Spritz - company",
    "Charles Xavier - company",
    "Diya Tornado - company",
    "Fatima Fetih - company",
  ],
  categories: [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
    "Category 7",
    "Category 8",
    "Category 9",
    "Category 10",
  ],
};

export default function MaintenanceSection() {
  const theme = useTheme();
  const { translate } = useLocales();
  const [selectBarValue, setSelectBarValue] = useState("Week");
  const [selectBar2Value, setSelectBar2Value] = useState("Week");
  const selectoptions = [
    {
      value: "week",
      label: translate("buildings.select.this_week"),
    },
    { value: "month", label: translate("buildings.select.this_month") },
  ];

  const renderScatterSeries = useMemo(
    () => getScatterSeries(translate),
    [translate]
  );
  const { data, isLoading, isError, error } = useFetchWorkorders({
    limit: 10,
  });

  const getMonthsLabels = useMemo(() => getMonths(translate), [translate]);

  return (
    <Grid container spacing={3} mt={2}>
      <Grid item xs={12} md={12} container spacing={3}>
        <Grid item xs={12} sm={12} md={7} lg={9}>
          <Card>
            <CardHeader
              sx={{ mt: 2 }}
              title={translate(
                "buildings.sections.presentation.workorder.summary_title"
              )}
            />
            <WorkordersSummary />
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardHeader
              sx={{ mt: 2 }}
              title={translate("buildings.sections.maintenance.by_assignee")}
              action={
                <CustomSmallSelect
                  value={selectBarValue}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setSelectBarValue(event.target.value)
                  }
                >
                  {selectoptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </CustomSmallSelect>
              }
            />
            <BarChart
              dataType="employees"
              horizontal
              chart={{
                labels: LABELS,
                colors: [
                  theme.palette.primary.main,
                  theme.palette.warning.main,
                  theme.palette.error.main,
                  theme.palette.success.main,
                ],
                series: [
                  {
                    type: "week",
                    data: [
                      {
                        name: translate("workorder.status.in_progress"),
                        data: [20, 34, 48, 65, 37, 48],
                      },
                      {
                        name: translate("workorder.status.on_hold"),
                        data: [10, 34, 13, 26, 27, 28],
                      },
                      {
                        name: translate("workorder.status.overdue"),
                        data: [10, 14, 13, 16, 17, 18],
                      },
                      {
                        name: translate("workorder.status.completed"),
                        data: [5, 12, 6, 7, 8, 9],
                      },
                    ],
                  },
                  {
                    type: "month",
                    data: [
                      {
                        name: translate("workorder.status.in_progress"),
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                      {
                        name: translate("workorder.status.on_hold"),
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                      {
                        name: translate("workorder.status.overdue"),
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                      {
                        name: translate("workorder.status.completed"),
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                    ],
                  },
                  {
                    type: "Year",
                    data: [
                      {
                        name: translate("workorder.status.in_progress"),
                        data: [10, 34, 13, 56, 77],
                      },
                      {
                        name: translate("workorder.status.on_hold"),
                        data: [10, 34, 13, 56, 77],
                      },
                      {
                        name: translate("workorder.status.overdue"),
                        data: [10, 34, 13, 56, 77],
                      },
                      {
                        name: translate("workorder.status.completed"),
                        data: [10, 34, 13, 56, 77],
                      },
                    ],
                  },
                ],
                options: {
                  chart: {
                    stacked: true,
                    animations: { enabled: true },
                  },
                },
              }}
            />
          </Card>
          <Card sx={{ mt: 3 }}>
            <CardHeader
              sx={{ mt: 2 }}
              title={translate("buildings.sections.maintenance.by_category")}
              action={
                <CustomSmallSelect
                  value={selectBar2Value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setSelectBar2Value(event.target.value)
                  }
                >
                  {selectoptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </CustomSmallSelect>
              }
            />
            <BarChart
              dataType="categories"
              horizontal
              chart={{
                labels: LABELS,
                colors: [
                  theme.palette.primary.main,
                  theme.palette.warning.main,
                  theme.palette.error.main,
                  theme.palette.success.main,
                ],
                series: [
                  {
                    type: "week",
                    data: [
                      {
                        name: translate("workorder.status.in_progress"),
                        data: [20, 34, 48, 65, 37, 48, 1],
                      },
                      {
                        name: translate("workorder.status.on_hold"),
                        data: [10, 34, 13, 26, 27, 28, 31, 27, 28, 31],
                      },
                      {
                        name: translate("workorder.status.overdue"),
                        data: [10, 14, 13, 16, 17, 18, 41, 27, 28, 31],
                      },
                      {
                        name: translate("workorder.status.completed"),
                        data: [5, 12, 6, 7, 8, 9, 21, 27, 28, 31],
                      },
                    ],
                  },
                  {
                    type: "month",
                    data: [
                      {
                        name: translate("workorder.status.in_progress"),
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                      {
                        name: translate("workorder.status.on_hold"),
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                      {
                        name: translate("workorder.status.overdue"),
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                      {
                        name: translate("workorder.status.completed"),
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                    ],
                  },
                  {
                    type: "year",
                    data: [
                      {
                        name: translate("workorder.status.in_progress"),
                        data: [10, 34, 13, 56, 77],
                      },
                      {
                        name: translate("workorder.status.on_hold"),
                        data: [10, 34, 13, 56, 77],
                      },
                      {
                        name: translate("workorder.status.overdue"),
                        data: [10, 34, 13, 56, 77],
                      },
                      {
                        name: translate("workorder.status.completed"),
                        data: [10, 34, 13, 56, 77],
                      },
                    ],
                  },
                ],
                options: {
                  chart: {
                    stacked: true,
                    animations: { enabled: true },
                  },
                },
              }}
            />
          </Card>
          <Grid item xs={12} md={12} container spacing={2} my={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <PieChart
                  title={translate(
                    "buildings.sections.maintenance.by_priority"
                  )}
                  chart={{
                    series: [
                      {
                        label: translate("labels.none"),
                        value: 4344,
                      },
                      { label: translate("labels.low"), value: 5435 },
                      { label: translate("labels.medium"), value: 1443 },
                      { label: translate("labels.high"), value: 4443 },
                    ],
                    colors: [
                      alpha(theme.palette.primary.light, 0.5),
                      theme.palette.primary.light,
                      theme.palette.primary.main,
                      theme.palette.primary.dark,
                    ],
                    options: {
                      chart: {
                        animations: { enabled: false },
                      },
                    },
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <LineChart
                  title={translate("buildings.sections.maintenance.completion")}
                  chart={{
                    categories: getMonthsLabels,
                    series: [
                      {
                        year: "2023",
                        data: [
                          {
                            name: "Radio Canada",
                            data: [35, 40, 75, 60, 58, 40, 30],
                          },
                          {
                            name: "Hotel de L'Ourcq",
                            data: [15, 20, 30, 60, 55, 75, 40],
                          },
                        ],
                      },
                      {
                        year: "2022",
                        data: [
                          {
                            name: "Radio Canada",
                            data: [3, 5, 8, 13, 21, 34, 55, 89, 144],
                          },
                          {
                            name: "Hotel de L'Ourcq",
                            data: [2, 17, 15, 10, 45, 51, 70, 88, 172],
                          },
                        ],
                      },
                    ],
                    colors: [
                      theme.palette.grey[500],
                      theme.palette.success.main,
                    ],
                    options: {
                      chart: {
                        animations: { enabled: false },
                      },
                      legend: {
                        position: "bottom",
                        itemMargin: { horizontal: 12, vertical: 12 },
                      },
                    },
                  }}
                />
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} my={2}>
            <ScatterChart
              title={translate(
                "buildings.sections.maintenance.duration_by_status"
              )}
              chart={{
                series: renderScatterSeries,
                options: {
                  grid: {
                    xaxis: {
                      lines: {
                        show: true,
                      },
                    },
                    yaxis: {
                      lines: {
                        show: true,
                      },
                    },
                  },
                  xaxis: {
                    type: "datetime",
                  },
                  yaxis: {
                    max: 70,
                  },
                  dataLabels: {
                    enabled: false,
                  },
                },
                colors: [
                  alpha(theme.palette.grey[500], 0.5),
                  alpha(theme.palette.success.main, 0.5),
                  alpha(theme.palette.error.main, 0.5),
                ],
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={3}>
          <Button
            to={""}
            component={RouterLink}
            variant="contained"
            startIcon={<Iconify icon="ic:outline-calendar-month" />}
            fullWidth
            sx={{
              mb: 3,
              flex: "row",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            {translate("workorder.actions.schedule")}
          </Button>
          {isLoading ? (
            <Box data-testid="assets-loader" mt={2}>
              <LinearProgress />
            </Box>
          ) : isError ? (
            <Typography variant="h4" sx={{ m: 3 }}>
              {error?.message}
            </Typography>
          ) : (
            data?.results && (
              <WorkordersTimeLine
                title={translate(
                  "buildings.sections.maintenance.recent_workorders"
                )}
                list={data.results.slice(0, 10)}
              />
            )
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
