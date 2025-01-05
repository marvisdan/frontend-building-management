import { AxiosError } from "axios";

import { useQuery } from "@tanstack/react-query";

import { fetchWorkorders } from "../api";
import queryKeys from "../react-query/constants";
import { WorkorderResponseType } from "../types";
import { useFetchWorkordersResultType } from "./types";

export default function useFetchWorkorders({
  limit,
  offset,
  building,
  assignee,
  priority,
  duedate,
  scheduleddate,
  status,
  search,
}: {
  limit?: number | undefined;
  offset?: number | undefined;
  building?: number | null;
  priority?: number | null;
  status?: number | null;
  assignee?: number | null;
  duedate?: Date | string | null;
  scheduleddate?: Date | string | null;
  search?: string | null;
}): useFetchWorkordersResultType {
  const result = useQuery<WorkorderResponseType, AxiosError>(
    [queryKeys.workorders, limit, offset],
    () =>
      fetchWorkorders({
        limit,
        offset,
        building,
        assignee,
        priority,
        duedate,
        scheduleddate,
        status,
        search,
      }),
    { keepPreviousData: true }
  );

  return result;
}
