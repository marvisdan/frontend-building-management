import { WorkorderPriorityType } from "../types";

export function getWorkorderPriorityText(
  priority: WorkorderPriorityType
): string {
  return `workorder.legacyPriority.${priority}`;
}
