import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import AssetContactModal from "../../../../../components/assets/AssetContactModal";
import { Contact } from "../../../../../components/contacts";
import {
  useDeleteAssetOrganizationContact,
  useFetchAssetOrganizationContacts,
} from "../../../../../hooks";
import { useLocales } from "../../../../../locales";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { AssetOrganizationContactType } from "../../../../../types";

export default function ContactTab() {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { translate } = useLocales();
  const { mutate } = useDeleteAssetOrganizationContact();
  const {
    data: assetContacts,
    isLoading,
    error,
    isError,
  } = useFetchAssetOrganizationContacts({
    assetId: Number(id),
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = (
    _?: {},
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick") {
      return;
    } else {
      setOpenModal(false);
    }
  };

  const onDeleteContact = (contactId: number) => {
    mutate(contactId);
  };

  if (isError) {
    return (
      <Box m={2} alignItems="center" justifyContent="center">
        <Typography>{error?.message}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Button variant="contained" onClick={handleOpenModal}>
        {translate("asset.form.contact.modal.title")}
      </Button>
      <Box mt={3}>
        {isLoading ? (
          <Box data-testid="asset-contact-loader" mt={2}>
            <LinearProgress />
          </Box>
        ) : !assetContacts || assetContacts.length === 0 ? (
          <Box m={2} data-testid="asset-contact-error-message">
            <Typography
              display="flex"
              variant="h6"
              alignItems="center"
              justifyContent="center"
            >
              {translate("contacts.no_contact")}
              <Link
                to={PATH_DASHBOARD.contact.list}
                component={RouterLink}
                sx={{ display: "contents" }}
              >
                {translate("contacts.link")}
              </Link>
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {assetContacts.reduce(
              (
                acc: AssetOrganizationContactType[],
                val: AssetOrganizationContactType
              ) => {
                if (val.organizationcontact_details) {
                  const { id, thumbnail, name, title, company, email, phone } =
                    val.organizationcontact_details;

                  return [
                    ...acc,
                    <Contact
                      key={id}
                      id={id}
                      thumbnail={thumbnail}
                      name={name}
                      title={title}
                      company={company}
                      phone={phone}
                      email={email}
                      onDelete={() => onDeleteContact(val.id)}
                    />,
                  ];
                }
                return acc;
              },
              []
            )}
          </Grid>
        )}
        <AssetContactModal
          open={openModal}
          title={translate("asset.form.contact.modal.title")}
          onClose={handleCloseModal}
        />
      </Box>
    </>
  );
}
