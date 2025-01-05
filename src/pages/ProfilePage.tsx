import {
  Box,
  Container,
  Tabs as MUITabs,
  Tab,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { PROFILE_TABS } from "../constants";
import { useLocales } from "../locales";
import ChangePasswordTab from "../sections/profile/ChangePasswordTabProfile";
import GeneralTabProfile from "../sections/profile/GeneralTabProfile";
import { TabsType, Translate } from "../types";

const ProfileTabs = (translate: Translate): TabsType[] => [
  {
    value: PROFILE_TABS.general,
    label: translate("tabs.profile.general"),
    component: <GeneralTabProfile />,
  },
  // {
  //   value: PROFILE_TABS.communication,
  //   label: translate("tabs.profile.communication"),
  //   component: <div>Communication preferences</div>,
  // },
  {
    value: PROFILE_TABS.change_password,
    label: translate("tabs.profile.change_password"),
    component: <ChangePasswordTab />,
  },
];

const ProfilePage = () => {
  const { translate } = useLocales();
  const [currentTab, setCurrentTab] = useState(PROFILE_TABS.general);

  return (
    <Container>
      <Typography variant="h3" component="h1" paragraph>
        {translate("profile.title")}
      </Typography>
      <Box>
        <MUITabs
          sx={{
            px: 3,
            backgroundColor: "background.paper",
            borderRadius: 1,
          }}
          value={currentTab}
          onChange={(_, newValue: string) => {
            setCurrentTab(newValue);
          }}
        >
          {ProfileTabs(translate).map(({ value, label }) => (
            <Tab
              key={value}
              label={label}
              value={value}
              disabled={value === PROFILE_TABS.communication}
              sx={{ textTransform: "initial" }}
            />
          ))}
        </MUITabs>
      </Box>

      {ProfileTabs(translate).map(
        (tab) =>
          tab.value === currentTab && (
            <Box key={tab.value} mt={5}>
              {tab.component}
            </Box>
          )
      )}
    </Container>
  );
};

export default ProfilePage;
