import { Helmet } from "react-helmet-async";
import { Card, Stack, Typography } from "@mui/material";

import AuthNewPasswordForm from "../../sections/auth/AuthNewPasswordForm";
import Logo from "../../components/logo/Logo";
import { MAXEN_LOGO_FULL } from "../../constants";
import { useLocales } from "../../locales";

export default function NewPasswordPage() {
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title> Change Password | Maxen</title>
      </Helmet>

      <Stack spacing={3} display="column" alignItems="center">
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
          <Typography variant="h3" paragraph>
            {translate("login.reset_password_title")}
          </Typography>
          <AuthNewPasswordForm islargeButton={true} />
        </Card>
      </Stack>
    </>
  );
}
