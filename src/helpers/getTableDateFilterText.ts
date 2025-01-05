import { WorkorderDateTableType } from "../types";

export function getTableDateFilterText(
  filter: WorkorderDateTableType | string
): string {
  return `workorder.table_date.${filter}`;
}
