import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header, { HeaderButtonType } from "../../components/header/Header";
import { useSettingsContext } from "../../components/settings";
import { useResponsive } from "../../hooks";
import { useLocales } from "../../locales";
import { PATH_DASHBOARD } from "../../routes/paths";

import ContactSection from "./ContactSection";

export default function ContactsPage() {
  const { translate } = useLocales();
  const { themeStretch } = useSettingsContext();
  const isSmallScreen = useResponsive("down", "lg");
  const navigate = useNavigate();

  const headerButton: HeaderButtonType = {
    startIcon: <AddOutlinedIcon />,
    onClick: () => navigate(PATH_DASHBOARD.contact.create),
    variant: "contained",
    color: "primary",
    label: translate("contacts.actions.create"),
    key: translate("contacts.actions.create"),
  };

  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      <Header
        headerTitle={translate("contacts.title")}
        headerButton={headerButton}
      />
      <ContactSection isSmallScreen={isSmallScreen} />
    </Container>
  );
}
