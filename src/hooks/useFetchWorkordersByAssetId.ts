import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchWorkordersByAssetId } from "../api";
import queryKeys from "../react-query/constants";
import { WorkorderType } from "../types";

export default function useFetchWorkordersByAssetId({
  limit,
  id,
}: {
  limit?: number | undefined;
  id: number;
}): any {
  const result = useQuery<WorkorderType, AxiosError>(
    [queryKeys.assetworkorders, id],
    () =>
      fetchWorkordersByAssetId({
        limit,
        id,
      })
  );

  return result;
}
