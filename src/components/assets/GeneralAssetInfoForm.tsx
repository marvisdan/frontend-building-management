import { Grid, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { useAuthContext } from "../../auth/useAuthContext";
import { TWO_MINUTES } from "../../constants";
import { useFetchOrganizationSites } from "../../hooks";
import useFetchAssetCategories from "../../hooks/useFetchAssetCategories";
import useFetchAssetTypes from "../../hooks/useFetchAssetTypes";
import { useLocales } from "../../locales";
import { AssetCategoryType, CustomFile } from "../../types";
import {
  OptionsType,
  convertToBase64,
  formatAssetTypes,
  formatDataToSelectOptions,
} from "../../utils";
import { RHFSelect, RHFTextField, RHFUpload } from "../hook-form";

type GeneralAssetInfoProps = { isEdit?: boolean };

export default function GeneralAssetInfoForm({
  isEdit,
}: GeneralAssetInfoProps) {
  const { translate } = useLocales();
  const { accessToken } = useAuthContext();
  const { setValue, watch } = useFormContext();

  const { data, refetch } = useFetchOrganizationSites(
    accessToken,
    !isEdit
      ? {
          retry: 1,
          enabled: false,
          staleTime: TWO_MINUTES,
        }
      : undefined
  );

  const { data: assetTypesData, refetch: refetchAssetTypes } =
    useFetchAssetTypes({
      options: !isEdit
        ? {
            retry: 1,
            enabled: false,
            staleTime: TWO_MINUTES,
          }
        : undefined,
    });

  const { data: assetCategoriesData, refetch: refetchAssetCategories } =
    useFetchAssetCategories({
      options: !isEdit
        ? {
            retry: 1,
            enabled: false,
            staleTime: TWO_MINUTES,
          }
        : undefined,
    });
  const assetCategoryValue = watch("assetCategoryId");

  const handleDropImage = async (acceptedFiles: CustomFile[]) => {
    const file = acceptedFiles[0];
    const base64 = await convertToBase64(file);
    if (file) {
      setValue("thumbnail", base64 as CustomFile);
    }
  };

  const handleRemoveFile = () => {
    setValue("thumbnail", "");
  };

  const organizationSite = watch("organizationSiteId");
  const assetCategory = watch("assetCategoryId");
  const assetType = watch("assetTypeId");

  let renderOrgnaizationSitesSelect = (data: any, isEdit: boolean) => (
    <RHFSelect
      name="organizationSiteId"
      label={translate("asset.form.label.asset.building")}
      placeholder={translate("asset.form.label.asset.building")}
      onFocus={!isEdit ? refetch : null}
      InputLabelProps={{ shrink: organizationSite ? true : false }}
    >
      <option value="" />
      {formatDataToSelectOptions(data).map((option: OptionsType) => (
        <option key={option.id} value={option.code}>
          {option.label}
        </option>
      ))}
    </RHFSelect>
  );

  return (
    <Grid container spacing={3} direction={"row"}>
      <Grid item xs={12} md={12}>
        <Stack spacing={1} mt={3}>
          <Typography variant="h6" sx={{ color: "text.secondary", mt: 1 }}>
            {translate("asset.form.subtitle.asset_info")}
          </Typography>
          <RHFUpload
            name="thumbnail"
            maxSize={3145728}
            onDrop={handleDropImage}
            onDelete={handleRemoveFile}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <RHFTextField
          name="name"
          label={translate("asset.form.label.asset.name")}
          sx={{ mb: 3 }}
          defaultValue=""
        />

        <RHFTextField
          name="description"
          label={translate("asset.form.label.asset.description")}
          multiline
          rows={3}
          sx={{ mb: 3 }}
          defaultValue=""
        />

        <Stack spacing={2} mb={3}>
          <Typography variant="h6" sx={{ color: "text.secondary", mt: 1 }}>
            {translate("asset.form.subtitle.technical_details")}
          </Typography>
          <RHFSelect
            name="assetCategoryId"
            label={translate("filters.form.category")}
            sx={{ my: 1 }}
            onFocus={!isEdit ? refetchAssetCategories : null}
            InputLabelProps={{ shrink: assetCategory ? true : false }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setValue("assetCategoryId", Number(event.target.value));
            }}
          >
            <option value="" />
            {assetCategoriesData?.map((option: AssetCategoryType) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </RHFSelect>
          <RHFSelect
            name="assetTypeId"
            label={translate("filters.form.type")}
            placeholder={translate("filters.form.type")}
            disabled={!assetCategoryValue}
            sx={{ my: 1 }}
            InputLabelProps={{ shrink: Boolean(assetType) }}
            onFocus={!isEdit ? refetchAssetTypes : null}
          >
            <option value="" />
            {formatAssetTypes(assetTypesData, assetCategoryValue).map(
              (option) => (
                <option key={option.id} value={option.code}>
                  {option.label}
                </option>
              )
            )}
          </RHFSelect>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ color: "text.secondary", mt: 1 }}>
            {translate("asset.form.subtitle.location")}
          </Typography>
          {data && renderOrgnaizationSitesSelect(data, Boolean(isEdit))}
        </Stack>
      </Grid>
    </Grid>
  );
}
