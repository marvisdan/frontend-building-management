import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";

import { getWorkorderStatusColor } from "../../../helpers";
import { useFetchWorkordersByAssetId } from "../../../hooks";
import { useLocales } from "../../../locales";
import { getWorkorderStatus } from "../../../pages/helpers/getWorkorderStatus";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { WorkorderType, workorderStatusType } from "../../../types";
import Status from "../../workorders/Status";

type Props = {
  item: WorkorderType;
  status: {
    description: string;
    id: number;
    name: workorderStatusType;
    orderInList: number;
  };
};

const WorkorderItem = ({ item, status }: Props) => {
  const { translate } = useLocales();
  const { name, duedate, description, assignee } = item;
  const statusName = status.name.split(" ").join("_");

  const statusColor = useMemo(
    () => getWorkorderStatusColor(statusName.split(" ").join("_")),
    [statusName]
  );

  const statusFiltered = getWorkorderStatus({
    status: statusName,
    translate,
  });

  return (
    <Box sx={{ my: 2 }}>
      <Stack direction="row" justifyContent="flex-start" spacing={1}>
        <Status
          color={statusColor === "primary" ? "default" : statusColor}
          status={statusFiltered}
        />
        <Typography variant="subtitle2" fontWeight={600}>
          {name}
        </Typography>
      </Stack>
      {description && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          {description}
        </Typography>
      )}
      <Stack direction="row" justifyContent="flex-start" spacing={1} mt={1}>
        <Typography variant="caption">
          {translate("workorder.user", { user: assignee?.name })}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {dayjs(duedate).format("YYYY-MM-DD")}
        </Typography>
      </Stack>
    </Box>
  );
};

export default function WorkordersTab({ buttonText }: { buttonText: string }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { data, isLoading, isError, error } = useFetchWorkordersByAssetId({
    limit: 10,
    id: Number(id),
  });

  if (isError) {
    return (
      <Box sx={{ pt: 2 }}>
        <Typography variant="h4" sx={{ m: 3 }}>
          {error?.message}
        </Typography>
      </Box>
    );
  }

  const navigateToWorkorders = () => {
    navigate(PATH_DASHBOARD.workorder.root);
  };

  return (
    <Box sx={{ pt: 2 }}>
      {isLoading ? (
        <Box data-testid="assets-loader" mt={2}>
          <LinearProgress />
        </Box>
      ) : data.length === 0 ? (
        <Typography variant="subtitle2" sx={{ m: 1 }}>
          {translate("workorder.not_found")}
        </Typography>
      ) : (
        <>
          {data.map((item: any) => (
            <WorkorderItem key={item.id} item={item} status={item.status} />
          ))}
          {data.length >= 0 && (
            <Stack
              direction="row"
              alignItems="flex-end"
              justifyContent="flex-end"
              pb={2}
            >
              <Button
                variant="text"
                size="small"
                color="primary"
                onClick={navigateToWorkorders}
                endIcon={<ChevronRightIcon />}
              >
                {buttonText}
              </Button>
            </Stack>
          )}
        </>
      )}
    </Box>
  );
}
