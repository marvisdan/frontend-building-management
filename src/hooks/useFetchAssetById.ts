import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchAssets } from "../api";
import { URL } from "../constants";
import queryKeys from "../react-query/constants";
import { Asset } from "../types";

export type useFetchAssetByIdResult = {
  data: Asset | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

const useFetchAssetById = ({
  token,
  id,
}: {
  token: string | null | undefined;
  id: string | undefined;
}): useFetchAssetByIdResult => {
  const url = `${URL.base}${URL.assets}/${id}/`;
  return useQuery<Asset, AxiosError>([queryKeys.assets, id], () =>
    fetchAssets({
      url,
      token,
    })
  );
};

export default useFetchAssetById;
