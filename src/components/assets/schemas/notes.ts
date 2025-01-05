import * as Yup from "yup";
import { CreateAssetNoteType } from "../../../types";

export const NewAssetNoteSchema = Yup.object().shape({
  asset: Yup.string(),
  title: Yup.string().required("Title is required"),
  note: Yup.string().required("Note is required"),
});

export const defaultValues: CreateAssetNoteType | {} = {
  title: "",
  note: "",
  isPinned: false,
};
