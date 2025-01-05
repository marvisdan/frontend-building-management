// @mui
import { Box, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
// auth
import { useAuthContext } from "../../../auth/useAuthContext";
// components
import { CustomAvatar } from "../../../components/custom-avatar";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  width: "100%",
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const { user } = useAuthContext();
  let displayName = "";
  if (user) {
    displayName =
      user.first_name &&
      user.last_name &&
      `${user.first_name} ${user.last_name}`;
  }

  return (
    <StyledRoot>
      <CustomAvatar
        src={user?.photoURL || "/assets/images/avatars/avatar_default.jpeg"}
        alt={displayName}
        name={displayName}
      />

      <Box sx={{ ml: 2, minWidth: 0 }}>
        <Typography variant="subtitle2" noWrap>
          {displayName}
        </Typography>

        {user?.role && (
          <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
            {user?.role}
          </Typography>
        )}
      </Box>
    </StyledRoot>
  );
}
