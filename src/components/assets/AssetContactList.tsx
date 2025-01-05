import {
  Box,
  Button,
  Card,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Key, useState } from "react";

import { OrganizationContactType } from "src/types";
import { CONTACT_NUMBER_LIST } from "../../constants";
import { useFetchAssetOrganizationContacts } from "../../hooks";
import { useLocales } from "../../locales";
import { ContactItem } from "../contacts";

const ContactList = ({ contacts, length }: { contacts: any; length: number }) =>
  contacts &&
  contacts
    .slice(0, length)
    .map(({ organizationcontact_details }: any, key: Key) => {
      const { thumbnail, name, title, email, id }: OrganizationContactType =
        organizationcontact_details;
      return (
        <ContactItem
          key={`${key}-${id}`}
          {...{ id, name, thumbnail, title, email }}
        />
      );
    });

export default function AssetContactList({
  title,
  buttonText,
  assetId,
  ...other
}: {
  title: string;
  buttonText: string;
  assetId: number;
}) {
  const { translate } = useLocales();
  const [numberOfContact, setNumberOfContact] =
    useState<number>(CONTACT_NUMBER_LIST);
  const { data, isLoading, isError, error } = useFetchAssetOrganizationContacts(
    {
      assetId,
    }
  );

  if (isLoading) {
    return (
      <Box mt={2}>
        <LinearProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box mt={2}>
        <h1>{error?.message}</h1>
      </Box>
    );
  }

  const handleAllContact = () => {
    setNumberOfContact(data?.length);
  };

  return (
    <Card
      sx={{
        ...other,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={3}
        pt={3}
      >
        <Typography variant="h6">{title}</Typography>
        {/* <Typography variant="body1">{data.length}</Typography> */}
      </Stack>
      {data?.length ? (
        <Stack spacing={3} p={3}>
          <ContactList contacts={data} length={numberOfContact} />
          {data?.length > numberOfContact ? (
            <Button
              variant="outlined"
              size="large"
              color="primary"
              onClick={handleAllContact}
            >
              {buttonText}
            </Button>
          ) : null}
        </Stack>
      ) : (
        <Typography variant="body1" sx={{ p: 3 }}>
          {translate("contacts.no_contact_list")}
        </Typography>
      )}
    </Card>
  );
}
