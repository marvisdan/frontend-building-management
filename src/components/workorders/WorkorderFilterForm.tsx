import { Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Key } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { StatusType } from "src/types";
import { useAuthContext } from "../../auth/useAuthContext";
import { slotProps } from "../../constants";
import {
  useFetchOrganizationSites,
  useFetchUsers,
  useFetchWorkorderPriorities,
  useFetchWorkorderStatus,
} from "../../hooks";
import { useLocales } from "../../locales";
import { getOrderedStatus } from "../../pages/helpers";
import { OptionsType, formatDataToSelectOptions } from "../../utils";
import { RHFSelect } from "../hook-form";

export default function WorkorderFilterForm() {
  const { translate } = useLocales();
  const { accessToken } = useAuthContext();
  const { control, watch } = useFormContext();
  const { data: userData, refetch: refetchusers } = useFetchUsers({
    options: {
      retry: 2,
      enabled: false,
    },
  });

  const { data } = useFetchOrganizationSites(accessToken);

  const { data: priorities, refetch: refetchPriorities } =
    useFetchWorkorderPriorities({
      options: {
        retry: 2,
        enabled: false,
      },
    });

  const { data: status, refetch: refetchStatus } = useFetchWorkorderStatus();
  const priority = watch("priority");
  const formatedStatusName = (name: string) => name.split(" ").join("_");

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          pb: 2,
          px: { md: 0, lg: 0 },
          flexShrink: 0,
        }}
      >
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          {translate("workorder.form.subtitle.general")}
        </Typography>
        <RHFSelect
          name="organizationSiteId"
          label={translate("asset.form.label.asset.building")}
          placeholder={translate("asset.form.label.asset.building")}
        >
          <option value="" />
          {data &&
            formatDataToSelectOptions(data).map((option: OptionsType) => (
              <option key={option.id} value={option.code}>
                {option.label}
              </option>
            ))}
        </RHFSelect>
        <RHFSelect
          name="status"
          label={translate("workorder.form.label.workorder.status")}
          onClick={refetchStatus}
        >
          <option value="" />
          {status &&
            getOrderedStatus(status).map(
              ({ name, id }: StatusType, key: Key) => (
                <option key={`${key}-${id}`} value={id}>
                  {translate(`workorder.status.${formatedStatusName(name)}`)}
                </option>
              )
            )}
        </RHFSelect>
        <RHFSelect
          name="priority"
          label={translate("workorder.form.label.workorder.priority")}
          InputLabelProps={{ shrink: priority ? true : false }}
          onClick={refetchPriorities}
        >
          <option value="" />
          {formatDataToSelectOptions(priorities).map(
            ({ code, id, label }, key: Key) => (
              <option key={`${key}-${id}`} value={code}>
                {label}
              </option>
            )
          )}
        </RHFSelect>

        <RHFSelect
          name="assignee"
          label={translate("workorder.form.label.workorder.assignee")}
          onFocus={refetchusers}
        >
          <option value="" />
          {formatDataToSelectOptions(userData).map(({ code, id, label }) => (
            <option key={id} value={code}>
              {label}
            </option>
          ))}
        </RHFSelect>

        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          {translate("workorder.form.subtitle.date")}
        </Typography>
        <Stack spacing={1.5}>
          <Controller
            name="scheduleddate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                {...field}
                format={translate("calendar.dateFormat")}
                label={translate(
                  "workorder.form.label.workorder.scheduledDate"
                )}
                slotProps={slotProps(error)}
              />
            )}
          />
        </Stack>
        <Stack spacing={1.5}>
          <Controller
            name="duedate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                {...field}
                format={translate("calendar.dateFormat")}
                label={translate("workorder.form.label.workorder.dueDate")}
                slotProps={slotProps(error)}
              />
            )}
          />
        </Stack>
      </Stack>
    </>
  );
}
