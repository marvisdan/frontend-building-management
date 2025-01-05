import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchChecklists } from "../api";
import queryKeys from "../react-query/constants";
import { ChecklistsResponseType } from "../types";
import { useFetchAssetsResultType } from "./types";

const useFetchChecklists = ({
  limit,
  options,
}: {
  limit?: number | undefined;
  options?: {
    retry: number;
    enabled: boolean;
  };
}): useFetchAssetsResultType => {
  const result = useQuery<ChecklistsResponseType, AxiosError>(
    [queryKeys.checklists],
    () =>
      fetchChecklists({
        limit,
      }),
    options
  );

  return result;
};

export default useFetchChecklists;
