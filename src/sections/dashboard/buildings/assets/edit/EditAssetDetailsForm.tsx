import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

import { useAuthContext } from "../../../../../auth/useAuthContext";
import GeneralAssetInfo from "../../../../../components/assets/GeneralAssetInfoForm";
import { NewAssetSchema } from "../../../../../components/assets/schemas/asset";
import FormProvider from "../../../../../components/hook-form/FormProvider";
import { useEditAsset, useFetchAssetById } from "../../../../../hooks";
import { useLocales } from "../../../../../locales";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { Asset, EditAssetType } from "../../../../../types";

type FormValuesProps = EditAssetType;

export const onSubmitAsset =
  (
    mutate: UseMutateFunction<
      any,
      AxiosError<unknown, any>,
      EditAssetType,
      unknown
    >,
    onClose?: () => void
  ) =>
  async (data: FormValuesProps, generalDataInfo: Asset | undefined) => {
    let editAsset: EditAssetType = {
      id: data.id,
      name: data.name,
      description: data.description,
      assetCategoryId: data.assetCategoryId && Number(data.assetCategoryId),
      assetTypeId: data.assetTypeId && Number(data.assetTypeId),
      organizationSiteId:
        data.organizationSiteId && Number(data.organizationSiteId),
      organizationContacts: data.organizationContacts,
    };

    if (
      data.thumbnail === "" ||
      (data.thumbnail &&
        generalDataInfo?.thumbnail &&
        data.thumbnail.slice(0, 100) !==
          generalDataInfo.thumbnail.slice(0, 100))
    ) {
      editAsset = {
        ...editAsset,
        thumbnail: data.thumbnail,
      };
    }
    await mutate(editAsset);
    onClose && onClose();
  };

export default function EditAssetDetailsForm() {
  const { translate } = useLocales();
  const { accessToken } = useAuthContext();
  const { id } = useParams();
  const { data: generalDataInfo, isSuccess } = useFetchAssetById({
    token: accessToken,
    id,
  });

  const defaultValues: EditAssetType | {} = useMemo(
    () => ({
      id,
      name: generalDataInfo?.name,
      description: generalDataInfo?.description,
      assetCategoryId:
        generalDataInfo?.assetcategory && Number(generalDataInfo.assetcategory),
      assetTypeId:
        generalDataInfo?.assettype && Number(generalDataInfo.assettype),
      organizationSiteId: generalDataInfo?.organizationsite?.id,
      organizationContacts: generalDataInfo?.organizationcontacts,
      thumbnail: generalDataInfo?.thumbnail,
    }),
    [generalDataInfo, id]
  );
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewAssetSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      reset(defaultValues);
      // We set a thumnail value cause Unable to assign a value to the RHFUPload in order to be a controlled component
      // setValue("thumbnail", `${generalDataInfo?.thumbnail}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const { mutate } = useEditAsset(PATH_DASHBOARD.asset.view(Number(id)));

  return (
    <Grid
      item
      md={12}
      xs={12}
      my={3}
      py={2}
      sx={{ px: { md: 8, sm: 2, xs: 0 }, mx: { md: 8, sm: 4, xs: 1 } }}
    >
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit((data) =>
          onSubmitAsset(mutate)(data, generalDataInfo)
        )}
      >
        <Box>
          <Typography variant="h6" m={1}>
            {translate("tabs.edit_asset.subtitle")}
          </Typography>
          <Typography variant="body2" m={1}>
            {translate("asset.form.subtitle.mandatory")}
          </Typography>
          <Grid container spacing={3} direction="row">
            <Grid item xs={12} md={12}>
              <GeneralAssetInfo isEdit />
              <Stack alignItems="flex-end" mt={3}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {translate("asset.actions.save")}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </Grid>
  );
}
