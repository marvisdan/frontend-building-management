import {
  Box,
  Button,
  Card,
  CardHeader,
  LinearProgress,
  Stack,
} from "@mui/material";
import { Key } from "react";
import { useNavigate } from "react-router";

import { ContactItem } from "../../../../components/contacts";

import { useAuthContext } from "../../../../auth/useAuthContext";
import { useFetchOrganizationContacts } from "../../../../hooks";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import { OrganizationContactType } from "../../../../types";

export default function BuildingContacts({
  title,
  buttonText,
  ...other
}: {
  title: string;
  buttonText: string;
}) {
  const navigate = useNavigate();
  const { accessToken } = useAuthContext();
  const { data, isLoading, isError, error } = useFetchOrganizationContacts({
    token: accessToken,
  });

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

  const navigateToContact = () => {
    navigate(PATH_DASHBOARD.contact.list);
  };

  return (
    <Card
      sx={{
        ...other,
      }}
    >
      <CardHeader title={title} />
      <Stack spacing={3} sx={{ p: 3 }}>
        {data
          .slice(0, 4)
          .map(
            (
              { thumbnail, name, title, email, id }: OrganizationContactType,
              key: Key
            ) => (
              <ContactItem
                key={`${key}-${id}`}
                {...{ id, name, thumbnail, title, email }}
              />
            )
          )}
        <Button
          variant="outlined"
          size="large"
          color="primary"
          onClick={navigateToContact}
        >
          {buttonText}
        </Button>
      </Stack>
    </Card>
  );
}
