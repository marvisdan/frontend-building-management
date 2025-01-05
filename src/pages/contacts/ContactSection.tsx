import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Card,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { useAuthContext } from "../../auth/useAuthContext";
import { Contact } from "../../components/contacts";
import Filter from "../../components/filter/Filter";
import FilterButton from "../../components/filter/FilterButton";
import FormProvider from "../../components/hook-form/FormProvider";
import { useFetchOrganizationContacts } from "../../hooks";
import useDeleteOrganizationContact from "../../hooks/useDeleteOrganizationContact";
import NavFilter from "../../layouts/dashboard/nav/NavFilter";
import { useLocales } from "../../locales";
import { OrganizationContactType } from "../../types";
import ContactFilterForm from "./ContactFilterForm";

export default function ContactSection({
  isSmallScreen,
}: {
  isSmallScreen?: boolean;
}) {
  const { translate } = useLocales();
  const { accessToken } = useAuthContext();
  const [open, setOpen] = useState<boolean>(false);
  const filterTitle = translate("filters.title");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [filters, setFilters] = useState<{
    // company: string | undefined;
    // title: string | undefined;
    search: string;
  }>({
    // company: "",
    // title: "",
    search: "",
  });
  const { data, isLoading, isError, error } = useFetchOrganizationContacts({
    token: accessToken,
    // company: filters.company,
    // title: filters.title,
    search: filters.search,
    limit: 25,
  });

  const { mutate } = useDeleteOrganizationContact();

  const onDeleteContact = (contactId: number) => {
    mutate(contactId);
  };

  // filter contact
  const defaultValues = {
    search: "",
    // company: "",
    // title: "",
  };

  const FiltersContactsSchema = Yup.object().shape({
    search: Yup.string(),
    // assetcategory: Yup.string().nullable(),
    // title: Yup.string().nullable(),
  });

  const methods = useForm({
    resolver: yupResolver(FiltersContactsSchema),
    defaultValues,
  });

  const { reset } = methods;

  const handleResetFilter = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // Reset form fields
    reset({
      search: "",
      // company: "",
      // title: "",
    });
    // reset filters
    setFilters({
      search: "",
    });
  };

  const onSubmit = async (
    formData: any,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event?.preventDefault();
    setFilters({
      search: formData.search,
      //TODO: ask Backend this filter (but ask before for the pagination)
      // company: formData.company,
      // title: formData.title,
    });
  };

  if (isError) {
    return (
      <Container data-testid="contacts-error-message" maxWidth={"xl"}>
        <Typography>{error?.message}</Typography>
      </Container>
    );
  }

  return (
    <FormProvider methods={methods}>
      <Grid container spacing={3} mt={2}>
        <FilterButton onClick={handleOpen} sx={{ ml: 3 }} />
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
              <ContactFilterForm />
            </Filter>
          </Card>
        </Grid>
        {isLoading ? (
          <Box data-testid="contacts-loader" mt={2}>
            <LinearProgress />
          </Box>
        ) : !data.results || data.results.length === 0 ? (
          <Grid
            item
            xs={12}
            md={9}
            spacing={2}
            container
            data-testid="no-contact"
          >
            <Typography variant="h6" m={2}>
              {translate("contacts.no_contact_list")}
            </Typography>
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            md={9}
            spacing={2}
            container
            data-testid="contact-list"
          >
            {data.results.map(
              ({
                thumbnail,
                id,
                name,
                title,
                company,
                phone,
                email,
                organization,
              }: OrganizationContactType) => (
                <Contact
                  key={id}
                  id={id}
                  thumbnail={thumbnail}
                  name={name}
                  title={title}
                  company={company}
                  phone={phone}
                  email={email}
                  onDelete={onDeleteContact}
                  organization={organization}
                  editable
                />
              )
            )}
          </Grid>
        )}
        <NavFilter
          openNav={open}
          onCloseNav={handleClose}
          onResetFilter={handleResetFilter}
          onSubmit={onSubmit}
          title={translate("filters.form.search")}
          isSmallScreen={isSmallScreen}
        >
          <ContactFilterForm />
        </NavFilter>
      </Grid>
    </FormProvider>
  );
}
