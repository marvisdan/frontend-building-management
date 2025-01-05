import { WorkorderPriority } from "../../constants";
import { getPriorityList } from "../getPriorityList";

describe("getPriority", () => {
  it("should return an empty array for an empty input array", () => {
    const priorities: (string | WorkorderPriority)[] = [];
    const result = getPriorityList(priorities);
    expect(result).toEqual([]);
  });

  it("should filter out numeric values and create OptionsType objects", () => {
    const priorities: any = ["LO", "NO", "HI", "UR", 123];
    const result = getPriorityList(priorities);
    expect(result).toEqual([
      { code: "LO", id: 0, label: "LO" },
      { code: "NO", id: 1, label: "NO" },
      { code: "HI", id: 2, label: "HI" },
      { code: "UR", id: 3, label: "UR" },
    ]);
  });

  it("should return an empty array for an array of only numeric values", () => {
    const priorities: number[] = [123, 456, 789];
    const result = getPriorityList(priorities);
    expect(result).toEqual([]);
  });
});
