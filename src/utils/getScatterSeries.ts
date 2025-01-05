import { Translate } from "../types";
import generateDayWiseTimeSeries from "./generateDayWiseTimeSeries";

export const getScatterSeries = (translate: Translate) => [
  {
    year: "2022",
    data: [
      {
        name: translate("workorder.status.on_hold"),
        data: generateDayWiseTimeSeries(
          new Date("11 Feb 2017 GMT").getTime(),
          20,
          {
            min: 10,
            max: 60,
          }
        ),
      },
      {
        name: translate("workorder.status.on_time"),
        data: generateDayWiseTimeSeries(
          new Date("11 Feb 2017 GMT").getTime(),
          20,
          {
            min: 10,
            max: 60,
          }
        ),
      },
      {
        name: translate("workorder.status.overdue"),
        data: generateDayWiseTimeSeries(
          new Date("11 Feb 2017 GMT").getTime(),
          30,
          {
            min: 10,
            max: 60,
          }
        ),
      },
    ],
  },
  {
    year: "2023",
    data: [
      {
        name: translate("workorder.status.on_hold"),
        data: generateDayWiseTimeSeries(
          new Date("11 Feb 2017 GMT").getTime(),
          200,
          {
            min: 10,
            max: 60,
          }
        ),
      },
      {
        name: translate("workorder.status.on_time"),
        data: generateDayWiseTimeSeries(
          new Date("11 Feb 2017 GMT").getTime(),
          200,
          {
            min: 10,
            max: 60,
          }
        ),
      },
      {
        name: translate("workorder.status.overdue"),
        data: generateDayWiseTimeSeries(
          new Date("11 Feb 2017 GMT").getTime(),
          300,
          {
            min: 10,
            max: 60,
          }
        ),
      },
    ],
  },
];
