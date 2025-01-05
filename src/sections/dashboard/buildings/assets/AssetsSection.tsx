import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

// @mui
import { Card, Grid } from "@mui/material";

// components
import AssetFilterForm from "../../../../components/assets/AssetFilterForm";
import FormProvider from "../../../../components/hook-form";

import Filter from "../../../../components/filter/Filter";
import FilterButton from "../../../../components/filter/FilterButton";
import { useResponsive } from "../../../../hooks";
import NavFilter from "../../../../layouts/dashboard/nav/NavFilter";
import { useLocales } from "../../../../locales";
import AssetsContent from "./AssetsContent";

export type AssetItemProps = {
  name: string;
  description: string;
  thumbnail: string;
};

const AssetsSection = () => {
  const { translate } = useLocales();
  const [open, setOpen] = useState<boolean>(false);
  const isSmallScreen = useResponsive("down", "lg");
  const [filters, setFilters] = useState<{
    type: number | undefined;
    category: number | undefined;
    search: string | undefined;
  }>({
    type: undefined,
    category: undefined,
    search: "",
  });

  const filterTitle = translate("filters.form.search");

  const defaultValues = {
    search: "",
    // to implement multiple filters change types to => []
    assetcategory: "",
    assettype: "",
  };

  const FiltersAssetsSchema = Yup.object().shape({
    search: Yup.string(),
    // to implement multiple filters change type to  Yup.mixed()
    assetcategory: Yup.string().nullable(),
    assettype: Yup.string().nullable(),
  });

  const methods = useForm({
    resolver: yupResolver(FiltersAssetsSchema),
    defaultValues,
  });

  const { reset } = methods;

  const handleResetFilter = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    //reset form fields
    reset({
      search: "",
      // to implement multiple filters change types to => []
      assetcategory: "",
      assettype: "",
    });

    // reset filters
    setFilters({
      search: "",
      type: undefined,
      category: undefined,
    });
  };

  const onSubmit = async (
    formData: any,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event?.preventDefault();
    setFilters({
      search: formData.search,
      type: formData.assettype,
      category: formData.assetcategory,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <FormProvider methods={methods}>
      <FilterButton onClick={handleOpen} />
      <Grid container spacing={2} mt={2}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <Card>
            <Filter
              onReset={handleResetFilter}
              onSubmit={onSubmit}
              title={filterTitle}
              isSmallScreen={isSmallScreen}
            >
              <AssetFilterForm />
            </Filter>
          </Card>
        </Grid>
        <AssetsContent filters={filters} />
      </Grid>
      <NavFilter
        openNav={open}
        onCloseNav={handleClose}
        onResetFilter={handleResetFilter}
        onSubmit={onSubmit}
        title={translate("filters.form.search")}
      >
        <AssetFilterForm />
      </NavFilter>
    </FormProvider>
  );
};

export default AssetsSection;
