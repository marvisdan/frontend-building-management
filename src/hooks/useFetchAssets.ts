import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchAssets } from "../api";
import { URL } from "../constants";
import queryKeys from "../react-query/constants";
import { AssetResponseType } from "../types";
import { useFetchAssetsResultType } from "./types";

const useFetchAssets = ({
  category,
  type,
  search,
  limit,
  token,
  options,
}: {
  token: string | null;
  category?: number;
  type?: number;
  search?: string;
  limit?: number | undefined;
  options?: {
    retry: number;
    enabled: boolean;
  };
}): useFetchAssetsResultType => {
  const initialUrl = `${URL.base}${URL.assets}`;
  const result = useQuery<AssetResponseType, AxiosError>(
    [queryKeys.assets, type, category, search],
    () =>
      fetchAssets({
        url: initialUrl,
        category,
        type,
        search,
        limit,
        token,
      }),
    options
  );

  return result;
};

export default useFetchAssets;
