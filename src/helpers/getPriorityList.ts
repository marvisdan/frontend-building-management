import { WorkorderPriority } from "../constants";
import { OptionsType } from "../utils";

export const getPriorityList = (
  priorities: (string | WorkorderPriority)[]
): OptionsType[] =>
  Array.isArray(priorities)
    ? priorities
        .filter((v: any) => isNaN(Number(v)))
        .map((el: any, index: number) => ({ code: el, id: index, label: el }))
    : [];
