// @mui
import {
  Box,
  FormControlLabel,
  Switch,
  SxProps,
  TablePagination,
  TablePaginationProps,
} from "@mui/material";
import { Theme } from "@mui/material/styles";

import { useLocales } from "../../locales";

type Props = {
  dense?: boolean;
  onChangeDense?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
};

export default function TablePaginationCustom({
  dense,
  onChangeDense,
  rowsPerPageOptions,
  sx,
  ...other
}: Props & TablePaginationProps) {
  const { translate } = useLocales();
  return (
    <Box sx={{ position: "relative", ...sx }}>
      <TablePagination
        rowsPerPageOptions={
          rowsPerPageOptions ?? [
            25,
            50,
            100,
            200,
            500,
            { label: translate("pagination.all"), value: 10000 },
          ]
        }
        component="div"
        {...other}
      />

      {onChangeDense && (
        <FormControlLabel
          label="Dense"
          control={<Switch checked={dense} onChange={onChangeDense} />}
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: {
              md: "absolute",
            },
          }}
        />
      )}
    </Box>
  );
}
