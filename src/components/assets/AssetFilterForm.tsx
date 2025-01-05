import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { useEffect } from "react";
import { AssetCategoryType } from "src/types";
import { TWO_MINUTES } from "../../constants";
import useFetchAssetCategories from "../../hooks/useFetchAssetCategories";
import useFetchAssetTypes from "../../hooks/useFetchAssetTypes";
import { useLocales } from "../../locales";
import { formatAssetTypes } from "../../utils";
import { RHFSelect } from "../hook-form";
import Iconify from "../iconify/Iconify";

export default function AssetFilterForm() {
  const { translate } = useLocales();
  const { control, watch, setValue } = useFormContext();
  const category = watch("assetcategory");

  const { data: assetTypesData, refetch: refetchAssetTypes } =
    useFetchAssetTypes({
      options: {
        retry: 2,
        enabled: false,
        staleTime: TWO_MINUTES,
      },
    });

  const { data: assetCategoriesData, refetch: refetchAssetCategories } =
    useFetchAssetCategories({
      options: {
        retry: 2,
        enabled: false,
        staleTime: TWO_MINUTES,
      },
    });

  useEffect(() => {
    setValue("assettype", "");
  }, [setValue, category]);

  return (
    <Stack
      spacing={3}
      sx={{
        pb: 2,
        px: { md: 0, lg: 2 },
        flexShrink: 0,
      }}
    >
      <Controller
        name="search"
        control={control}
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <TextField
            onChange={onChange}
            name={name}
            value={value}
            fullWidth
            placeholder={translate("filters.form.search")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ ml: 1, color: "text.disabled" }}
                  />
                </InputAdornment>
              ),
              sx: { pr: 0.5 },
            }}
            sx={{ my: 1 }}
            helperText={error?.message}
          />
        )}
      />
      <Typography color="text.disabled" variant="overline" sx={{ my: 1 }}>
        {translate("filters.form.category").toUpperCase()}
      </Typography>
      {/* NB: Not able to implement te autocomplete multiple item now cause: 
      the backend does not support the multiple item for assetType and assetCategory. 1- fix Backend first, 2- and changes category and types value to arrays */}{" "}
      <RHFSelect
        name="assetcategory"
        label={translate("filters.form.category")}
        placeholder={translate("filters.form.category")}
        sx={{ my: 1 }}
        onFocus={refetchAssetCategories}
      >
        <option value="" />
        {assetCategoriesData?.map((option: AssetCategoryType) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </RHFSelect>
      <RHFSelect
        name="assettype"
        label={translate("filters.form.type")}
        placeholder={translate("filters.form.type")}
        sx={{ my: 1 }}
        onFocus={() => {
          refetchAssetTypes();
        }}
        disabled={!category}
      >
        <option value="" />
        {formatAssetTypes(assetTypesData, Number(category)).map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </RHFSelect>
    </Stack>
  );
}
