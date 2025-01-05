import { AssetType, CategoryType } from "../types";

export type OptionsType = {
  id: number;
  label: string;
  code?: number;
  assetcategory?: number;
};

// TODO : add unit tests
export function formatAssetCategories(array: CategoryType[]): OptionsType[] {
  return array && array.length > 0
    ? array.reduce(
        (acc, value) =>
          [
            ...acc,
            { id: value.id, label: value.name, code: value.id },
          ] as never,
        []
      )
    : [];
}

export function formatAssetTypes(
  array: AssetType[],
  category?: number
): OptionsType[] {
  let result: OptionsType[] =
    array && array.length > 0
      ? array.reduce(
          (acc, value) =>
            [
              ...acc,
              {
                id: value.id,
                label: value.name,
                code: value.id,
                assetcategory: value.assetcategory,
              },
            ] as never,
          []
        )
      : [];

  if (category) {
    result = result.filter((item) => item.assetcategory === category);
  }
  return result;
}

export function formatDataToSelectOptions(array: any[]): OptionsType[] {
  return array && array.length > 0
    ? array
        .filter((val) => val.name || val.name.trim() !== "")
        .reduce(
          (acc: any, value: any) =>
            [
              ...acc,
              {
                id: value.id,
                label: value.name,
                code: value.id,
              },
            ] as OptionsType[],
          []
        )
    : [];
}
