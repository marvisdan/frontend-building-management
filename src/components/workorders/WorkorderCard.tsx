import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

import ConfirmDialog from "../confirm-dialog/ConfirmDialog";
import Iconify from "../iconify";
import { multiActionsPopoverType } from "../multi-actions-popover";
import MultiActionsPopover from "../multi-actions-popover/MultiActionsPopover";
import TextMaxLine from "../text-max-line";
import Status from "./Status";

import {
  getWorkorderPriorityColor,
  getWorkorderPriorityText,
  getWorkorderStatusColor,
} from "../../helpers";
import { useDeleteWorkorder } from "../../hooks";
import { useLocales } from "../../locales";
import { getWorkorderStatus } from "../../pages/helpers/getWorkorderStatus";
import { PATH_DASHBOARD } from "../../routes/paths";

const StyledTypography = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  textAlign: "left",
}));

export type WorkorderCardProps = {
  id: string;
  name: string;
  description?: string;
  duedate?: Dayjs;
  scheduledDate?: Dayjs;
  assignee?: any;
  overdue?: boolean;
  status?: any;
  priority?: any;
};

export default function WorkorderCard({
  id,
  assignee,
  description,
  duedate,
  scheduledDate,
  name,
  status,
  priority,
}: WorkorderCardProps) {
  const [openPopover, setOpenPopover] = useState<null | HTMLElement>(null);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const navigate = useNavigate();
  const { translate, currentLang } = useLocales();
  const handleMenuClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent> | undefined
  ) => {
    setOpenPopover(event?.currentTarget as never);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const { mutate } = useDeleteWorkorder(handleCloseConfirm);

  const goToEditWorkorder = () =>
    navigate(PATH_DASHBOARD.workorder.edit(Number(id)), {
      state: {
        id: id,
      },
    });

  const menuActionItems: multiActionsPopoverType[] = [
    {
      onClick: goToEditWorkorder,
      label: translate("workorder.actions.edit"),
      icon: <ModeEditOutlineIcon fontSize="small" />,
    },
    {
      onClick: handleOpenConfirm,
      label: translate("workorder.actions.delete"),
      icon: <DeleteOutlineOutlinedIcon fontSize="small" color="error" />,
    },
  ];

  const formatedDuedate = useMemo(
    () => dayjs(duedate).locale(currentLang.value).format("DD MMM YYYY"),
    [duedate, currentLang.value]
  );

  const formatedScheduledDate = useMemo(
    () => dayjs(scheduledDate).locale(currentLang.value).format("DD MMM YYYY"),
    [scheduledDate, currentLang.value]
  );
  const statusName = status.name.split(" ").join("_");
  const statusColor = getWorkorderStatusColor(statusName);
  return (
    <Grid item xs={12} sm={6} md={6} lg={4} data-testid="workorder-card-item">
      <Card>
        <CardHeader
          action={<MoreVertIcon onClick={handleMenuClick} />}
          title={
            <Stack direction="row" spacing={1}>
              {status && status.name ? (
                <Status
                  status={getWorkorderStatus({
                    status: statusName,
                    translate,
                  })}
                  color={statusColor === "primary" ? "default" : statusColor}
                />
              ) : null}

              {priority ? (
                <Status
                  status={translate(getWorkorderPriorityText(priority.name))}
                  color={getWorkorderPriorityColor(priority)}
                />
              ) : null}
            </Stack>
          }
          titleTypographyProps={{ variant: "subtitle1" }}
        />
        <Link
          component={RouterLink}
          to={PATH_DASHBOARD.workorder.view(Number(id)) ?? ""}
          underline="none"
          sx={{ color: "initial" }}
        >
          <CardContent sx={{ pt: 2 }}>
            <Stack direction={{ sm: "column" }} spacing={0.5}>
              <TextMaxLine
                title={name}
                line={1}
                variant="subtitle1"
                color="text.primary"
              >
                {name}
              </TextMaxLine>

              {scheduledDate ? (
                <Box display="flex" flexDirection="row">
                  <StyledTypography
                    variant="subtitle2"
                    color="text.primary"
                    sx={{ mr: 1 }}
                  >
                    {translate("workorder.components.card.scheduledDate")}
                  </StyledTypography>
                  <StyledTypography variant="subtitle2" color="text.primary">
                    {formatedScheduledDate}
                  </StyledTypography>
                </Box>
              ) : null}

              {duedate ? (
                <Box display="flex" flexDirection="row">
                  <StyledTypography
                    variant="subtitle2"
                    color="text.primary"
                    sx={{ mr: 1 }}
                  >
                    {translate("workorder.components.card.due_date")}
                  </StyledTypography>
                  <StyledTypography variant="subtitle2" color="text.primary">
                    {formatedDuedate}
                  </StyledTypography>
                </Box>
              ) : null}

              <TextMaxLine
                title={description}
                line={1}
                variant="body2"
                color="text.secondary"
              >
                {description !== ""
                  ? description
                  : translate("workorder.error.no_description")}
              </TextMaxLine>
              <Divider />

              <StyledTypography variant="body2" color="text.secondary">
                <Iconify icon="ic:sharp-person" mr={1} />
                {assignee?.name}
              </StyledTypography>

              <StyledTypography variant="body2" color="text.secondary">
                <Iconify icon="ic:sharp-location-on" mr={1} />
                {translate("N/A")}
              </StyledTypography>

              <StyledTypography variant="body2" color="text.secondary">
                <Iconify icon="mingcute:tool-fill" mr={1} />
                {translate("Heater 300")}
              </StyledTypography>

              {/* Recurrence */}
              {/* <StyledTypography variant="body2" color="text.secondary">
              <Iconify icon="material-symbols:cycle-rounded" mr={1} />
              {translate("N/A")}
            </StyledTypography> */}
            </Stack>
          </CardContent>
        </Link>
        <MultiActionsPopover
          open={openPopover}
          onClose={handleClosePopover}
          actions={menuActionItems}
        />
      </Card>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate("workorder.prompt.title")}
        maxWidth="sm"
        content={
          <>
            <Alert severity="warning" sx={{ mt: 1, py: 0.25 }}>
              {translate("workorder.prompt.alert")}
            </Alert>
            <Typography variant="body2" mt={1}>
              {translate("workorder.prompt.message", { value: name })}
            </Typography>
          </>
        }
        cancelText={translate("workorder.prompt.no")}
        action={
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => {
              mutate(Number(id));
            }}
          >
            {translate("workorder.prompt.yes")}
          </Button>
        }
      />
    </Grid>
  );
}
