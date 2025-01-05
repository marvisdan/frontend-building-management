import flatten from "lodash/flatten";
import { tabsType } from "./types";

export default function getTabsLevel(
  data: tabsType[],
  count: number = 0
): number {
  const res = data.filter((el: any) => el.hasOwnProperty("subLevel"));

  if (res.length <= 0) {
    return count;
  }
  const d = res.map(({ subLevel }) => subLevel && [...subLevel]);
  count = count + 1;

  return getTabsLevel(flatten(d), count);
}
