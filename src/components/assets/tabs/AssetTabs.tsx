import { Box, Tabs as MUITabs, Tab } from "@mui/material";
import { useMemo, useState } from "react";

import { useLocales } from "../../../locales";
import { useTabsStore } from "../../../store/useTabsStore";
import displayBorderRadiusLevel from "../../tabs/displayBorderRadiusLevel";
import displayColorLevel from "../../tabs/displayColorLevel";
import { TabContent } from "../../tabs/index";
import { tabsType } from "../../tabs/types";

export type formatTabsType = {
  value: string;
  label: string;
  level: number;
  maxLevel: number;
};

const FormatedTabs = ({
  tabs,
  maxLevel,
  rootTab,
}: {
  tabs: tabsType[];
  maxLevel: number;
  rootTab?: string;
}) =>
  tabs.map(({ value, label, subLevel, level }: tabsType) => ({
    value,
    label,
    level,
    maxLevel,
    rootTab,
    component:
      !subLevel || subLevel.length === 0 ? (
        <TabContent tab={rootTab as string} />
      ) : (
        <AssetTabs level={level + 1} tabs={subLevel} maxLevel={maxLevel} />
      ),
  }));

type TabsProps = {
  tabs: tabsType[];
  level: number;
  isToplevel?: boolean;
  maxLevel: number;
};

export default function AssetTabs({
  tabs,
  level,
  isToplevel,
  maxLevel,
}: TabsProps) {
  const { translate } = useLocales();
  const rootTabs = useTabsStore((state) => state.tabs.levels);
  const currentTabFirstLevel = useTabsStore((state) => state.currentTab);
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const setCurrentTabFirstLevel = useTabsStore((state) => state.setCurrentTab);

  const bgcolorTabs: string = useMemo(() => displayColorLevel(level), [level]);

  const storedTab: string = level === 0 ? currentTabFirstLevel : currentTab;

  const borderRadiusTabs: string = useMemo(
    () => displayBorderRadiusLevel({ level, currentTab: storedTab, tabs }),
    [level, storedTab, tabs]
  );

  const rootTab =
    storedTab && rootTabs.find((el: tabsType) => el.value === storedTab)?.value;

  return (
    <Box>
      <Box
        sx={{
          border: (theme) => `solid ${theme.palette.divider}`,
          borderWidth: isToplevel ? "1px" : "0 1px 1px 1px",
          borderRadius: borderRadiusTabs,
          bgcolor: bgcolorTabs,
        }}
      >
        <MUITabs
          sx={{
            px: 3,
          }}
          value={storedTab}
          onChange={(_, newValue: string) => {
            if (level === 0) {
              setCurrentTabFirstLevel(newValue);
            } else {
              setCurrentTab(newValue);
            }
          }}
        >
          {FormatedTabs({ tabs, maxLevel }).map(
            ({ value, label }: formatTabsType) => (
              <Tab
                key={value}
                label={translate(label)}
                value={value}
                sx={{ textTransform: "initial" }}
              />
            )
          )}
        </MUITabs>
      </Box>
      <>
        {FormatedTabs({
          tabs,
          maxLevel,
          rootTab: (rootTab as string) || currentTab,
        }).map(
          (tab: {
            value: string;
            label: string;
            level: number;
            maxLevel: number;
            component: JSX.Element;
          }) =>
            tab.value === storedTab && (
              <div key={tab.value}>{tab.component}</div>
            )
        )}
      </>
    </Box>
  );
}
