import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchWorkorderPriorities } from "../api";
import queryKeys from "../react-query/constants";
import { WorkorderPriorityType } from "../types";
import { useFetchWorkorderPriorityType } from "./types";

const useFetchWorkorderPriorities = ({
  options,
}: {
  options?: {
    retry: number;
    enabled: boolean;
  };
}): useFetchWorkorderPriorityType => {
  const result = useQuery<WorkorderPriorityType, AxiosError>(
    [queryKeys.workorderPriorities],
    () => fetchWorkorderPriorities(),
    options
  );

  return result;
};

export default useFetchWorkorderPriorities;
