import { assetTypesMock, categoriesMock } from "../../_mock/arrays";
import { organizationMock } from "../../_mock/datas";
import {
  formatAssetCategories,
  formatAssetTypes,
  formatDataToSelectOptions,
} from "../assets";

describe("formatAssetCategories", () => {
  it("should returns an empty array if input is empty", () => {
    expect(formatAssetCategories([])).toEqual([]);
  });

  it("should returns a formated array of categories into options", () => {
    const result = formatAssetCategories(categoriesMock.slice(0, 2));
    const expected = [
      { id: 3, label: "Building", code: 3 },
      { id: 4, label: "Building Meter", code: 4 },
    ];
    expect(result).toEqual(expected);
  });
});

describe("formatAssetTypes", () => {
  it("should return an empty array if input is empty", () => {
    const result = formatAssetTypes([]);
    expect(result).toHaveLength(0);
  });

  it("should format an array of AssetType objects into an array of OptionsType objects", () => {
    const result = formatAssetTypes(assetTypesMock.slice(0, 2));
    const expected = [
      { code: 4, id: 4, assetcategory: 3, label: "Commercial Building" },
      { code: 5, id: 5, assetcategory: 3, label: "Industrial Building" },
    ];
    expect(result).toEqual(expected);
  });

  it("should format asset types with category", () => {
    const selectedCategory = categoriesMock[0].id;
    const result = formatAssetTypes(
      assetTypesMock.slice(0, 2),
      selectedCategory
    );

    const expected = [
      { code: 4, id: 4, assetcategory: 3, label: "Commercial Building" },
      { code: 5, id: 5, assetcategory: 3, label: "Industrial Building" },
    ];
    expect(result).toEqual(expected);
  });
});

describe("formatDataToSelectOptions", () => {
  it("should return an empty array if input is empty", () => {
    const result = formatDataToSelectOptions([]);
    expect(result).toEqual([]);
  });

  it("should format an array of data objects into an array of OptionsType objects", () => {
    const expected = [{ id: 7, label: "Test site", code: 7 }];

    const result = formatDataToSelectOptions(organizationMock);
    expect(result).toEqual(expected);
  });
});
