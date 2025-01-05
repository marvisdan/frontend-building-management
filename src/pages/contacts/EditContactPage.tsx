import { Container, Typography } from "@mui/material";

// components
import { ContactForm } from "./ContactForm";

// utils
import { useNavigate, useParams } from "react-router";
import useFetchOrganizationContactsById from "../../hooks/useFetchOrganizationContactById";
import useUpdateContact from "../../hooks/useUpdateContact";
import { useLocales } from "../../locales";

export default function EditeContactPage() {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { id } = useParams();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { data, isError, error, isLoading } = useFetchOrganizationContactsById(
    Number(id)
  );

  if (isLoading) {
    return (
      <Container maxWidth={"xl"}>
        <Typography variant="h3" sx={{ my: 3 }}>
          {"...Loading"}
        </Typography>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth={"xl"}>
        <Typography variant="h3" sx={{ my: 3 }}>
          {error?.message}
        </Typography>
      </Container>
    );
  }
  return (
    <Container maxWidth={"xl"}>
      <Typography variant="h3" sx={{ my: 3 }}>
        {translate("contacts.edit_contact_title")}
      </Typography>
      <ContactForm
        edit={true}
        handler={useUpdateContact}
        currentContact={data}
        goBack={handleGoBack}
      />
    </Container>
  );
}
