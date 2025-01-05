import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Card, Stack, Typography } from "@mui/material";

import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";

import { useLocales } from "../../locales";

import { MAXEN_LOGO_FULL } from "../../constants";
import { PATH_AUTH } from "../../routes/paths";

import Logo from "../../components/logo/Logo";

export default function NewPasswordPage() {
  const { translate } = useLocales();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title> Password Changed | Maxen</title>
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
          <CheckCircleIcon
            sx={{
              width: 68,
              height: "auto",
            }}
            color="success"
          />
          <Typography
            variant="h4"
            paragraph
            sx={{
              marginTop: 3,
            }}
          >
            {translate("login.password_changed_content")}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              marginTop: 1,
            }}
            onClick={() => navigate(PATH_AUTH.login)}
          >
            {translate("login.password_changed_button")}
          </Button>
        </Card>
      </Stack>
    </>
  );
}
