import { getWorkorderPriorityColor } from "../getWorkorderPriorityColor";

describe("getWorkorderPriorityColor", () => {
  it.each([
    ["Low", "success"],
    ["Normal", "info"],
    ["High", "warning"],
    ["Urgent", "error"],
    ["", "primary"],
  ])(
    "should, return the appropriate color according to its priority",
    (status, color) => {
      expect(getWorkorderPriorityColor(status)).toEqual(color);
    }
  );
});
