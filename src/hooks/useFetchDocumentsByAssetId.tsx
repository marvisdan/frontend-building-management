import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { fetchDocumentsByAssetId } from "../api";
import queryKeys from "../react-query/constants";
import { AssetDocumentType } from "../types";

export type useFetchDocumentsByAssetIdResult = {
  data: AssetDocumentType[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

export default function useFetchDocumentsByAssetId(
  id: number,
  limit?: number
): useFetchDocumentsByAssetIdResult {
  return useQuery<AssetDocumentType[], AxiosError>(
    [queryKeys.assetsDocuments, id],
    () => fetchDocumentsByAssetId(id, limit)
  );
}
