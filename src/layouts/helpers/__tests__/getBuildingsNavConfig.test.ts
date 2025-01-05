import { dataBuildingsType } from "../../../types";
import { getBuildingsNavConfig } from "../getBuildingsNavConfig";

export const dataBuildings: dataBuildingsType[] = [
  {
    label: "Radio_Canada",
    title: "Radio Canada",
    id: "0",
  },
  {
    label: "2400_Source_Boul",
    title: "2400 Source Boul",
    id: "1",
  },
];

describe("formatAssets helper", () => {
  it("should return empty array when data is empty", () => {
    expect(getBuildingsNavConfig([])).toEqual([]);
  });

  it("should format assets infos as expected", () => {
    expect(getBuildingsNavConfig(dataBuildings)).toEqual([
      { path: "/dashboard/buildings/0", title: "Radio Canada" },
      {
        path: "/dashboard/buildings/1",
        title: "2400 Source Boul",
      },
    ]);
  });
});
