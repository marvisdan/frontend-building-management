import { useMemo } from "react";
// @mui
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Typography,
} from "@mui/material";

import Status from "../../../../components/workorders/Status";

import { fDateTime } from "../../../../utils/formatTime";

import { getWorkorderStatusColor } from "../../../../helpers";
import { useLocales } from "../../../../locales";
import { getWorkorderStatus } from "../../../../pages/helpers/getWorkorderStatus";
import { WorkorderType } from "../../../../types";

interface WorkordersTimeLineProps extends CardProps {
  title?: string;
  subheader?: string;
  list: WorkorderType[];
}

export default function WorkordersTimeLine({
  title,
  subheader,
  list,
  ...other
}: WorkordersTimeLineProps) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          "& .MuiTimelineItem-missingOppositeContent:before": {
            display: "none",
          },
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <WorkordersTimeLineItem
              key={item.id}
              item={item}
              status={item.status}
              isLast={index === list.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

type Props = {
  item: WorkorderType;
  isLast: boolean;
  status: {
    id: number;
    name: string;
    description: string;
    orderInList: number;
  };
};

function WorkordersTimeLineItem({ item, isLast, status }: Props) {
  const { name, duedate, assignee } = item;

  // NOTE: Backend has to add an overdue status into workorder status property
  // TODO: Change logic with overdue When the backend will be done
  const statusColor = useMemo(
    () => getWorkorderStatusColor(status.name),
    [status]
  );
  const { translate } = useLocales();

  const statusFiltered = getWorkorderStatus({
    status: status.name,
    translate,
  });

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color={statusColor === "primary" ? "grey" : statusColor} />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="caption" sx={{ color: "text.secondary", mr: 2 }}>
            {fDateTime(duedate)}
          </Typography>
          <Status
            color={statusColor === "primary" ? "default" : statusColor}
            status={statusFiltered}
          />
        </Box>
        <Typography variant="subtitle2" fontWeight={600}>
          {name}
        </Typography>
        {assignee && assignee.name ? (
          <Typography variant="caption">{assignee.name}</Typography>
        ) : null}
        <Typography variant="caption">{"Building Name"}</Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
