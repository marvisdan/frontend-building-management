import { tabsType } from ".";

export default function displayBorderRadiusLevel({
  level,
  currentTab,
  tabs,
}: {
  level: number;
  currentTab: string;
  tabs: tabsType[];
}): string {
  const currentTabObject: any = tabs.find(
    (element: tabsType) => element.value === currentTab
  );

  if (
    currentTabObject.level === 0 &&
    currentTabObject.hasOwnProperty("subLevel")
  ) {
    return "8px 8px 0 0";
  }

  if (
    currentTabObject.level === 0 &&
    !currentTabObject.hasOwnProperty("subLevel")
  ) {
    return "8px";
  }

  if (
    currentTabObject.level === level &&
    !currentTabObject.hasOwnProperty("subLevel")
  ) {
    return "0 0 8px 8px";
  }

  return "0px";
}
