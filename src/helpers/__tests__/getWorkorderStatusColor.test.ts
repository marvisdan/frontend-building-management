import { getWorkorderStatusColor } from "../getWorkorderStatusColor";

describe("getWorkorderStatusColor", () => {
  it.each([
    ["New", "primary"],
    ["To_Plan", "primary"],
    ["Ready", "secondary"],
    ["In_Progress", "info"],
    ["On_Hold", "warning"],
    ["Completed", "success"],
    ["Ready", "secondary"],
    ["Overdue", "error"],
    ["", "primary"],
  ])(
    "should, return the appropriate color according to its status",
    (status, color) => {
      expect(getWorkorderStatusColor(status)).toEqual(color);
    }
  );
});
