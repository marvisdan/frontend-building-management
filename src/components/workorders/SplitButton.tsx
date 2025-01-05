import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { Fragment, useRef, useState } from "react";

import { StatusType } from "src/types";
import { getWorkorderStatusColor } from "../../helpers";
import { useLocales } from "../../locales";
import { getWorkorderStatus } from "../../pages/helpers/getWorkorderStatus";
import Status from "./Status";

const OverdueType = "Overdue";
export default function SplitButton({
  status,
  currentStatusId,
  updateStatus,
}: {
  status: StatusType[];
  currentStatusId: number;
  updateStatus: (id: number) => void;
}) {
  const { translate } = useLocales();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<number>(currentStatusId ?? 0);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    id: number
  ) => {
    setSelectedId(id);
    updateStatus(id);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const findSelectedStatusName =
    status.find((v) => v.id === selectedId)?.name ?? "";

  const statusColor = getWorkorderStatusColor(
    findSelectedStatusName.split(" ").join("_")
  );
  return (
    <Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Status
          sx={{
            px: 7,
            borderRadius: "8px 0 0 8px",
            height: "35px",
            width: 80,
          }}
          status={getWorkorderStatus({
            status: findSelectedStatusName.split(" ").join("_"),
            translate,
          })}
          color={statusColor === "primary" ? "default" : statusColor}
        />
        <Button
          size="medium"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{ borderRadius: "0 8px 8px 0", height: "35px", width: 2 }}
          color={statusColor === "primary" ? "inherit" : statusColor}
        >
          <ArrowDropDownIcon
            color={statusColor === "primary" ? "action" : "inherit"}
          />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {status
                    .filter((status: StatusType) => status.name !== OverdueType) // Filter Overdue Status
                    .map(({ name, id }, index) => (
                      <MenuItem
                        key={`${id}-${index}`}
                        selected={id === selectedId}
                        onClick={(event) => handleMenuItemClick(event, id)}
                        disabled={
                          // TODO: Add unit test
                          // Overdue status can be Completed only
                          (selectedId === 4 && id !== 5) ||
                          // Completed status cannot be ON HOLD
                          (selectedId === 5 && id === 6)
                        }
                      >
                        {name}
                      </MenuItem>
                    ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
}
