import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

// components
import FormProvider, {
  // RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from "../../components/hook-form";
import Iconify from "../../components/iconify";
import { useSnackbar } from "../../components/snackbar";

// utils
import { updateUserProfile } from "../../api";
import { useLocales } from "../../locales";
import queryKeys from "../../react-query/constants";
import { CustomFile } from "../../types";
import { convertToBase64, fData } from "../../utils";

const StyledRHFTextField = styled(RHFTextField)(
  `&.MuiFormHelperText-root {
    color: 'red',
  }`
);

const useUpdateUserProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateUserProfile, {
    onSuccess: () => {
      enqueueSnackbar("Profile updated with success!");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.userById],
      });
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate };
};

interface FormValuesProps extends Omit<any, "avatarUrl"> {
  avatarUrl: any;
}

type Props = {
  currentUser?: any;
  onClose: () => void;
};

export default function UserEditProfileForm({ currentUser, onClose }: Props) {
  const { translate } = useLocales();
  const NewUserProfileSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    // title: Yup.string(), //.required("Title is required"),
    // company: Yup.string(), //.required("Company is required"),
    // phoneNumber: Yup.string(), //.required("Phone number is required"),
    // phoneNumber2: Yup.string(), //.required("Phone number is required"),
    // type: Yup.string(), //.required("Type is required"),
    // type2: Yup.string(), //.required("Type is required"),
    // email: Yup.string().required("Email is required").email(),

    avatarUrl: Yup.mixed().test(
      "required",
      "Avatar is required",
      (value) => value !== ""
    ),
  });

  const defaultValues = useMemo(
    () => ({
      avatarUrl: currentUser?.settings?.profile_picture || "",
      firstname: currentUser?.first_name || "",
      lastname: currentUser?.last_name || "",
      // title: currentUser?.title || "",
      // company: currentUser?.company || "",
      email: currentUser?.email || "",
      // phoneNumber: currentUser?.phoneNumber1 || "",
      // type: currentUser?.type1 || "",
      // phoneNumber2: currentUser?.phoneNumber2 || "",
      // type2: currentUser?.type2 || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserProfileSchema),
    defaultValues,
  });

  const {
    // control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate } = useUpdateUserProfile();

  const onSubmit = async (data: FormValuesProps) => {
    let newProfile: any = {
      userId: Number(currentUser.id),
      firstName: data.firstname,
      lastName: data?.lastname,
      email: data?.email,
    };

    if (
      data.avatarUrl.trim() !== "" &&
      currentUser?.settings?.profile_picture.slice(0, 100) !==
        data.avatarUrl.slice(0, 100)
    ) {
      newProfile = {
        ...newProfile,
        profilePicture: data.avatarUrl,
      };
    }
    await mutate(newProfile);

    onClose();
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
      <Card sx={{ pt: 10, pb: 5, px: 3 }}>
        <Grid container direction="column" spacing={3}>
          <Grid item xs={12} md={4}>
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
                    {"Allowed *.jpeg, *.jpg, *.png, *.gif"}
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              <RHFTextField name="firstname" label="First Name" />
              <RHFTextField name="lastname" label="Last Name" />
              {/* <RHFTextField name="title" label="Title" disabled />
              <RHFTextField name="company" label="Company" disabled /> */}
              {/* <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                }}
              > */}
              {/* <RHFTextField
                  name="phoneNumber1"
                  label="Phone Number"
                  disabled
                />
                <RHFSelect name="type" label="Type" placeholder="Type" disabled>
                  <option value="" />
                  {[
                    {
                      code: 0,
                      label: "Mobile",
                    },
                    {
                      code: 1,
                      label: "Work",
                    },
                  ].map((option) => (
                    <option key={option.code} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </RHFSelect>
                <RHFTextField
                  name="phoneNumber2"
                  label="Phone Number"
                  disabled
                />
                <RHFSelect
                  name="type2"
                  label="Type"
                  placeholder="Type"
                  disabled
                >
                  <option value="" />
                  {[
                    {
                      code: 0,
                      label: "Mobile",
                    },
                    {
                      code: 1,
                      label: "Work",
                    },
                  ].map((option) => (
                    <option key={option.code} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </RHFSelect>
              </Box> */}
              <StyledRHFTextField
                name="email"
                type="email"
                label="Email Address"
                disabled
                helperText="Please contact your account administrator to modifiy your email"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => null} edge="end">
                        <Tooltip title="Please contact your account administrator to modifiy your email">
                          <Iconify icon="eva:info-outline" />
                        </Tooltip>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <Button variant="text" onClick={onClose}>
                {"Don't save"}
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {translate("profile.actions.save_changes")}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
}
