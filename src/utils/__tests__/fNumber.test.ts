import { fNumber } from "../formatNumber";

describe("fNumber", () => {
  it.only("should format the number correctly", () => {
    const input = 1000;
    const expectedOutput = "1,000";

    const result = fNumber(input);
    expect(result).toEqual(expectedOutput);
  });
});
