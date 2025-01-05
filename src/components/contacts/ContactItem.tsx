import { Box, Stack, Typography } from "@mui/material";

import { CustomAvatar } from "../custom-avatar";

type Props = {
  id: number;
  name: string;
  thumbnail: string | undefined;
  title: string;
  email: string | undefined;
};

export default function ContactItem({
  id,
  name,
  thumbnail,
  title,
  email,
}: Props) {
  return (
    <Stack direction="row" alignItems="center" key={id} spacing={2}>
      <CustomAvatar
        src={thumbnail || name}
        alt={name || "N/A"}
        name={name || "N/A"}
        hasImage={Boolean(thumbnail)}
        sx={{
          width: 60,
          height: 60,
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
        aria-label="company logo"
      />

      <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }} noWrap>
          {name}
        </Typography>

        <Typography variant="body2" noWrap>
          {title}
        </Typography>

        {email && (
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {email}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
