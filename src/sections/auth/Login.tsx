import { Card, Stack, Typography } from "@mui/material";

import AuthLoginForm from "./AuthLoginForm";
import Logo from "../../components/logo/Logo";

import { StyledRoot } from "../../layouts/login/styles";
import { MAXEN_LOGO_FULL } from "../../constants";
import { useLocales } from "../../locales";

export default function Login() {
  const { translate } = useLocales();

  return (
    <StyledRoot
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        direction="column"
        sx={{
          maxWidth: "368px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo
          src={MAXEN_LOGO_FULL}
          sx={{ mb: 5, width: 206, height: "auto" }}
        />
        <Card
          raised
          sx={{
            padding: 4,
            maxWidth: "md",
          }}
        >
          <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
            <Typography variant="h4">{translate("login.title")}</Typography>
          </Stack>
          <AuthLoginForm />
        </Card>
      </Stack>
    </StyledRoot>
  );
}
