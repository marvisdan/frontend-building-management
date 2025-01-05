import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

import { useEffect, useMemo } from "react";
import { getNewWorkorderSchema } from "../../../components/assets/schemas/workorder";
import FormProvider from "../../../components/hook-form/FormProvider";
import WorkorderForm from "../../../components/workorders/WorkorderForm";
import { useCreateWorkorder, useEditWorkorder } from "../../../hooks";
import { useLocales } from "../../../locales";
import { PATH_DASHBOARD } from "../../../routes/paths";
import {
  AssetType,
  ChecklistType,
  CreateWorkorderType,
  EditWorkorderType,
  WorkorderType,
} from "../../../types";

type FormValuesProps = any;

export const onSubmitWorkorder =
  ({
    mutate,
    onClose,
    edit,
  }: {
    mutate: UseMutateFunction<
      any,
      AxiosError<unknown, any>,
      CreateWorkorderType,
      unknown
    >;
    onClose?: () => void;
    edit?: WorkorderType;
  }) =>
  async (data: FormValuesProps) => {
    const checklistData: ChecklistType[] =
      data.checklists &&
      Array.isArray(data.checklists) &&
      data.checklists.reduce(
        (acc: ChecklistType[], checklist: ChecklistType) => [
          ...acc,
          checklist.id,
        ],
        []
      );

    const assetData: AssetType[] =
      data.assets &&
      Array.isArray(data.assets) &&
      data.assets.reduce(
        (acc: AssetType[], asset: AssetType) => [...acc, asset.id],
        []
      );

    let createWorkorder: CreateWorkorderType | EditWorkorderType = {
      name: data.name,
      description: data?.description,
      checklistIds: checklistData,
      assetIds: assetData,
      assignedToUserId: !data.assignedToUserId
        ? null
        : Number(data.assignedToUserId),
      assignedToContactId: !data.assignedToContactId
        ? null
        : Number(data.assignedToContactId),
      workOrderPriorityId: Number(data?.workOrderPriorityId),
      dueDate: data.dueDate,
      scheduledDate: data.scheduledDate,
    };

    if (edit) {
      createWorkorder = {
        ...createWorkorder,
        workOrderId: Number(edit.id),
      };
    }
    await mutate(createWorkorder);
    onClose && onClose();
  };

type WorkorderDetailsFormProps = {
  edit?: WorkorderType;
  isSuccess?: Boolean;
};

export default function WorkorderDetailsForm({
  edit,
  isSuccess,
}: WorkorderDetailsFormProps) {
  const { translate } = useLocales();
  const { mutate: createMutate } = useCreateWorkorder(
    PATH_DASHBOARD.workorder.root
  );
  const { mutate: editMutate } = useEditWorkorder(
    PATH_DASHBOARD.workorder.root
  );
  const mutate = edit ? editMutate : createMutate;
  const defaultValues: CreateWorkorderType | {} = useMemo(
    () => ({
      name: edit?.name ?? "",
      description: edit?.description ?? "",
      checklists: edit?.checklists ?? [],
      assets: edit?.assets ?? [],
      assignedToUserId: edit?.assignee?.id ?? "",
      assignedToContactId: edit?.assignedContact?.id
        ? String(edit?.assignedContact?.id)
        : "",
      workOrderPriorityId: edit?.workOrderPriority?.id ?? "",
      dueDate: new Date(edit?.duedate) ?? "",
      scheduledDate: new Date(edit?.scheduleddate) ?? "",
    }),
    [edit]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(getNewWorkorderSchema(translate)),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      reset(defaultValues);
    }
  }, [isSuccess, defaultValues, reset]);

  //const isDirty = Boolean(Object.keys(dirtyFields).length);

  const submitTextTranslated = useMemo(
    () => (edit ? "workorder.actions.edit" : "workorder.actions.create"),
    [edit]
  );

  return (
    <Grid
      item
      md={8}
      xs={12}
      my={3}
      py={2}
      sx={{ px: { md: 0, sm: 2, xs: 0 }, mx: { md: 0, sm: 4, xs: 1 } }}
    >
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit((data) =>
          onSubmitWorkorder({ mutate, edit })(data)
        )}
      >
        <Box>
          <Typography variant="h6" sx={{ m: 1 }}>
            {translate("workorder.form.subtitle.workorder_info")}
          </Typography>
          <Typography variant="body2" sx={{ m: 1 }}>
            {translate("workorder.form.subtitle.mandatory")}
          </Typography>
          <Grid container spacing={3} direction="row">
            <Grid item xs={12} md={12}>
              <WorkorderForm />
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  // disabled={!isDirty}
                >
                  {translate(submitTextTranslated)}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </Grid>
  );
}
