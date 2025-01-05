import {
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useSettingsContext } from "../components/settings";

import { useAuthContext } from "../auth/useAuthContext";
import { AssetModalContainer } from "../components/assets/AssetModalContainer";
import { AssetTabs } from "../components/assets/tabs";
import Iconify from "../components/iconify/Iconify";
import MenuPopover from "../components/menu-popover/MenuPopover";
import getMaxlevel from "../components/tabs/getMaxlevel";
import { useFetchOrganizationSiteById } from "../hooks";
import { useLocales } from "../locales";
import { PATH_DASHBOARD } from "../routes/paths";
import { useTabsStore } from "../store/useTabsStore";

export default function BuildingsPage() {
  const { translate } = useLocales();
  const { accessToken } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const fetchAssetLevels = useTabsStore((state) => state.fetchAssetLevels);
  const getTabsBuilidng = useTabsStore((state) => state.tabs);
  const navigate = useNavigate();
  const { id } = useParams();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data: building = { name: "" } } = useFetchOrganizationSiteById(
    accessToken,
    id
  );

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setOpenPopover(event.currentTarget);
    },
    [setOpenPopover]
  );
  useEffect(() => {
    fetchAssetLevels();
  }, [fetchAssetLevels]);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, [setOpenPopover]);

  const maxLevel: number = useMemo(
    () => (getTabsBuilidng?.levels ? getMaxlevel(getTabsBuilidng?.levels) : 0),
    [getTabsBuilidng?.levels]
  );

  const handleOpenModal = useCallback(() => {
    handleClosePopover();
    setOpenModal(true);
  }, [handleClosePopover, setOpenModal]);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ my: 3 }}
      >
        <Typography variant="h3">{building?.name}</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            startIcon={<Iconify icon="mdi:dots-horizontal" />}
            variant="contained"
            color="inherit"
            onClick={handleOpenPopover}
            sx={{
              mr: 2,
              px: 2,
              backgroundColor: ({ palette }: Theme) =>
                palette.mode === "dark"
                  ? palette.action.active
                  : palette.action.disabledBackground,
            }}
          >
            {translate("buildings.more")}
          </Button>
          <Button
            startIcon={<Iconify icon="eva:plus-fill" width={16} />}
            variant="contained"
            onClick={() => {
              navigate(PATH_DASHBOARD.workorder.create);
            }}
          >
            {translate("buildings.create_workorders")}
          </Button>
        </Box>
      </Stack>
      <AssetTabs
        isToplevel
        level={0}
        maxLevel={maxLevel}
        tabs={getTabsBuilidng?.levels}
      />
      <MenuPopover
        disabledArrow
        open={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          paddingX: 2,
        }}
      >
        <MenuItem onClick={handleOpenModal}>
          {translate("buildings.create_asset")}
        </MenuItem>
      </MenuPopover>
      <AssetModalContainer open={openModal} onClose={onCloseModal} />
    </Container>
  );
}
