import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { fetchAssetNotes } from "../api";
import { URL } from "../constants";
import queryKeys from "../react-query/constants";
import { AssetNoteResponseType } from "../types";

export type useFetchAssetNotesResult = {
  data: AssetNoteResponseType | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

const useFetchAssetNotes = (
  id: number,
  limit?: number
): useFetchAssetNotesResult => {
  const result = useQuery<AssetNoteResponseType, AxiosError>(
    [queryKeys.assetNote, id],
    () => fetchAssetNotes(`${URL.base}${URL.assetNotes}/${id}`, limit)
  );

  return result;
};
export default useFetchAssetNotes;
