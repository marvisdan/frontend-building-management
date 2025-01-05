import { WorkorderDateTableType } from "../../types";
import { getTableDateFilterText } from "../getTableDateFilterText";

describe("getTableDateFilterText", () => {
  it.each<[WorkorderDateTableType, string]>([
    ["all", "workorder.table_date.all"],
    ["week", "workorder.table_date.week"],
    ["two_weeks", "workorder.table_date.two_weeks"],
    ["month", "workorder.table_date.month"],
    ["three_months", "workorder.table_date.three_months"],
  ])(
    "should, return the appropriate text according to its filter date",
    (filter, text) => {
      expect(getTableDateFilterText(filter)).toEqual(text);
    }
  );
});
