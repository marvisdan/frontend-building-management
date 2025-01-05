import { InputAdornment, Stack, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import Iconify from "../../components/iconify/Iconify";

import { useLocales } from "../../locales";

export default function ContactFilterForm() {
  const { translate } = useLocales();
  const { control } = useFormContext();
  return (
    <Stack
      spacing={3}
      sx={{
        pb: 2,
        px: { md: 0, lg: 1 },
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

      {/* <Typography color="text.disabled" variant="overline" sx={{ my: 1 }}>
        {translate("filters.form.category").toUpperCase()}
      </Typography> */}

      {/* <RHFSelect
        name="buildings"
        label={"Building"}
        placeholder={"Building"}
        sx={{ my: 1 }}
      >
        <option value="" />
        {contactCompany.map((label, index) => (
          <option key={index} value={index}>
            {label}
          </option>
        ))}
      </RHFSelect>
       */}
      {/* <RHFSelect
        name="type"
        label={translate("filters.form.type")}
        placeholder={translate("filters.form.type")}
        sx={{ my: 1 }}
      >
        <option value="" />
        {formatAssetTypes(assetTypesMock).map((option) => (
          <option key={option.id} value={option.code}>
            {option.label}
          </option>
        ))}
      </RHFSelect> */}
      {/* <RHFSelect
        name="company"
        label={"Supplier (company)"}
        placeholder={"Supplier (company)"}
        sx={{ my: 1 }}
        disabled
      >
        <option value="" />
        {contactCompany.map((label, index) => (
          <option key={index} value={index}>
            {label}
          </option>
        ))}
      </RHFSelect>

      <RHFSelect
        name="title"
        label={"Title"}
        placeholder={"Title"}
        sx={{ my: 1 }}
        disabled
      >
        <option value="" />
        {contactTitle.map((label, index) => (
          <option key={index} value={index}>
            {label}
          </option>
        ))}
      </RHFSelect>

      <RHFSelect
        name="discipline"
        label={"Discipline"}
        placeholder={"Discipline"}
        sx={{ my: 1 }}
        disabled
      >
        <option value="" />
        {contactDiscipline.map((label, index) => (
          <option key={index} value={index}>
            {label}
          </option>
        ))}
      </RHFSelect> */}
    </Stack>
  );
}
