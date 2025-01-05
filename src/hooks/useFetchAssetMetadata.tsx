import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { fetchAssetMetadata } from "../api";
import queryKeys from "../react-query/constants";
import { AssetMetadataResponseType } from "../types";

export type useFetchAssetMetadataResult = {
  data: AssetMetadataResponseType | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

const useFetchAssetMetadata = (
  assetId: number,
  limit: number = 25
): useFetchAssetMetadataResult => {
  const result = useQuery<AssetMetadataResponseType, AxiosError>(
    [queryKeys.assetMetadata, assetId],
    () => fetchAssetMetadata(`${assetId}`, limit)
  );

  return result;
};

export default useFetchAssetMetadata;
