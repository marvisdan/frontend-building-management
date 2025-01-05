import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { fetchWorkorderNotes } from "../api";
import { URL } from "../constants";
import queryKeys from "../react-query/constants";
import { WorkorderNoteType } from "../types";

export type useFetchAssetNotesResult = {
  data: WorkorderNoteType[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

const useFetchWorkorderNotes = (id: number): useFetchAssetNotesResult => {
  const result = useQuery<WorkorderNoteType[], AxiosError>(
    [queryKeys.workorderNote, id],
    () => fetchWorkorderNotes(`${URL.base}${URL.workorderNotes}/${id}`)
  );

  return result;
};
export default useFetchWorkorderNotes;
