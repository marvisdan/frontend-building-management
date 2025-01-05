import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Avatar, Card, IconButton, Stack, Typography } from "@mui/material";

import { User } from "src/types";
import { useLocales } from "../../locales";

type ProfileInfosPros = {
  handleEditProfile: () => void;
  user: User;
};

const Profileinfos = ({ handleEditProfile, user }: ProfileInfosPros) => {
  const { translate } = useLocales();
  return (
    <Card
      sx={{
        maxWidth: "624px",
      }}
    >
      <Stack spacing={2} padding={3} direction="column">
        <Stack
          alignItems="flex-start"
          justifyContent="space-between"
          direction="row"
        >
          <Stack spacing={3} alignItems="flex-start" direction="row">
            <Avatar
              src={user?.settings?.profile_picture}
              sx={{
                width: { md: 64 },
                height: { md: 64 },
              }}
            />
            <Stack>
              <Typography variant="h6">{user?.name}</Typography>
              {/* <Typography variant="body2">{"Job Title"}</Typography> */}
            </Stack>
          </Stack>

          <IconButton onClick={handleEditProfile}>
            <EditOutlinedIcon />
          </IconButton>
        </Stack>
        <Stack spacing={{ md: 0.5 }}>
          {/* TODO: Backend send a list of organizations, have to send to frontend only ONE organization bound to the user  */}
          {/* <Typography variant="subtitle2" noWrap>
          {"Company name"}
        </Typography> */}
          {/* <Typography variant="subtitle2" noWrap>
          {"(555) 555-5555 (Work)"}
        </Typography>
        <Typography variant="subtitle2" noWrap>
          {"(555) 555-5588 (Mobile)"}
        </Typography> */}
          <Typography variant="subtitle2" noWrap>
            {"Email: "}
            {`${user?.email}`
              ? `${user?.email}`
              : translate("user_profile.none")}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default Profileinfos;
