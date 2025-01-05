import { Button, SxProps } from "@mui/material";
import { useLocales } from "../../locales";
import { IconifyProps } from "../iconify";
import Iconify from "../iconify/Iconify";

type Props = {
  onClick: () => void;
  sx?: SxProps;
  alwaysVisible?: boolean;
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  icon?: IconifyProps;
};
export default function FilterButton({
  onClick,
  sx,
  alwaysVisible,
  variant = "contained",
  color = "inherit",
  icon = "ic:round-filter-list",
}: Props) {
  const { translate } = useLocales();

  return (
    <Button
      variant={variant}
      color={color}
      startIcon={<Iconify icon={icon} />}
      onClick={onClick}
      sx={{
        mt: 4,
        display: {
          xs: "flex",
          sm: "flex",
          md: alwaysVisible ? "flex" : "none",
        },
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "grey.600" : "grey.300",
        color: (theme) => (theme.palette.mode === "dark" ? "black" : "inherit"),
        ...sx,
      }}
    >
      {translate("buildings.filters")}
    </Button>
  );
}
