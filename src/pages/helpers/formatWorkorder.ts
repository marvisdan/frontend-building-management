import { WorkorderType, dataTableWorkorderType } from "../../types";

export function formatWorkorders(data: WorkorderType[]) {
  return data && data.length > 0
    ? (data.reduce(
        (
          acc,
          { assignee, name, duedate, status, workOrderPriority, type },
          index
        ) =>
          [
            ...acc,
            {
              id: index,
              assignee,
              name,
              duedate,
              status,
              workOrderPriority,
              type,
            },
          ] as never,
        []
      ) as dataTableWorkorderType[])
    : [];
}
