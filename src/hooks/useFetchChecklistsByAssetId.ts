import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchChecklistsByAssetId } from "../api";
import queryKeys from "../react-query/constants";

export type useFetchChecklistsByAssetIdResult = {
  data: any | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

export default function useFetchChecklistsByAssetId({
  limit,
  id,
}: {
  limit?: number | undefined;
  id: number;
}): useFetchChecklistsByAssetIdResult {
  const result = useQuery<any, AxiosError>(
    [queryKeys.assetChecklists, id],
    () =>
      fetchChecklistsByAssetId({
        limit,
        id,
      })
  );

  return result;
}
