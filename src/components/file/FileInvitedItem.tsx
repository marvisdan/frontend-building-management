import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

import { IFileShared } from "../../_mock/file";
import Iconify from "../iconify";
import MenuPopover from "../menu-popover";

type Props = {
  person: IFileShared;
};

export default function FileInvitedItem({ person }: Props) {
  const [permission, setPermission] = useState(person.permission);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangePermission = (newPermission: string) => {
    setPermission(newPermission);
  };

  return (
    <>
      <ListItem disableGutters>
        <ListItemAvatar>
          <Avatar alt={person.name} src={person.avatar} />
        </ListItemAvatar>

        <ListItemText
          primary={person.name}
          secondary={
            <Tooltip title={person.email}>
              <span>{person.email}</span>
            </Tooltip>
          }
          primaryTypographyProps={{ noWrap: true, typography: "subtitle2" }}
          secondaryTypographyProps={{ noWrap: true }}
          sx={{ flexGrow: 1, pr: 1 }}
        />

        <Button
          size="small"
          color="inherit"
          endIcon={
            <Iconify
              icon={
                openPopover ? "eva:chevron-up-fill" : "eva:chevron-down-fill"
              }
            />
          }
          onClick={handleOpenPopover}
          sx={{
            flexShrink: 0,
            textTransform: "unset",
            fontWeight: "fontWeightMedium",
            "& .MuiButton-endIcon": {
              ml: 0,
            },
            ...(openPopover && {
              bgcolor: "action.selected",
            }),
          }}
        >
          Can {permission}
        </Button>
      </ListItem>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 160 }}
      >
        <>
          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleChangePermission("view");
            }}
            sx={{
              ...(permission === "view" && {
                bgcolor: "action.selected",
              }),
            }}
          >
            <Iconify icon="eva:eye-fill" />
            Can view
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleChangePermission("edit");
            }}
            sx={{
              ...(permission === "edit" && {
                bgcolor: "action.selected",
              }),
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Can edit
          </MenuItem>

          <Divider sx={{ borderStyle: "dashed" }} />

          <MenuItem
            onClick={() => {
              handleClosePopover();
            }}
            sx={{ color: "error.main" }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Remove
          </MenuItem>
        </>
      </MenuPopover>
    </>
  );
}
