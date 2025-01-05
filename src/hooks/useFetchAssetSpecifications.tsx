import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { fetchAssetSpecifications } from "../api";
import queryKeys from "../react-query/constants";
import { AssetSpecificationResponseType } from "../types";

export type useFetchAssetSpecificationsResult = {
  data: AssetSpecificationResponseType | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

const useFetchAssetSpecifications = (
  assetId: number,
  limit: number = 25
): useFetchAssetSpecificationsResult => {
  const result = useQuery<AssetSpecificationResponseType, AxiosError>(
    [queryKeys.assetSpecifications, assetId],
    () => fetchAssetSpecifications(`${assetId}`, limit)
  );

  return result;
};

export default useFetchAssetSpecifications;
