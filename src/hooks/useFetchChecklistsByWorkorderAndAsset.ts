import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchWorkorderChecklistByWorkorderAndAsset } from "../api";
import queryKeys from "../react-query/constants";
import { WorkorderType } from "../types";

export default function useFetchChecklistsByWorkorderAndAsset({
  workorderId,
  assetId,
}: {
  workorderId: number;
  assetId: number;
}): any {
  const result = useQuery<WorkorderType, AxiosError>(
    [queryKeys.workorderChecklistByWorkorderAndAsset, workorderId, assetId],
    () =>
      fetchWorkorderChecklistByWorkorderAndAsset({
        workorderId,
        assetId,
      })
  );

  return result;
}
