import { Asset, dataTableAssetType } from "../../types";

export function formatAssets(data: Asset[]) {
  return data && data.length > 0
    ? (data.reduce(
        (
          acc,
          {
            url,
            name,
            description,
            thumbnail,
            created,
            updated,
            assetcategory,
            assettype,
          },
          index
        ) =>
          [
            ...acc,
            {
              id: index,
              url,
              name,
              description,
              assetcategory,
              assettype,
              thumbnail,
              created,
              updated,
            },
          ] as never,
        []
      ) as dataTableAssetType[])
    : [];
}
