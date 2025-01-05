import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
} from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router";

import { NewAMetadataSchema } from "../../../../../components/assets/schemas/metadata";
import { RHFTextField } from "../../../../../components/hook-form";
import FormProvider from "../../../../../components/hook-form/FormProvider";
import Iconify from "../../../../../components/iconify/Iconify";
import {
  useCreateMetadata,
  useDeleteMetadata,
  useFetchAssetMetadata,
  useUpdateMetadata,
} from "../../../../../hooks";
import { useLocales } from "../../../../../locales";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { AssetMetadataType } from "../../../../../types";

export type FormValuesProps = {
  metadataValues: AssetMetadataType[];
};

const onSubmitMetadata =
  (
    mutate: UseMutateFunction<
      any,
      AxiosError<unknown, any>,
      {
        assetId: number;
        metadataName: string;
        metadataValue: string;
      },
      unknown
    >,
    mutateUpdate: UseMutateFunction<
      any,
      AxiosError<unknown, any>,
      unknown,
      unknown
    >,
    mutateDelete: UseMutateFunction<
      any,
      AxiosError<unknown, any>,
      number,
      unknown
    >,
    defaultValues: any
  ) =>
  async (data: FormValuesProps) => {
    const submittedData = data.metadataValues;
    const { metadataValues } = defaultValues; // defaultValues

    const newMetadata = submittedData
      .filter((val: AssetMetadataType) => val.isCreated)
      .map((data: AssetMetadataType) => ({
        assetId: data.asset,
        metadataName: data.name,
        metadataValue: data.value,
      }));

    const updateMetadata = (
      defaultValues: AssetMetadataType[],
      data: AssetMetadataType[]
    ) =>
      data
        .filter((val: AssetMetadataType) => !val.isCreated)
        .filter(
          (d: AssetMetadataType, index: number) =>
            !isEqual(defaultValues[index], d)
        );

    const deleteMetadata = (
      defaultValues: AssetMetadataType[],
      data: AssetMetadataType[],
      updatedMetadata: AssetMetadataType[]
    ) =>
      defaultValues
        .filter(
          (val: AssetMetadataType, index: number) =>
            !data.some((d) => d.id === val.id)
        ) // remove data !== defaultValues
        .filter(
          (d: AssetMetadataType, index: number) =>
            d?.id !== updatedMetadata[index]?.id
        ); // remove  updated values from deleted values

    newMetadata.forEach(
      (data: {
        assetId: number;
        metadataName: string;
        metadataValue: string;
      }) => {
        mutate(data);
      }
    );

    const updatedMetadata = updateMetadata(metadataValues, submittedData);
    const deletedMetadata = deleteMetadata(
      metadataValues,
      submittedData,
      updatedMetadata
    );

    const formatedMetadata = updatedMetadata.map((data: AssetMetadataType) => ({
      assetId: data.asset,
      assetMetadataId: data.id,
      metadataName: data.name,
      metadataValue: data.value,
    }));

    formatedMetadata.forEach((data: any) => {
      mutateUpdate(data);
    });

    deletedMetadata.forEach((data: AssetMetadataType) => {
      if (data.id) {
        mutateDelete(data.id);
      }
    });
  };

export default function IdentifiersForm() {
  const { translate } = useLocales();
  const { id } = useParams();
  const { data, isLoading } = useFetchAssetMetadata(Number(id));
  const [metadataResult, setMetadataResult] = useState<
    AssetMetadataType[] | []
  >([]);

  const currentAssetPath = PATH_DASHBOARD.asset.view(Number(id));
  const { mutate } = useCreateMetadata({
    path: currentAssetPath,
  });
  const { mutate: mutateUpdate } = useUpdateMetadata({
    path: currentAssetPath,
  });
  const { mutate: mutateDelete } = useDeleteMetadata({
    path: currentAssetPath,
  });

  const defaultValues: { metadataValues: AssetMetadataType[] } | {} = {
    metadataValues: metadataResult, // initialize form default values
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewAMetadataSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, dirtyFields },
  } = methods;

  const isDirtyFields = Boolean(Object.keys(dirtyFields).length);
  const { fields, append, remove } = useFieldArray<AssetMetadataType | any>({
    control,
    name: "metadataValues",
  });

  useEffect(() => {
    if (data) {
      setValue("metadataValues", data); // inject form data into fields + avoid unecessary render
      setMetadataResult(data);
    }
  }, [data, setValue, setMetadataResult]);

  useEffect(() => {
    if (fields.length === 0) {
      append({
        isCreated: true,
        asset: Number(id),
      });
    }
  }, [fields.length, append, id]);

  if (isLoading) {
    return (
      <Box>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Grid
      item
      md={12}
      xs={12}
      my={3}
      pt={4}
      sx={{ px: { md: 2, sm: 0, xs: 0 }, mx: { md: 6, sm: 6, xs: 0 } }}
    >
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit((data) =>
          onSubmitMetadata(
            mutate,
            mutateUpdate,
            mutateDelete,
            defaultValues
          )(data)
        )}
      >
        <Stack direction="column" spacing={1}>
          {fields.map((field, index) => (
            <Stack
              key={`${field.id}-${index}`}
              direction="row"
              spacing={{ md: 2, xs: 1 }}
              mb={1}
            >
              <RHFTextField
                name={`metadataValues[${index}].name`}
                label={translate("asset.form.label.metadata.name")}
                defaultValue=""
              />
              <RHFTextField
                name={`metadataValues[${index}].value`}
                label={translate("asset.form.label.metadata.value")}
                defaultValue=""
              />
              <Box display="flex" alignItems="center">
                <IconButton
                  color="error"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <Iconify icon="mdi:garbage" width={20} />
                </IconButton>
              </Box>
            </Stack>
          ))}
        </Stack>

        <Stack spacing={3} alignItems="flex-end" mt={3}>
          <Button
            startIcon={<Iconify icon="eva:plus-fill" width={16} />}
            variant="text"
            color="primary"
            onClick={() => {
              append({
                isCreated: true,
                asset: Number(id),
              });
            }}
          >
            {translate("asset.actions.add_identifier")}
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!isDirtyFields}
          >
            {translate("asset.actions.save")}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Grid>
  );
}
