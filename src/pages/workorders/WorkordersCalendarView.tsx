import { Container } from "@mui/material";

import { WorkorderType } from "../../types";

export default function WorkordersCalendarView({
  workorders,
}: {
  workorders: WorkorderType[];
}) {
  return (
    <Container>
      WorkordersCalendarView - showing {workorders.length} work orders
    </Container>
  );
}
