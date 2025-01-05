import { Card, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/fr";
import { useMemo } from "react";

import { useLocales } from "../../locales";

import { getWorkorderPriorityText } from "../../helpers";
import { WorkorderType } from "../../types";

const WorkorderInformations = ({ workorder }: { workorder: WorkorderType }) => {
  const { translate, currentLang } = useLocales();

  const {
    duedate,
    scheduleddate,
    workOrderPriority,
    assignee,
    assignedContact,
    description,
  } = workorder;
  const priorityText =
    workOrderPriority && getWorkorderPriorityText(workOrderPriority?.name);

  const formatedDuedate = useMemo(
    () => dayjs(duedate).locale(currentLang.value).format("DD MMM YYYY"),
    [duedate, currentLang.value]
  );
  const formatedScheduledDate = useMemo(
    () => dayjs(scheduleddate).locale(currentLang.value).format("DD MMM YYYY"),
    [scheduleddate, currentLang.value]
  );

  return (
    <Card
      sx={{
        padding: {
          sm: 2,
          xs: 2,
        },
      }}
    >
      <Stack>
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Stack
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography component="div" variant="subtitle2" mr={1}>
              {translate("workorder.form.label.workorder.description")}
            </Typography>
            <Typography component="div" variant="body2">
              {translate(description)}
            </Typography>
          </Stack>

          <Stack
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography component="div" variant="subtitle2" mr={1}>
              {translate("workorder.form.label.workorder.priority")}
            </Typography>
            <Typography component="div" variant="body2">
              {translate(priorityText)}
            </Typography>
          </Stack>
          <Stack
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography component="span" variant="subtitle2" mr={1}>
              {translate("workorder.form.label.workorder.scheduledDate")}
            </Typography>

            <Typography component="span" variant="body2">
              {formatedScheduledDate}
            </Typography>
          </Stack>

          <Stack
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography component="span" variant="subtitle2" mr={1}>
              {translate("workorder.form.label.workorder.dueDate")}
            </Typography>
            <Typography component="span" variant="body2">
              {formatedDuedate}
            </Typography>
          </Stack>

          <Stack
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography component="span" variant="subtitle2" mr={1}>
              {translate("workorder.form.label.workorder.assignee")}
            </Typography>
            {assignee?.name ? (
              <Typography component="span" variant="body2">
                {assignee.name}
              </Typography>
            ) : (
              <Typography component="span" variant="body2">
                {assignedContact?.name}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default WorkorderInformations;
