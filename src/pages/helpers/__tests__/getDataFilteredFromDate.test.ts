import dayjs from "dayjs";
import { dataTableWorkorderType } from "src/types";
import { getDataFilteredFromDate } from "../getDataFilteredFromDate";

describe("getDataFilteredFromDate", () => {
  const currentDate = dayjs("2023-09-25").format("YYYY-MM-DD");

  const mockData: dataTableWorkorderType[] = [
    {
      id: "1",
      name: "Workorder 1",
      duedate: "2023-10-10",
      scheduleddate: "2023-09-30",
      assignee: {
        email: "",
        first_name: "Beaconsfield",
        id: "23",
        last_name: "",
        name: "Beaconsfield ",
        organizations: [],
      },
      workOrderPriority: {
        workOrderPriorityId: 3,
        name: "High",
        description: "High",
        orderInList: 3,
      },
      status: {
        // TODO: OP => Open === Ready dans les nouveau status ?
        workOrderStatusId: 2,
        name: "Ready",
        description: "Ready",
        orderInList: 2,
      },
    },
    {
      id: "2",
      name: "Workorder 2",
      duedate: "2023-11-15",
      scheduleddate: "2023-10-15",
      assignee: {
        email: "",
        first_name: "Beaconsfield",
        id: "23",
        last_name: "",
        name: "Beaconsfield ",
        organizations: [],
      },
      workOrderPriority: {
        workOrderPriorityId: 1,
        name: "Normal",
        description: "Normal",
        orderInList: 1,
      },
      status: {
        workOrderStatusId: 5,
        name: "Completed",
        description: "Completed",
        orderInList: 5,
      },
    },
    {
      id: "3",
      name: "Workorder 3",
      duedate: "2023-12-15",
      scheduleddate: "2023-11-15",
      assignee: {
        email: "",
        first_name: "Beaconsfield",
        id: "23",
        last_name: "",
        name: "Beaconsfield ",
        organizations: [],
      },
      workOrderPriority: {
        workOrderPriorityId: 2,
        name: "Low",
        description: "Low",
        orderInList: 2,
      },
      status: {
        // TODO: OP => Open === Ready dans les nouveau status ?
        workOrderStatusId: 2,
        name: "Ready",
        description: "Ready",
        orderInList: 2,
      },
    },
  ];

  it('should return all data when date is "all"', () => {
    const result = getDataFilteredFromDate({
      data: mockData,
      dateFilter: "all",
      currentDate,
    });
    expect(result).toEqual(mockData);
  });

  it('should filter data for "week"', () => {
    const result = getDataFilteredFromDate({
      data: mockData,
      dateFilter: "week",
      currentDate,
    });
    const expected = [mockData[0]];
    expect(result).toEqual(expected);
  });

  it('should filter data for "two_weeks"', () => {
    const result = getDataFilteredFromDate({
      data: mockData,
      dateFilter: "two_weeks",
      currentDate,
    });

    const expected = [mockData[0]];
    expect(result).toEqual(expected);
  });

  it('should filter data for "month"', () => {
    const result = getDataFilteredFromDate({
      data: mockData,
      dateFilter: "month",
      currentDate,
    });
    const expected = [mockData[0], mockData[1]];
    expect(result).toEqual(expected);
  });

  it('should filter data for "three_months"', () => {
    const result = getDataFilteredFromDate({
      data: mockData,
      dateFilter: "three_months",
      currentDate,
    });
    const expected = [mockData[0], mockData[1], mockData[2]];
    expect(result).toEqual(expected);
  });
});
