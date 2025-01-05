import { Stack, Typography } from "@mui/material";

import { LabelColor } from "../label";
import Status from "./Status";

type WorkorderStatusProps = {
  number: number;
  status: string;
  statusColor: LabelColor;
};

const WorkorderStatus = ({
  number,
  status,
  statusColor,
}: WorkorderStatusProps) => (
  <Stack direction="column" alignItems="center" justifyContent="center">
    <Typography variant="h3" sx={{ ml: 0.5, mr: 1 }}>
      {number}
    </Typography>
    <Status status={status} color={statusColor} />
  </Stack>
);

export default WorkorderStatus;
