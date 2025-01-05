import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchWorkorderStatus } from "../api";
import queryKeys from "../react-query/constants";
import { StatusType } from "../types";
import { useFetchWorkorderStatusResultType } from "./types";

const useFetchWorkorderStatus = (): useFetchWorkorderStatusResultType => {
  const result = useQuery<StatusType, AxiosError>(
    [queryKeys.workorderStatus],
    () => fetchWorkorderStatus()
  );

  return result;
};

export default useFetchWorkorderStatus;
