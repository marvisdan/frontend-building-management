import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Box, styled, Typography } from "@mui/material";
import { useFormContext, useFormState } from "react-hook-form";

import { passwordValidations } from "../../helpers";
import { useLocales } from "../../locales";

type renderPasswordValidationType = {
  dirtyField: boolean | undefined;
  errorsField: any;
  fieldType: string;
  message: string;
  id: number;
};

const StyledTypoGraphy = styled(Typography)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  textAlign: "left",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  padding: theme.spacing(1),
}));

const PasswordValidationsText = ({
  dirtyField,
  errorsField,
  fieldType,
  message,
  id,
}: renderPasswordValidationType) => {
  if (dirtyField && !errorsField) {
    return (
      <StyledTypoGraphy
        key={id}
        variant="body2"
        sx={{ mb: 1, fontSize: { xs: 10, md: 14 } }}
      >
        <CheckCircleIcon color="success" sx={{ mr: 1 }} /> {message}
      </StyledTypoGraphy>
    );
  }
  return (
    <StyledTypoGraphy
      key={id}
      variant="body2"
      sx={{ mb: 1, fontSize: { xs: 10, md: 14 } }}
    >
      {dirtyField && !errorsField.types?.[fieldType] ? (
        <CheckCircleIcon
          color="success"
          sx={{
            mr: 1,
          }}
        />
      ) : (
        <RemoveOutlinedIcon
          color="disabled"
          sx={{
            mr: 1,
          }}
        />
      )}
      {message}
    </StyledTypoGraphy>
  );
};

export default function PasswordValidationsContent() {
  const { translate } = useLocales();
  const { control } = useFormContext();

  const { dirtyFields, errors } = useFormState({ control });

  return (
    <StyledBox>
      {passwordValidations({ translate }).map(({ type, message }, key) => (
        <PasswordValidationsText
          key={key}
          {...{
            id: key,
            fieldType: type,
            message,
            dirtyField: dirtyFields.password,
            errorsField: errors.password,
          }}
        />
      ))}
    </StyledBox>
  );
}
