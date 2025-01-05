import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AssetCategoriesResponseType } from "src/types";
import { fetchAssetCategories } from "../api";
import { URL } from "../constants";
import queryKeys from "../react-query/constants";
import { useFetchAssetCategoriesResultType } from "./types";

const useFetchAssetCategories = ({
  limit,
  options,
}: {
  limit?: number | undefined;
  options?: {
    retry: number;
    enabled: boolean;
    staleTime?: number;
  };
}): useFetchAssetCategoriesResultType => {
  const initialUrl = `${URL.base}${URL.assetcategories}`;
  const result = useQuery<AssetCategoriesResponseType, AxiosError>(
    [queryKeys.assetCategories],
    () =>
      fetchAssetCategories({
        url: initialUrl,
        limit,
      }),
    options
  );

  return result;
};

export default useFetchAssetCategories;
