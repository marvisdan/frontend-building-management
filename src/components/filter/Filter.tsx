import { Box, Button, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { useLocales } from "../../locales";

type AssetFilterProps = {
  title: string;
  onReset: (event: React.MouseEvent<HTMLElement>) => void;
  onSubmit: any;
  isSmallScreen?: boolean;
  children: JSX.Element;
};

export default function Filter({
  title,
  onReset,
  onSubmit,
  isSmallScreen,
  children,
}: AssetFilterProps) {
  const { translate } = useLocales();
  const { handleSubmit } = useFormContext();

  return (
    <Box>
      <Typography variant="h6" sx={{ my: 1, pl: 2 }}>
        {title}
      </Typography>
      {/* <Divider /> */}
      <Box sx={{ p: { xs: 1, sm: 0, md: 2 } }}>{children}</Box>
      <Stack
        direction={{ md: "column", lg: "row" }}
        sx={{ my: 2, px: { md: 2, lg: 2 } }}
        spacing={isSmallScreen ? 2 : 0}
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          fullWidth={isSmallScreen}
          type="submit"
          color="error"
          variant="text"
          onClick={onReset}
        >
          {translate("filters.reset")}
        </Button>
        <Button
          fullWidth={isSmallScreen}
          type="submit"
          variant="outlined"
          onClick={handleSubmit(onSubmit)}
        >
          {translate("filters.apply")}
        </Button>
      </Stack>
    </Box>
  );
}
