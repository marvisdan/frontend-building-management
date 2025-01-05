import { Container, Typography } from "@mui/material";

// components
import { ContactForm } from "./ContactForm";

// utils
import { useNavigate } from "react-router";
import useCreateContact from "../../hooks/useCreateContact";
import { useLocales } from "../../locales";

export default function CreateContactPage() {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth={"xl"}>
      <Typography variant="h3" sx={{ my: 3 }}>
        {translate("contacts.create_contact_title")}
      </Typography>
      <ContactForm handler={useCreateContact} goBack={handleGoBack} />
    </Container>
  );
}
