import generateDayWiseTimeSeries from "../generateDayWiseTimeSeries";

describe("generateDayWiseTimeSeries", () => {
  it("returns an array with the specified length", () => {
    const result = generateDayWiseTimeSeries(0, 5, { min: 0, max: 100 });
    expect(result.length).toBe(5);
  });

  it("returns an array with x and y values", () => {
    const result = generateDayWiseTimeSeries(0, 5, { min: 0, max: 100 });
    expect(result[0]).toEqual(
      expect.arrayContaining([expect.any(Number), expect.any(Number)])
    );
  });

  it("returns an array with increasing x values", () => {
    const result = generateDayWiseTimeSeries(0, 5, { min: 0, max: 100 });
    expect(result[0][0]).toBeLessThan(result[1][0]);
    expect(result[1][0]).toBeLessThan(result[2][0]);
    expect(result[2][0]).toBeLessThan(result[3][0]);
    expect(result[3][0]).toBeLessThan(result[4][0]);
  });

  it("returns an array with y values within the specified range", () => {
    const result = generateDayWiseTimeSeries(0, 5, { min: 0, max: 100 });
    result.forEach((point) => {
      expect(point[1]).toBeGreaterThanOrEqual(0);
      expect(point[1]).toBeLessThanOrEqual(100);
    });
  });
});
