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

import { NewSpecificationSchema } from "../../../../../components/assets/schemas/specifications";
import { RHFSelect, RHFTextField } from "../../../../../components/hook-form";
import FormProvider from "../../../../../components/hook-form/FormProvider";
import Iconify from "../../../../../components/iconify/Iconify";

import {
  useCreateSpecification,
  useDeleteSpecification,
  useFetchAssetSpecifications,
  useFetchMeasurementUnits,
  useFetchSpecifications,
  useUpdateSpecification,
} from "../../../../../hooks";
import { useLocales } from "../../../../../locales";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { MeasurementUnitType, SpecificationsType } from "../../../../../types";

export type FormValuesProps = {
  specificationValues: SpecificationFormType[];
};

type SpecificationFormType = {
  asset: number;
  id: number;
  measurementunit: number;
  specification: number;
  value: string;
  unit: string;
  isCreated?: boolean;
};

type SpecificationSubmittedType = {
  assetId: number;
  specificationId: number;
  measurementUnitId: number;
  value: string;
};

const onSubmitSpecifications =
  (
    defaultValues: any,
    mutate: UseMutateFunction<
      any,
      AxiosError<unknown, any>,
      {
        assetId: number;
        specificationId: number;
        value: string;
        measurementUnitId: number;
      },
      unknown
    >,

    mutationUpdate: UseMutateFunction<
      any,
      AxiosError<unknown, any>,
      unknown,
      unknown
    >,
    mutationDelete: UseMutateFunction<
      any,
      AxiosError<unknown, any>,
      number,
      unknown
    >
  ) =>
  async (data: FormValuesProps) => {
    const submittedData = data.specificationValues;
    const { specificationValues } = defaultValues; // defaultValues

    const newSpecification = submittedData
      .filter((val: SpecificationFormType) => val.isCreated)
      .map((data: SpecificationFormType) => ({
        assetId: data.asset,
        assetSpecificationId: Number(data.id),
        specificationId: Number(data.specification),
        value: data.value,
        measurementUnitId: data.measurementunit,
      }));

    const updateSpecification = (
      defaultValues: SpecificationFormType[],
      data: SpecificationFormType[]
    ) =>
      data
        .filter((val: SpecificationFormType) => !val.isCreated)
        .filter(
          (d: SpecificationFormType, index: number) =>
            !isEqual(defaultValues[index], d)
        );

    const deleteSpecification = (
      defaultValues: SpecificationFormType[],
      data: SpecificationFormType[],
      updatedSpecification: SpecificationFormType[]
    ) =>
      defaultValues
        .filter(
          (val: SpecificationFormType, index: number) =>
            !data.some((d) => d.id === val.id)
        ) // remove data !== defaultValues
        .filter(
          (d: SpecificationFormType, index: number) =>
            d?.id !== updatedSpecification[index]?.id
        ); // remove  updated values from deleted values

    const updatedSpecification = updateSpecification(
      specificationValues,
      submittedData
    );
    const deletedSpecification = deleteSpecification(
      specificationValues,
      submittedData,
      updatedSpecification
    );

    const formatedSpecificationUpdate = updateSpecification(
      specificationValues,
      submittedData
    ).map((data: SpecificationFormType) => ({
      assetId: data.asset,
      label: "", // TODO: remove label required into the backend, its useless
      assetSpecificationId: Number(data.id),
      specificationId: Number(data.specification),
      value: data.value,
      measurementUnitId: data.measurementunit,
    }));

    formatedSpecificationUpdate.forEach((data: SpecificationSubmittedType) => {
      mutationUpdate(data);
    });

    deletedSpecification.forEach((data: SpecificationFormType) => {
      if (data.id) {
        mutationDelete(data.id);
      }
    });

    if (newSpecification.length === 1 && !newSpecification[0].specificationId) {
      return;
    } else {
      newSpecification.forEach((data: SpecificationSubmittedType) => {
        mutate(data);
      });
    }
  };

export default function SpecificationForm() {
  const { translate } = useLocales();
  const { id } = useParams();
  const [specificationResult, setSpecificationResult] = useState<any[] | []>(
    []
  );

  const { data: assetSpecifications, isLoading: isAssetSpecificationsLoading } =
    useFetchAssetSpecifications(Number(id));
  const { data: specifications, isLoading: isSpecificationsLoading } =
    useFetchSpecifications();
  const { data: units, isLoading: isUnitsLoading } = useFetchMeasurementUnits();
  const defaultValues: { specificationValues: SpecificationFormType[] } | {} = {
    specificationValues: specificationResult, // initialize form default values
  };

  const currentAssetPath = PATH_DASHBOARD.asset.view(Number(id));
  const { mutate } = useCreateSpecification({
    path: currentAssetPath,
  });
  const { mutate: mutationUpdate } = useUpdateSpecification({
    path: currentAssetPath,
  });

  const { mutate: mutationDelete } = useDeleteSpecification({
    path: currentAssetPath,
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewSpecificationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, dirtyFields },
  } = methods;

  const isDirtyFields = Boolean(Object.keys(dirtyFields).length);
  const { fields, append, remove } = useFieldArray<SpecificationFormType | any>(
    {
      control,
      name: "specificationValues",
    }
  );

  useEffect(() => {
    if (assetSpecifications) {
      //TODO: Create a separate function and unit test
      const formatedspecifications = assetSpecifications.reduce(
        (acc: SpecificationFormType[], curr: SpecificationFormType) => [
          ...acc,
          {
            asset: curr.asset,
            id: curr.id,
            specification: curr.specification,
            measurementunit: curr.measurementunit,
            value: curr.value,
            unit: curr.unit,
          },
        ],
        []
      );

      setValue("specificationValues", formatedspecifications); // inject form data into fields + avoid unecessary render
      setSpecificationResult(formatedspecifications);
    }
  }, [assetSpecifications, setValue, setSpecificationResult]);

  useEffect(() => {
    if (fields.length === 0) {
      append({
        isCreated: true,
        asset: Number(id),
      });
    }
  }, [fields.length, append, id]);

  if (
    isAssetSpecificationsLoading ||
    isSpecificationsLoading ||
    isUnitsLoading
  ) {
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
          onSubmitSpecifications(
            defaultValues,
            mutate,
            mutationUpdate,
            mutationDelete
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
              <RHFSelect
                name={`specificationValues[${index}].specification`}
                label={translate("asset.form.label.specification.name")}
                sx={{ my: 1 }}
              >
                <option value="" />
                {specifications &&
                  specifications.results &&
                  specifications.results.map(
                    ({ id, name }: SpecificationsType) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    )
                  )}
              </RHFSelect>
              <RHFTextField
                name={`specificationValues[${index}].value`}
                label={translate("asset.form.label.specification.value")}
                defaultValue=""
              />
              <RHFSelect
                name={`specificationValues[${index}].measurementunit`}
                label={translate("asset.form.label.specification.unit")}
                sx={{ my: 1 }}
              >
                <option value="" />
                {units &&
                  units.results &&
                  units.results.map(({ id, name }: MeasurementUnitType) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
              </RHFSelect>
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
            {translate("asset.actions.add_specification")}
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
