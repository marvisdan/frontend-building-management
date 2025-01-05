import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from "@mui/material";

import { AssetViewType, ViewOrder } from "../../types";
import Iconify from "../iconify";

interface AssetChangeViewButtonProps extends ToggleButtonGroupProps {
  value: string;
  order?: ViewOrder;
  onChange: (
    event: React.MouseEvent<HTMLElement>,
    newView: AssetViewType
  ) => void;
}
export default function AssetChangeViewButton({
  value,
  onChange,
  order = "natural",
  ...other
}: AssetChangeViewButtonProps) {
  return (
    <ToggleButtonGroup
      size="small"
      color="primary"
      value={value}
      exclusive
      onChange={onChange}
      {...other}
    >
      <ToggleButton value={order === "natural" ? "list" : "grid"}>
        <Iconify
          icon={order === "natural" ? "eva:list-fill" : "eva:grid-fill"}
        />
      </ToggleButton>

      <ToggleButton value={order === "natural" ? "grid" : "list"}>
        <Iconify
          icon={order === "natural" ? "eva:grid-fill" : "eva:list-fill"}
        />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
