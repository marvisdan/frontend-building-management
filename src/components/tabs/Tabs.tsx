import { Box, Tabs as MUITabs, Tab } from "@mui/material";
import { useState } from "react";

import { Theme } from "@mui/material/styles/createTheme";
import { EDIT_ASSET_TABS } from "../../constants";
import { useLocales } from "../../locales";
import { TabsType, Translate } from "../../types";

interface TabPanelProps {
  children?: React.ReactNode;
  borderRadius?: string;
  bgcolor?: string;
}

const TabPanel = ({ children, borderRadius, bgcolor }: TabPanelProps) => {
  const borderColor = (theme: Theme) =>
    bgcolor === "transparent" ? bgcolor : theme.palette.divider;
  return (
    <Box
      sx={{
        px: { md: 3, sm: 2, xs: 1 },
        bgcolor,
        borderRadius,
        border: (theme) => ` solid ${borderColor(theme)}`,
      }}
    >
      {children}
    </Box>
  );
};

export default function Tabs({
  value,
  tabs,
  disabledTab,
  borderRadiusTabs = "8px 8px 0 0",
  borderRadiusPanel = "0 0 8px 8px",
}: {
  value: string;
  tabs: (translate: Translate) => TabsType[];
  disabledTab?: string[];
  borderRadiusTabs?: string;
  borderRadiusPanel?: string;
  bgcolorPanel?: string;
}) {
  const { translate } = useLocales();
  const [currentTab, setCurrentTab] = useState<string>(value);

  return (
    <Box>
      <MUITabs
        sx={{
          px: { md: 2, sm: 2, xs: 0 },
          mb: 2,
          border: (theme) => `solid ${theme.palette.divider}`,
          borderWidth: "1px",
          bgcolor: "greydegraded.light",
          borderRadius: borderRadiusTabs,
        }}
        value={currentTab}
        onChange={(_, newValue: string) => {
          setCurrentTab(newValue);
        }}
      >
        {tabs(translate).map(({ value, label }) => (
          <Tab
            key={value}
            label={label}
            value={value}
            disabled={disabledTab?.includes(value)}
            sx={{ textTransform: "initial" }}
          />
        ))}
      </MUITabs>

      {tabs(translate).map(
        ({ value, component }) =>
          value === currentTab && (
            <TabPanel
              borderRadius={borderRadiusPanel}
              key={value}
              bgcolor={
                value === EDIT_ASSET_TABS[EDIT_ASSET_TABS.Contact]
                  ? "transparent"
                  : "background.paper"
              }
            >
              {component}
            </TabPanel>
          )
      )}
    </Box>
  );
}
