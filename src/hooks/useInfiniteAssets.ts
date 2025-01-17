import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchAssets, fetchMockAssetsData } from "../api";
import { URL } from "../constants";
import queryKeys from "../react-query/constants";
import { AssetResponseType } from "../types";
import { useInfiniteAssetsResultType } from "./types";

const useInfiniteAssets = ({
  token,
  category,
  type,
  search,
  limit,
  organizationSiteId,
}: {
  token: string | null;
  category?: number;
  type?: number;
  search?: string;
  limit?: number | undefined;
  organizationSiteId: number;
}): useInfiniteAssetsResultType => {
  const initialUrl = `${URL.base}${URL.assets}`;

  const result = useInfiniteQuery<AssetResponseType, AxiosError>(
    [
      queryKeys.assets,
      token,
      category,
      type,
      search,
      limit,
      organizationSiteId,
    ],
    ({ pageParam = initialUrl }) => fetchMockAssetsData(),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  return result;
};

export default useInfiniteAssets;
