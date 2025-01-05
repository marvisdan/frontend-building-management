import { Translate, workorderStatusType } from "../../types";

export const getWorkorderStatus = ({
  status,
  translate,
}: {
  status: string | workorderStatusType;
  translate: Translate;
}): any => translate(`workorder.status.${status}`);
