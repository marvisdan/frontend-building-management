import { WorkorderStatusEnum } from "../constants";
import { OptionsType } from "../utils";

export const getStatusList = (
  priorities: (string | WorkorderStatusEnum)[]
): OptionsType[] =>
  Array.isArray(priorities)
    ? priorities
        .filter((v: any) => isNaN(Number(v)))
        .map((el: any, index: number) => ({ code: el, id: index, label: el }))
    : [];
