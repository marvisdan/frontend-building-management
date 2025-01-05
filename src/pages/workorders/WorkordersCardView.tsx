import { Grid } from "@mui/material";

import WorkorderCard from "../../components/workorders/WorkorderCard";
import { WorkorderType } from "../../types";

export default function WorkordersCardView({
  workorders,
}: {
  workorders: WorkorderType[];
}) {
  return (
    <Grid container spacing={3} mt={2} data-testid="workorders-grid-view">
      {workorders
        ? workorders.map(
            (
              {
                workOrderPriority,
                status,
                id,
                assignee,
                description,
                duedate,
                scheduleddate,
                name,
              }: WorkorderType,
              index: number
            ) => (
              <WorkorderCard
                key={index}
                id={id}
                assignee={assignee}
                description={description}
                duedate={duedate}
                scheduledDate={scheduleddate}
                name={name}
                status={status}
                priority={workOrderPriority}
              />
            )
          )
        : null}
    </Grid>
  );
}
