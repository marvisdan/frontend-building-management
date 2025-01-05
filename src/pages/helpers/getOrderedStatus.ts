import { StatusType } from "src/types";

// TODO: Add unit tests
export function getOrderedStatus(status: StatusType[]) {
  return (
    status &&
    status.sort((a: StatusType, b: StatusType) => a.orderInList - b.orderInList)
  );
}
