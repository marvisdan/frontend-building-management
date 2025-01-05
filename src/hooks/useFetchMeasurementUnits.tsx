import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { fetchMeasurementUnits } from "../api";
import queryKeys from "../react-query/constants";
import { MeasurementUnitType } from "../types";
import { useFetchMeasurementUnitsResultType } from "./types";

const useFetchMeasurementUnits = (
  offset?: number,
  limit?: number
): useFetchMeasurementUnitsResultType => {
  const result = useQuery<MeasurementUnitType[], AxiosError>(
    [queryKeys.measurementunits],
    () => fetchMeasurementUnits(offset, limit)
  );

  return result;
};

export default useFetchMeasurementUnits;
