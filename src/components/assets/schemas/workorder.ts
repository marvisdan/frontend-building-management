import { Translate } from "src/types";
import * as Yup from "yup";

export const getNewWorkorderSchema = (translate: Translate) =>
  Yup.object().shape({
    name: Yup.string().required(
      translate("workorder.form.validation.required.name")
    ),
    description: Yup.string(),
    checklits: Yup.mixed(),
    assets: Yup.array()
      .min(1, translate("workorder.form.validation.min.asset_min1")) // when default value is empty string
      .required(translate("workorder.form.validation.required.asset"))
      .nullable(),
    assignedToUserId: Yup.string().nullable(),
    assignedContactId: Yup.string().nullable(),
    workOrderPriorityId: Yup.string()
      // .required(translate("workorder.form.validation.required.priority"))
      .nullable(),
    dueDate: Yup.date()
      .required(translate("workorder.form.validation.required.duedate"))
      .nullable(),
    scheduledDate: Yup.date()
      .required(translate("workorder.form.validation.required.scheduleddate"))
      .nullable(),
  });
