import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { useLocales } from "../../locales";
import { TableFilterKey } from "../../pages/workorders/WorkordersListView";
import CustomPopover, { usePopover } from "../custom-popover";
import Iconify from "../iconify";

type Props = {
  filters: any;
  onFilters: (name: TableFilterKey, value: any) => void;
};

export default function TableToolbar({ filters, onFilters }: Props) {
  const popover = usePopover();
  const { translate } = useLocales();
  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilters("name", event.target.value);
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: "flex-end", md: "center" }}
        direction={{
          xs: "column",
          md: "row",
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          flexGrow={1}
          sx={{ width: 1 }}
        >
          <TextField
            fullWidth
            value={filters.name}
            onChange={handleFilterName}
            placeholder={translate(
              "workorder.components.search_bar_placeholder"
            )}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <IconButton onClick={popover.onOpen} disabled>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          {translate("workorder.actions.print")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          {translate("workorder.actions.export")}
        </MenuItem>
      </CustomPopover>
    </>
  );
}
