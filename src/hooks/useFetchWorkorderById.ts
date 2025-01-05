import { AxiosError } from "axios";

import { useQuery } from "@tanstack/react-query";

import { fetchWorkorderById } from "../api";
import queryKeys from "../react-query/constants";
import { WorkorderResponseType } from "../types";
import { useFetchWorkorderResultType } from "./types";

export default function useFetchWorkorderById({
  id,
}: {
  id: number;
  token: string | null;
}): useFetchWorkorderResultType {
  const result = useQuery<WorkorderResponseType, AxiosError>(
    [queryKeys.workorders, id],
    () => fetchWorkorderById(id)
  );

  return result;
}
