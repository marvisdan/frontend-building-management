import {
  Box,
  Card,
  CardHeader,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import BarChart from "./BarChart";
import BuildingContacts from "./BuildingContacts";
import BuildingInfos from "./BuildingInfos";
import LineChart from "./LineChart";
import ScoreCard from "./ScoreCard";

import { useAuthContext } from "../../../../auth/useAuthContext";
import { CustomSmallSelect } from "../../../../components/custom-input";
import { WorkordersSummary } from "../../../../components/workorders";
import { getMonths } from "../../../../helpers/getMonths";
import { useFetchOrganizationSites } from "../../../../hooks";
import { useLocales } from "../../../../locales";
import { OrganizationType } from "../../../../types";

const LABELS = {
  name: [
    "Edmund Hart - company",
    "Ali Bomaye - company",
    "Beatriz Spritz - company",
    "Charles Xavier - company",
    "Diya Tornado - company",
    "Fatima Fetih - company",
  ],
};

export default function BuildingPresentationSection() {
  const { translate } = useLocales();
  const [selectvalue, setSelectValue] = useState("week");
  const { accessToken } = useAuthContext();

  const selectoptions = [
    {
      value: "week",
      label: translate("buildings.select.this_week"),
    },
    { value: "month", label: translate("buildings.select.this_month") },
  ];
  const theme = useTheme();

  const {
    data: site,
    isLoading,
    isError,
    error,
  } = useFetchOrganizationSites(accessToken);

  if (isLoading) {
    return (
      <Box mt={2}>
        <LinearProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box mt={2}>
        <h1>{error?.message}</h1>
      </Box>
    );
  }

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12} md={4} lg={3}>
        {site &&
          site.map(({ id, name, address }: OrganizationType) => (
            <Stack key={id} spacing={3}>
              <BuildingInfos address={address} />
              <BuildingContacts
                title={translate("contacts.title")}
                buttonText={translate(
                  "buildings.sections.presentation.all_contacts"
                )}
              />
            </Stack>
          ))}
      </Grid>
      <Grid item xs={12} md={8} lg={9} container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4">
            {translate("buildings.sections.presentation.performance_title")}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <ScoreCard
            title={translate(
              "buildings.sections.presentation.overall_performance"
            )}
            subheader={translate("labels.last_month")}
            chart={{
              series: [{ label: "Check In", percent: 70 }],
              options: {
                chart: {
                  animations: { enabled: true },
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <LineChart
            title={translate("buildings.sections.presentation.score_over_time")}
            chart={{
              categories: getMonths(translate),
              series: [
                {
                  year: "2023",
                  data: [
                    {
                      name: "Radio Canada",
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                    },
                  ],
                },
                {
                  year: "2022",
                  data: [
                    {
                      name: "Radio Canada",
                      data: [148, 91, 69, 62, 49, 51, 35, 41, 10],
                    },
                  ],
                },
              ],
              options: {
                chart: {
                  animations: { enabled: true },
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader
              sx={{ my: 2 }}
              title={translate(
                "buildings.sections.presentation.workorder.summary_title"
              )}
              action={
                <CustomSmallSelect
                  value={selectvalue}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setSelectValue(event.target.value)
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
            <WorkordersSummary />
            <BarChart
              title={translate("buildings.sections.presentation.by_assignee")}
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
        </Grid>
      </Grid>
    </Grid>
  );
}
