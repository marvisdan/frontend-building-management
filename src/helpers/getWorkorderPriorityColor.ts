import { ColorSchema } from "../theme/palette";
import { WorkorderPriorityType } from "../types";

export function getWorkorderPriorityColor(
  priority: string | WorkorderPriorityType
): ColorSchema {
  switch (priority) {
    case "Low":
      return "success";
    case "Normal":
      return "info";
    case "High":
      return "warning";
    case "Urgent":
      return "error";
    default:
      return "primary";
  }
}
