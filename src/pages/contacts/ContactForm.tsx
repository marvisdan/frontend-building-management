// @mui
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import * as Yup from "yup";

// components
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
} from "../../components/hook-form";

// utils
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useCreateContactResultType } from "../../hooks/types";
import { useLocales } from "../../locales";
import { CustomFile } from "../../types";
import { convertToBase64, fData } from "../../utils";

const StyledRHFTextField = styled(RHFTextField)(
  `&.MuiFormHelperText-root {
      color: 'red',
    }`
);

interface FormValuesProps extends Omit<any, "avatarUrl"> {
  avatarUrl: CustomFile | string | null;
}

export const ContactForm = ({
  edit,
  currentContact,
  handler,
  goBack,
}: {
  edit?: boolean;
  currentContact?: any;
  handler: () => useCreateContactResultType;
  goBack: () => void;
}) => {
  const { translate } = useLocales();

  const NewContactSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    title: Yup.string(),
    discipline: Yup.string(),
    company: Yup.string(),
    phoneNumber: Yup.string(),
    email: Yup.string().required("Email is required").email(),
    avatarUrl: Yup.mixed().test(
      "required",
      "Avatar is required",
      (value) => value !== ""
    ),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentContact?.id || undefined,
      avatarUrl: currentContact?.thumbnail || "",
      firstname: currentContact?.name.split(" ")[0] || "",
      lastname: currentContact?.name.split(" ")[1] || "",
      title: currentContact?.title || "",
      discipline: currentContact?.dsicipline || "",
      company: currentContact?.company || "",
      email: currentContact?.email || "",
      phoneNumber: currentContact?.phone || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentContact]
  );

  const methods = useForm({
    resolver: yupResolver(NewContactSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = methods;

  const { mutate } = handler();
  const onSubmit = async (data: FormValuesProps) => {
    let newContact: any = {
      name: `${data.firstname} ${data.lastname}`,
      email: data?.email,
      company: data?.company,
      title: data?.title,
      phone: data?.phoneNumber,
    };

    if (
      data.avatarUrl &&
      data.avatarUrl.slice(0, 100) !== currentContact?.thumbnail.slice(0, 100)
    ) {
      newContact = {
        ...newContact,
        thumbnail: data.avatarUrl,
      };
    }

    if (edit) {
      newContact = {
        ...newContact,
        organizationContactId: currentContact?.id,
      };
    }

    await mutate(newContact);
  };

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const base64 = await convertToBase64(file);
      if (file) {
        setValue("avatarUrl", base64 as CustomFile);
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Typography variant="h6">
                {translate("contacts.profile_picture")}
              </Typography>
              <Box sx={{ mb: 5 }}>
                <RHFUploadAvatar
                  name="avatarUrl"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: "auto",
                        display: "block",
                        textAlign: "center",
                        color: "text.secondary",
                      }}
                    >
                      {translate("form.format_img_allowed")}
                      <br />
                      {translate("form.max_size_file")} {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Typography variant="h6">
                {translate("contacts.contact_form_title")}
              </Typography>
              <RHFTextField
                name="firstname"
                label={translate("contacts.label.first_name")}
              />
              <RHFTextField
                name="lastname"
                label={translate("contacts.label.last_name")}
              />
              <RHFTextField
                name="title"
                label={translate("contacts.label.title")}
              />
              <RHFTextField
                name="company"
                label={translate("contacts.label.company")}
              />
              <RHFTextField
                name="phoneNumber"
                label={translate("contacts.label.phone")}
              />
              <StyledRHFTextField
                name="email"
                type="email"
                label={translate("contacts.label.email")}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="end"
              alignItems="center"
              spacing={2}
              sx={{ mt: 3 }}
            >
              <Button variant="outlined" onClick={goBack}>
                {translate("contacts.actions.cancel_creation")}
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting && !isSubmitted}
              >
                {edit
                  ? translate("contacts.actions.edit")
                  : translate("contacts.actions.create")}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
