import { Card, Link, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";

import Iconify from "../../components/iconify";
import Logo from "../../components/logo/Logo";
import { PATH_AUTH } from "../../routes/paths";
import AuthResetPasswordForm from "../../sections/auth/AuthResetPasswordForm";

import { MAXEN_LOGO_FULL } from "../../constants";
import { useLocales } from "../../locales";

export default function ResetPasswordPage() {
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title> Reset Password | Maxen</title>
      </Helmet>
      <Stack direction="column" alignItems="center" justifyContent="center">
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
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Typography variant="h4">
              {translate("login.forget_password_title")}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 5 }}>
              {translate("login.forget_password_description")}
            </Typography>

            <AuthResetPasswordForm />

            <Link
              to={PATH_AUTH.login}
              component={RouterLink}
              color="inherit"
              variant="subtitle2"
              sx={{
                mt: 3,
                mx: "auto",
                alignItems: "center",
                display: "inline-flex",
              }}
            >
              <Iconify icon="eva:chevron-left-fill" width={16} />
              {translate("login.go_back")}
            </Link>
          </Stack>
        </Card>
      </Stack>
    </>
  );
}
