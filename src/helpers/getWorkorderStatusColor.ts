import { ColorSchema } from "../theme/palette";
import { workorderStatusType } from "../types";

// available colours
// 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
export function getWorkorderStatusColor(
  status: string | workorderStatusType
): ColorSchema {
  switch (status) {
    //legacy status
    case "New":
      return "primary";
    case "To_Plan":
      return "primary";
    case "Ready":
      return "secondary";
    case "Overdue":
      return "error";
    case "In_Progress":
      return "info";
    case "On_Hold":
      return "warning";
    case "Completed":
      return "success";

    default:
      return "primary";
  }
}
