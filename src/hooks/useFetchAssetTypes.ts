import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AssetTypesResponseType } from "src/types";
import { fetchAssetTypes } from "../api";
import { URL } from "../constants";
import queryKeys from "../react-query/constants";
import { useFetchAssetTypesResultType } from "./types";

const useFetchAssetTypes = ({
  limit,
  options,
}: {
  limit?: number | undefined;
  options?: {
    retry: number;
    enabled: boolean;
    staleTime?: number;
  };
}): useFetchAssetTypesResultType => {
  const initialUrl = `${URL.base}${URL.assettypes}`;
  const result = useQuery<AssetTypesResponseType, AxiosError>(
    [queryKeys.assetTypes],
    () =>
      fetchAssetTypes({
        url: initialUrl,
        limit,
      }),
    options
  );

  return result;
};

export default useFetchAssetTypes;
