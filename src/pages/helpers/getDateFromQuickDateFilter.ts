import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import weekday from "dayjs/plugin/weekday";

import { WorkorderDateTable } from "../../constants";
import { WorkorderDateTableType, dataTableWorkorderType } from "../../types";

export function getDateFromQuickDateFilter({
  data,
  dateFilter,
  currentDate,
  setValue,
}: {
  data?: dataTableWorkorderType[];
  dateFilter: WorkorderDateTableType | string;
  currentDate: string;
  setValue?: any;
}) {
  dayjs.extend(weekday);
  dayjs.extend(relativeTime);
  switch (dateFilter) {
    case WorkorderDateTable[WorkorderDateTable.week]: {
      // const expecteddate = new Date(
      //   dayjs(currentDate).weekday(7).format("YYYY-MM-DD")
      // );

      //setValue && setValue("duedate", expecteddate);
      // Old date : return dayjs(currentDate).weekday(7).format("YYYY-MM-DD");
      return dayjs(currentDate).add(1, "week").format("YYYY-MM-DD");
    }

    case WorkorderDateTable[WorkorderDateTable.two_weeks]:
      return dayjs(currentDate).add(2, "week").format("YYYY-MM-DD");

    case WorkorderDateTable[WorkorderDateTable.month]:
      return dayjs(currentDate).add(1, "month").format("YYYY-MM-DD");

    case WorkorderDateTable[WorkorderDateTable.three_months]:
      return dayjs(currentDate).add(3, "month").format("YYYY-MM-DD");

    default:
      return null;
  }
}
