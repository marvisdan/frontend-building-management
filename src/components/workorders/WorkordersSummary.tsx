import { Box, Stack, styled } from "@mui/material";

import { useLocales } from "../../locales";
import WorkorderStatus from "./WorkorderStatus";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-around",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "space-between",
  },
}));

const WorkordersSummary = () => {
  const { translate } = useLocales();
  return (
    <Stack
      sx={{
        m: 4,
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
      }}
    >
      <StyledBox
        sx={{
          mb: { xs: 1 },
        }}
      >
        <WorkorderStatus
          {...{
            number: 16,
            status: translate("workorder.status.planned"),
            statusColor: "default",
          }}
        />
        <WorkorderStatus
          {...{
            number: 56,
            status: translate("workorder.status.ready"),
            statusColor: "default",
          }}
        />
        <WorkorderStatus
          {...{
            number: 156,
            status: translate("workorder.status.in_progress"),
            statusColor: "info",
          }}
        />
      </StyledBox>
      <StyledBox>
        <WorkorderStatus
          {...{
            number: 8,
            status: translate("workorder.status.on_hold"),
            statusColor: "warning",
          }}
        />
        <WorkorderStatus
          {...{
            number: 12,
            status: translate("workorder.status.overdue"),
            statusColor: "error",
          }}
        />
        <WorkorderStatus
          {...{
            number: 820,
            status: translate("workorder.status.completed"),
            statusColor: "success",
          }}
        />
      </StyledBox>
    </Stack>
  );
};

export default WorkordersSummary;
