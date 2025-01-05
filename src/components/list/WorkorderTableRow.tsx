import {
  Alert,
  Button,
  Checkbox,
  IconButton,
  Link,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/fr";
import React, { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import ConfirmDialog from "../confirm-dialog";
import Iconify from "../iconify";
import MenuPopover from "../menu-popover";
import Status from "../workorders/Status";

import {
  getWorkorderPriorityColor,
  getWorkorderPriorityText,
  getWorkorderStatusColor,
} from "../../helpers";
import { useLocales } from "../../locales";
import { getWorkorderStatus } from "../../pages/helpers/getWorkorderStatus";
import { PATH_DASHBOARD } from "../../routes/paths";
import { dataTableWorkorderType } from "../../types";

type Props = {
  row: dataTableWorkorderType;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function WorkorderTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { translate, currentLang } = useLocales();
  const {
    id,
    name,
    assignee,
    assignedContact,
    duedate,
    scheduleddate,
    workOrderPriority,
    status,
  } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const formatedDuedate = useMemo(
    () => dayjs(duedate).locale(currentLang.value).format("DD MMM YYYY"),
    [duedate, currentLang.value]
  );

  const formatedScheduleddate = useMemo(
    () => dayjs(scheduleddate).locale(currentLang.value).format("DD MMM YYYY"),
    [scheduleddate, currentLang.value]
  );

  const renderAssignee = (assignee: any, assignedContact: any) => {
    let res = null;

    if (assignee) {
      res = assignee.name;
    }

    if (assignedContact) {
      res = assignedContact.name;
    }

    if (assignee && assignedContact) {
      res = `${assignedContact.name} - ${assignedContact.name}`;
    }
    return res;
  };

  const statusName = status.name && status.name.split(" ").join("_");
  const statusColor = getWorkorderStatusColor(statusName);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <Link
          to={PATH_DASHBOARD.workorder.view(Number(id)) ?? ""}
          component={RouterLink}
          sx={{
            display: "contents",
            color: "initial",
          }}
        >
          <TableCell align="left" sx={{ maxWidth: 60, pt: 3 }}>
            {renderAssignee(assignee, assignedContact)}
          </TableCell>
          <TableCell sx={{ maxWidth: 60 }}>{formatedScheduleddate}</TableCell>
          <TableCell sx={{ maxWidth: 60 }}>{formatedDuedate}</TableCell>
          <TableCell sx={{ maxWidth: 250 }}>
            <Typography variant="subtitle2" noWrap>
              {!name || name.trim() === "" ? "N/A" : name}
            </Typography>
          </TableCell>

          <TableCell sx={{ maxWidth: 30 }}>
            {workOrderPriority && workOrderPriority.name ? (
              <Status
                status={translate(
                  getWorkorderPriorityText(workOrderPriority.name)
                )}
                color={getWorkorderPriorityColor(workOrderPriority.name)}
              />
            ) : (
              "N/A"
            )}
          </TableCell>

          <TableCell sx={{ maxWidth: 30 }}>
            {status && statusName ? (
              <Status
                status={getWorkorderStatus({
                  status: statusName,
                  translate,
                })}
                color={statusColor === "primary" ? "default" : statusColor}
              />
            ) : (
              "N/A"
            )}
          </TableCell>
        </Link>

        <TableCell align="center">
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          {translate("workorder.actions.short_edit")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          {translate("workorder.actions.delete")}
        </MenuItem>
      </MenuPopover>

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
        action={
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              handleCloseConfirm();
            }}
          >
            {translate("workorder.actions.delete")}
          </Button>
        }
      />
    </>
  );
}
