import { useState } from "react";
import { useParams } from "react-router";

import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useAuthContext } from "../../auth/useAuthContext";
import { filteredContacts } from "../../helpers";
import {
  useCreateAssetOrganizationContact,
  useFetchAssetOrganizationContacts,
  useFetchOrganizationContacts,
} from "../../hooks";
import { useLocales } from "../../locales";
import { OrganizationContactType } from "../../types";
import { CustomAvatar } from "../custom-avatar";

interface Props extends DialogProps {
  title?: string;
  onCreate?: VoidFunction;
  onUpdate?: VoidFunction;
  folderName?: string;
  onChangeFolderName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  open: boolean;
  onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void;
}

export default function AssetContactModal({
  title = "Select Contact",
  open,
  onClose,
  onCreate,
  onUpdate,
  folderName,
  onChangeFolderName,
  ...other
}: Props) {
  const { id } = useParams();
  const { accessToken } = useAuthContext();
  const [contactList, setContactList] = useState<OrganizationContactType[]>([]);
  const { translate } = useLocales();

  const { mutate: createContactMutate } = useCreateAssetOrganizationContact();
  const {
    data: assetContacts,
    isError,
    error,
  } = useFetchAssetOrganizationContacts({
    assetId: Number(id),
  });

  const {
    data: contacts,
    isLoading: isContactLoading,
    isError: isContactsError,
    error: contactsError,
    refetch,
  } = useFetchOrganizationContacts({
    token: accessToken,
    options: {
      retry: 2,
      enabled: false,
    },
  });

  const handleSubmit =
    (contactList: OrganizationContactType[]) => (assetId: number) => {
      const newContactList = contactList
        ? contactList.reduce(
            (acc: any[], contact: OrganizationContactType) => [
              ...acc,
              {
                assetId,
                organizationcontactId: contact.id,
              },
            ],
            []
          )
        : [];

      if (newContactList.length > 0) {
        newContactList.forEach((contact: OrganizationContactType) => {
          createContactMutate(contact);
        });
      }
      onClose();
    };

  if (isContactsError) {
    return (
      <Box m={2} alignItems="center" justifyContent="center">
        <Typography>{contactsError?.message}</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box m={2} alignItems="center" justifyContent="center">
        <Typography>{error?.message}</Typography>
      </Box>
    );
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {translate(title)}
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: "none" }}>
        <Autocomplete
          fullWidth
          multiple
          autoHighlight
          disableCloseOnSelect
          options={filteredContacts({
            contacts: contacts?.results,
            assetContacts: assetContacts,
          })}
          getOptionLabel={(option: OrganizationContactType) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          loading={isContactLoading}
          onFocus={refetch}
          onChange={(_, newValue) => {
            setContactList(newValue as never);
          }}
          renderOption={(props, option, { selected }) => (
            <Box component="li" sx={{ px: "8px !important" }} {...props}>
              <Box
                component="span"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ flexShrink: 0, mr: 2, fontSize: 22 }}
              >
                <Checkbox checked={selected} />
                <CustomAvatar
                  src={option.thumbnail || option.company}
                  alt={option.name ?? "N/A"}
                  name={option.name ?? "N/A"}
                  hasImage={Boolean(option.thumbnail)}
                  sx={{
                    width: "32px",
                    height: "32px",
                  }}
                  aria-label="company logo"
                />
              </Box>
              {option.name ?? "N/A"}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={translate("asset.form.contact.modal.select.label")}
              inputProps={{
                ...params.inputProps,
                readOnly: true,
              }}
            />
          )}
        />
      </DialogContent>

      <DialogActions>
        <Button
          color="primary"
          disabled={contactList?.length === 0}
          onClick={() => handleSubmit(contactList)(Number(id))}
        >
          {translate("asset.form.contact.modal.submit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
