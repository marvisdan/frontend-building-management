// @mui
import { alpha, styled } from "@mui/material/styles";
import { Box, Card, Avatar, Divider, Typography, Stack } from "@mui/material";
// components
import Image from "../image";
import SvgColor from "../svg-color";

// ----------------------------------------------------------------------

const StyledOverlay = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: "100%",
  height: "100%",
  position: "absolute",
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

// @types
export type IUserCard = {
  id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  role: string;
};

type Props = {
  user: IUserCard;
};

export default function UserCard({ user }: Props) {
  const { name, cover, role, avatarUrl } = user;

  return (
    <Card sx={{ textAlign: "center" }}>
      <Box sx={{ position: "relative" }}>
        <SvgColor
          src="/assets/shape_avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: "auto",
            position: "absolute",
            color: "background.paper",
          }}
        />

        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: "auto",
            position: "absolute",
          }}
        />
        <StyledOverlay />

        <Image src={cover} alt={cover} ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5 }}>
        {name}
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {role || "Developer"}
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        sx={{
          m: 2,
        }}
      >
        <Typography variant="body2">{"compagny name"}</Typography>
        <Typography variant="body2">{"(555) 555-5555 (Work)"}</Typography>
        <Typography variant="body2">{"(555) 555-5588 (Mobile)"}</Typography>
        <Typography variant="body2">{"(555) 555-5588 (Mobile)"}</Typography>
      </Stack>

      <Divider sx={{ borderStyle: "dashed" }} />
    </Card>
  );
}
