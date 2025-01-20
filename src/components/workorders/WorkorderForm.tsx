import {
  Autocomplete,
  Box,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ChangeEvent, Key, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { useAuthContext } from "../../auth/useAuthContext";
import { slotProps } from "../../constants";
import {
  useFetchAssets,
  useFetchChecklists,
  useFetchOrganizationContacts,
  useFetchUsers,
  useFetchWorkorderPriorities,
} from "../../hooks";
import { useLocales } from "../../locales";
import { AssetType, ChecklistType } from "../../types";
import { formatDataToSelectOptions } from "../../utils";
import { RHFSelect, RHFTextField } from "../hook-form";

const ASSIGNEE = {
  user: "user",
  contact: "contact",
};

export default function WorkorderForm() {
  const { translate } = useLocales();
  const { accessToken } = useAuthContext();
  const { control, watch, setValue } = useFormContext();

  const priority = watch("workOrderPriorityId");
  const assignedToUserId = watch("assignedToUserId");
  const assignedToContactId = watch("assignedToContactId");

  const initialRadioValue =
    assignedToUserId || (!assignedToContactId && !assignedToUserId)
      ? ASSIGNEE.user
      : ASSIGNEE.contact;

  const [radioValue, setRadioValue] = useState<string>(initialRadioValue);

  const {
    data: assetData,
    isLoading: isAssetsLoading,
    refetch: refetchAssets,
  } = useFetchAssets({
    token: accessToken,
    limit: 1000,
    options: {
      retry: 2,
      enabled: false,
    },
  });

  const {
    data: checklistData,
    isLoading: isChecklistsLoading,
    refetch: refetchChecklists,
  } = useFetchChecklists({
    limit: 1000,
    options: {
      retry: 2,
      enabled: false,
    },
  });

  const { data: userData, refetch: refetchusers } = useFetchUsers({
    options: {
      retry: 2,
      enabled: false,
    },
  });

  const { data: priorities, refetch: refetchPriorities } =
    useFetchWorkorderPriorities({});
  const { data: contactData, refetch: refetchContacts } =
    useFetchOrganizationContacts({ token: accessToken });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
    const clearedValue =
      radioValue === ASSIGNEE.user ? "assignedToUserId" : "assignedToContactId";
    setValue(clearedValue, "");
  };

  return (
    <Grid container spacing={3} direction="row">
      <Grid item xs={12} md={12}>
        <Card
          sx={{
            p: 3,
          }}
        >
          <Stack spacing={2}>
            <RHFTextField
              name="name"
              label={translate("workorder.form.label.workorder.name")}
              sx={{ mb: 3 }}
            />
            <RHFTextField
              name="description"
              label={translate("workorder.form.label.workorder.description")}
              multiline
              rows={3}
            />
          </Stack>
        </Card>

        <Typography variant="h6" sx={{ color: "text.secondary", my: 2 }}>
          {translate("workorder.form.subtitle.assetAndChecklists")}
        </Typography>

        <Card
          sx={{
            p: 2,
          }}
        >
          <Stack spacing={2}>
            <Controller
              name="assets"
              control={control}
              defaultValue=""
              render={({
                field: { ref, ...field },
                fieldState: { error, invalid },
              }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  multiple
                  autoHighlight
                  disableCloseOnSelect
                  options={
                    assetData && assetData.results ? assetData.results : []
                  }
                  getOptionLabel={(option: AssetType) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  loading={isAssetsLoading}
                  onFocus={refetchAssets}
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                  }}
                  renderOption={(props, { id, name }, index) => (
                    <Box
                      component="li"
                      sx={{ px: "8px !important" }}
                      {...props}
                    >
                      {name ?? "N/A"}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={translate("workorder.form.label.workorder.asset")}
                      error={invalid}
                      helperText={error?.message}
                      inputProps={{
                        ...params.inputProps,
                        readOnly: true,
                      }}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="checklists"
              control={control}
              defaultValue=""
              render={({
                field: { ref, ...field },
                fieldState: { error, invalid },
              }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  multiple
                  autoHighlight
                  disableCloseOnSelect
                  options={checklistData ? checklistData : []}
                  getOptionLabel={(option: ChecklistType) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  loading={isChecklistsLoading}
                  onFocus={refetchChecklists}
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                  }}
                  renderOption={(props, { id, name }, index) => (
                    <Box
                      component="li"
                      sx={{ px: "8px !important" }}
                      {...props}
                    >
                      {name ?? "N/A"}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={translate(
                        "workorder.form.label.workorder.checklist"
                      )}
                      error={invalid}
                      helperText={error?.message}
                      inputProps={{
                        ...params.inputProps,
                        readOnly: true,
                      }}
                    />
                  )}
                />
              )}
            />
          </Stack>
        </Card>

        <Typography variant="h6" sx={{ color: "text.secondary", my: 2 }}>
          {translate("workorder.form.subtitle.timing")}
        </Typography>

        <Card
          sx={{
            p: 3,
          }}
        >
          <Stack spacing={2}>
            <RHFSelect
              name="workOrderPriorityId"
              defaultValue=""
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
            <Stack spacing={1.5}>
              <Controller
                name="scheduledDate"
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
                name="dueDate"
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
        </Card>

        <Typography variant="h6" sx={{ color: "text.secondary", my: 2 }}>
          {translate("workorder.form.subtitle.assignee")}
        </Typography>

        <Card
          sx={{
            p: 3,
          }}
        >
          <FormControl>
            <Typography
              variant="subtitle1"
              sx={{ my: 2, color: "text.secondary" }}
            >
              {/*// TODO: Waiting for the real translation / traduction */}
              {translate("workorder.form.text.select_type")}
            </Typography>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{ pb: 2 }}
              value={radioValue}
              onChange={handleChange}
            >
              <FormControlLabel
                value="user"
                control={<Radio />}
                label={translate("workorder.form.label.workorder.user")}
              />
              <FormControlLabel
                value="contact"
                control={<Radio />}
                label={translate("workorder.form.label.workorder.contact")}
              />
            </RadioGroup>
          </FormControl>
          {radioValue === ASSIGNEE.user ? (
            <RHFSelect
              name="assignedToUserId"
              label={translate("workorder.form.label.workorder.assignee")}
              InputLabelProps={{ shrink: assignedToUserId ? true : false }}
              onClick={refetchusers}
            >
              <option value="" />
              {formatDataToSelectOptions(userData).map(
                ({ code, id, label }) => (
                  <option key={id} value={code}>
                    {label}
                  </option>
                )
              )}
            </RHFSelect>
          ) : radioValue === ASSIGNEE.contact ? (
            <RHFSelect
              name="assignedToContactId"
              defaultValue=""
              label={translate("workorder.form.label.workorder.assignee")}
              InputLabelProps={{ shrink: assignedToContactId ? true : false }}
              onClick={refetchContacts}
            >
              <option value="" />
              {formatDataToSelectOptions(contactData?.results).map(
                ({ code, id, label }) => (
                  <option key={id} value={code}>
                    {label}
                  </option>
                )
              )}
            </RHFSelect>
          ) : null}
        </Card>
      </Grid>
    </Grid>
  );
}
