// @mui
import { yupResolver } from "@hookform/resolvers/yup";
import {
  LoadingButton,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import {
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset, useForm } from "react-hook-form";

import { Box } from "@mui/system";
import { useLocales } from "../../locales";
import {
  Asset,
  CreateAssetNoteType,
  CreateWorkorderNoteType,
  NoteType,
  WorkorderNoteType,
  WorkorderType,
} from "../../types";
import { capitalizedFirstLetter } from "../../utils/capitalizedFirstLetter";
import { fDateTime } from "../../utils/formatTime";
import { NewAssetNoteSchema, defaultValues } from "../assets/schemas/notes";
import { RHFTextField } from "../hook-form";
import FormProvider from "../hook-form/FormProvider";

type Props = {
  item: WorkorderNoteType;
  isLast: boolean;
};

const NoteItem = ({ item, isLast }: Props) => (
  <TimelineItem
    sx={{
      " &:before": {
        m: 0,
        p: 0,
      },
    }}
  >
    <TimelineSeparator>
      <TimelineDot color="info" />
      {isLast ? null : <TimelineConnector />}
    </TimelineSeparator>

    <TimelineContent>
      {item.title && (
        <Typography variant="subtitle2" fontWeight={600}>
          {capitalizedFirstLetter(item.title)}
        </Typography>
      )}
      {item.note && (
        <Typography variant="subtitle2" fontWeight={600}>
          {item.note}
        </Typography>
      )}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={1}
      >
        {item.user.name ? (
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {item.user.name}
          </Typography>
        ) : null}

        {item.insertedOn && (
          <Typography variant="caption" sx={{ color: "text.secondary", mr: 2 }}>
            {fDateTime(item.insertedOn)}
          </Typography>
        )}
      </Stack>
    </TimelineContent>
  </TimelineItem>
);

export type FormValuesProps = CreateAssetNoteType;

const NoteList = ({ notes }: { notes: WorkorderNoteType[] | undefined }) => {
  const { translate } = useLocales();

  return !notes || notes.length === 0 ? (
    <Grid
      item
      xs={12}
      md={9}
      spacing={2}
      container
      data-testid="no-asset-detail"
    >
      <Typography variant="h6" m={2}>
        {translate("note.no_note")}
      </Typography>
    </Grid>
  ) : (
    <CardContent
      sx={{
        pt: 2,
        px: 0,
        "& .MuiTimelineItem-missingOppositeContent:before": {
          display: "none",
        },
      }}
    >
      <Timeline>
        {notes.map((item, index) => (
          <NoteItem
            key={`${index}-${item.workOrderNoteId}`}
            item={item}
            isLast={index === notes.length - 1}
          />
        ))}
      </Timeline>
    </CardContent>
  );
};

export const onSubmit =
  (
    mutate: UseMutateFunction<
      WorkorderType | Asset,
      AxiosError<unknown, any>,
      CreateAssetNoteType | CreateWorkorderNoteType,
      unknown
    >,

    onClose?: () => void
  ) =>
  async (
    id: number,
    data: CreateAssetNoteType | CreateWorkorderNoteType,
    type: NoteType
  ) => {
    let newNote: CreateAssetNoteType | CreateWorkorderNoteType = {
      workorderId: `${id}`,
      title: data?.title,
      note: data?.note,
      isPinned: data?.isPinned,
    };

    if (type === "assetNote") {
      newNote = {
        assetId: `${id}`,
        title: data?.title,
        note: data?.note,
        isPinned: data?.isPinned,
      };
    }
    await mutate(newNote);
    onClose && onClose();
  };

export default function Notes({
  entityId,
  title,
  type,
  nameLabel,
  contentLabel,
  createNote,
  data,
  isLoading,
  isError,
  error,
}: {
  entityId: string;
  title: string;
  type: NoteType;

  nameLabel: string;
  contentLabel: string;
  createNote: (reset?: UseFormReset<any>) => {
    mutate: UseMutateFunction<any, AxiosError<unknown, any>, any, unknown>;
    isLoading: boolean;
    isSuccess: boolean;
  };
  data: WorkorderNoteType[] | any;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
}) {
  const { translate } = useLocales();

  const methods = useForm<CreateAssetNoteType>({
    resolver: yupResolver(NewAssetNoteSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const { mutate } = createNote(reset);
  return (
    <Card sx={{ p: 3 }}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit((data) =>
          onSubmit(mutate)(Number(entityId), data, type)
        )}
      >
        <Stack direction="column" spacing={3}>
          <Typography variant="h6">{title}</Typography>
          <Stack spacing={3}>
            <RHFTextField name="title" label={nameLabel} />
            <RHFTextField name="note" label={contentLabel} multiline rows={3} />
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {translate("note.actions.post")}
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
      {isError ? (
        <Box sx={{ pt: 2 }}>
          <Typography variant="h4" sx={{ m: 3 }}>
            {error?.message}
          </Typography>
        </Box>
      ) : isLoading ? (
        <Box data-testid="workorder-note-loader" mt={2}>
          <LinearProgress />
        </Box>
      ) : (
        <NoteList notes={data} />
      )}
    </Card>
  );
}
