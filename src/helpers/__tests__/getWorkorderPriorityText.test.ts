import { WorkorderPriorityType } from "../../types";
import { getWorkorderPriorityText } from "../getWorkorderPriorityText";

describe("getWorkorderPriorityText", () => {
  it.each<[WorkorderPriorityType, string]>([
    ["Low", "workorder.legacyPriority.Low"],
    ["Normal", "workorder.legacyPriority.Normal"],
    ["High", "workorder.legacyPriority.High"],
    ["Urgent", "workorder.legacyPriority.Urgent"],
  ])(
    "should, return the appropriate text according to its priority",
    (priority, text) => {
      expect(getWorkorderPriorityText(priority)).toEqual(text);
    }
  );
});
