import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack, { StackProps } from "@mui/material/Stack";

import { getTableDateFilterText } from "../../helpers";
import { useLocales } from "../../locales";
import {
  TableFilterKey,
  TableFiltersType,
} from "../../pages/workorders/WorkordersListView";
import { WorkorderDateTableType } from "../../types";
import Iconify from "../iconify";

type Props = StackProps & {
  filters: TableFiltersType;
  onFilters: (name: TableFilterKey, value: WorkorderDateTableType) => void;
  onResetFilters: VoidFunction;
  results?: number;
};

export default function TableFiltersResult({
  filters,
  onFilters,
  onResetFilters,
  results = 0,
  ...other
}: Props) {
  const { translate } = useLocales();

  const handleRemoveDueDate = () => {
    onFilters("dueDateFilter", "all");
  };

  const text = getTableDateFilterText(filters.dueDateFilter);

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: "body2" }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: "text.secondary", ml: 0.25 }}>
          {translate("workorder.form.label.workorder.results_found")}
        </Box>
      </Box>

      <Stack
        flexGrow={1}
        spacing={1}
        direction="row"
        flexWrap="wrap"
        alignItems="center"
      >
        {filters.dueDateFilter !== "all" && (
          <Block label={translate("workorder.form.label.workorder.dueDate")}>
            <Chip
              size="small"
              label={translate(text)}
              onDelete={handleRemoveDueDate}
            />
          </Block>
        )}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          {translate("workorder.actions.clear")}
        </Button>
      </Stack>
    </Stack>
  );
}

type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: "hidden",
        borderStyle: "dashed",
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: "subtitle2" }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
