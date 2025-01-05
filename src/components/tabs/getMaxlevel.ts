import flatten from "lodash/flatten";
import { tabsType } from "src/components/tabs";
import getTabsLevel from "./getTabsLevel";

export default function getMaxlevel(array: tabsType[]): number {
  let count = 0;
  let total = 0;
  const data =
    array &&
    array.length > 0 &&
    array.filter((element: tabsType) => element.hasOwnProperty("subLevel"));
  if (data && data.length <= 0) {
    return 0;
  } else {
    if (data) {
      const d = data.map(({ subLevel }) => subLevel && [...subLevel]);
      count = count + 1;
      total = count + getTabsLevel(flatten(d), count);
    }
  }
  return total;
}
