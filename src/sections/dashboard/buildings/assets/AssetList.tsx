import { Key } from "react";

// import { useNavigate } from "react-router";
import { useNavigate } from "react-router";

import { Asset } from "src/types";
import { ASSET_PLACEHOLDER } from "../../../../constants";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import AssetItem from "./AssetItem";

type AssetListProps = {
  assets: Asset[];
};

export type AssetItemProps = {
  name: string;
  description: string;
  thumbnail: string;
  onClick: VoidFunction;
};

const AssetList = ({ assets }: AssetListProps) => {
  const navigate = useNavigate();

  return (
    <>
      {assets.map(
        (
          {
            name,
            description,
            thumbnail,
            id,
          }: {
            name: string;
            description: string;
            thumbnail?: string;
            id: number;
          },
          key: Key
        ) => (
          <AssetItem
            key={`${key}-${id}`}
            thumbnail={
              !thumbnail || thumbnail.trim() === ""
                ? ASSET_PLACEHOLDER
                : thumbnail
            }
            name={name}
            description={description}
            onClick={() => navigate(PATH_DASHBOARD.asset.view(id))}
          />
        )
      )}
    </>
  );
};

export default AssetList;
