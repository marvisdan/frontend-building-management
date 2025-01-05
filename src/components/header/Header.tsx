import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Fab,
  MenuItem,
  Stack,
  Theme,
  Typography,
} from "@mui/material";

import { useResponsive } from "../../hooks";
import { useLocales } from "../../locales";
import { PATH_DASHBOARD } from "../../routes/paths";
import { ColorSchema } from "../../theme/palette";
import { AssetModalContainer } from "../assets/AssetModalContainer";
import MenuPopover from "../menu-popover";
import MultiActionsButton from "../multi-actions-button";
import MultiActionsPopover, {
  multiActionsPopoverType,
} from "../multi-actions-popover";

export type HeaderButtonType = {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (event?: any) => void;
  label?: string | { text: string; options?: any };
  variant?: "contained" | "outlined" | "text";
  color?: ColorSchema;
  key: string;
};

type HeaderButtonProps = {
  headerTitle: string;
  headerButton?: HeaderButtonType;
};

export default function Header({
  headerTitle,
  headerButton,
}: HeaderButtonProps) {
  const [openMorePopover, setOpenMorePopover] = useState<null | HTMLElement>(
    null
  );
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [openPopover, setOpenPopover] = useState<null | HTMLElement>(null);

  const { translate } = useLocales();
  const navigate = useNavigate();

  const isMobile = useResponsive("down", "sm");
  const isTablet = useResponsive("down", "md");

  const handleCloseMorePopover = () => setOpenMorePopover(null);

  const handleMoreMenuClick = (event: any) =>
    setOpenMorePopover(event.currentTarget);

  const handleMiniButton = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMorePopover(event.currentTarget);
  };
  const handleClose = () => {
    setOpenPopover(null);
  };

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  const handleOpenModal = () => {
    handleClose();
    setOpenModal(true);
  };

  const menuItems = [
    {
      icon: <CalendarTodayIcon fontSize="small" />,
      onClick: () => null,
      label: translate("contacts.actions.create_workorder"),
      isHidden:
        !isTablet &&
        !isMobile &&
        headerButton?.key === translate("contacts.actions.create_workorder"),
    },
    {
      icon: <AddOutlinedIcon fontSize="small" />,
      onClick: () => navigate(PATH_DASHBOARD.contact.create),
      label: translate("contacts.actions.create"),
      isHidden:
        !isTablet &&
        !isMobile &&
        headerButton?.key === translate("contacts.actions.create"),
    },
    {
      icon: <AddOutlinedIcon fontSize="small" />,
      onClick: handleOpenModal,
      label: translate("contacts.actions.create_asset"),
      isHidden:
        !isTablet &&
        !isMobile &&
        headerButton?.key === translate("contacts.actions.create_asset"),
    },
    {
      icon: <FileDownloadOutlinedIcon fontSize="small" />,
      onClick: () => null,
      label: translate("contacts.actions.generate"),
      isHidden:
        !isTablet &&
        !isMobile &&
        headerButton?.key === translate("contacts.actions.generate"),
    },
  ];

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2, mr: 2 }}
      >
        <Typography variant="h3">{headerTitle}</Typography>

        {isMobile ? (
          <Stack direction="row" spacing={1}>
            <Fab color="primary" aria-label="more" onClick={handleMiniButton}>
              <MoreVertIcon />
            </Fab>
          </Stack>
        ) : (
          <Box>
            {isTablet ? (
              <Box>
                <MultiActionsButton
                  onClick={handleMiniButton}
                  label={translate("contacts.actions.multi")}
                />
              </Box>
            ) : (
              <>
                {headerButton ? (
                  <Stack direction="row" spacing={2}>
                    <Button
                      key="default_menu"
                      startIcon={<MoreHorizOutlinedIcon />}
                      variant="contained"
                      color="inherit"
                      sx={{
                        backgroundColor: ({ palette }: Theme) =>
                          palette.mode === "dark"
                            ? palette.action.active
                            : palette.action.disabledBackground,
                      }}
                      onClick={handleMoreMenuClick}
                    >
                      {translate("contacts.actions.more")}
                    </Button>

                    <Button
                      key="header_button"
                      startIcon={headerButton.startIcon}
                      variant={headerButton.variant}
                      color={headerButton.color}
                      onClick={headerButton.onClick}
                    >
                      <>{headerButton.label}</>
                    </Button>
                  </Stack>
                ) : null}
              </>
            )}
            {menuItems ? (
              <MultiActionsPopover
                open={openPopover}
                onClose={handleClose}
                actions={menuItems}
              />
            ) : null}
          </Box>
        )}
        {menuItems ? (
          <MorePopover
            open={openMorePopover}
            onClose={handleCloseMorePopover}
            actions={menuItems}
          />
        ) : null}
      </Box>
      <AssetModalContainer open={openModal} onClose={onCloseModal} />
    </>
  );
}

const MorePopover = ({
  open,
  onClose,
  actions,
}: {
  open: null | HTMLElement;
  onClose: () => void;
  actions: multiActionsPopoverType[];
}) => {
  const handleOpenModal = () => {
    onClose();
  };

  return (
    <MenuPopover
      disabledArrow
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ px: 1 }}
    >
      {actions.map((item, index) =>
        item.isHidden ? null : (
          <MenuItem
            key={index}
            onClickCapture={handleOpenModal}
            onClick={item.onClick}
          >
            <>
              {item.icon}
              {item.label}
            </>
          </MenuItem>
        )
      )}
    </MenuPopover>
  );
};
