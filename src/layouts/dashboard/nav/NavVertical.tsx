import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  RadioGroup,
  Stack,
  styled,
} from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAuthContext } from "../../../auth/useAuthContext";
import { NAV } from "../../../config";
import { useResponsive } from "../../../hooks";
import navConfig from "./config";

import { dataBuildingsType } from "src/types";
import Logo from "../../../components/logo";
import { NavSectionVertical } from "../../../components/nav-section";
import Scrollbar from "../../../components/scrollbar";
import { useSettingsContext } from "../../../components/settings";
import { MaskControl } from "../../../components/settings/styles";
import { useLocales } from "../../../locales";

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
  buildings: dataBuildingsType[];
};

const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  position: "fixed",
  top: "30px",
  left: "265px",
  borderRadius: "50%",
  border: `1px dashed ${theme.palette.action.disabledBackground}`,
  bgcolor: "background.neutral",
  zIndex: 100000,
}));

export default function NavVertical({ openNav, buildings, onCloseNav }: Props) {
  const { pathname } = useLocation();
  const { handleUserRoleChange, role } = useAuthContext();
  const isDesktop = useResponsive("up", "lg");
  const { translate } = useLocales();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const { themeLayout, onChangeLayout } = useSettingsContext();
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {openNav ? null : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <StyledRadioGroup value={themeLayout} onChange={onChangeLayout}>
            <IconButton sx={{ p: 0.25 }} size="small">
              <ChevronLeftIcon fontSize="small" />
              <MaskControl value="mini" />
            </IconButton>
          </StyledRadioGroup>
        </Box>
      )}
      <Stack
        spacing={3}
        alignItems="center"
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <Logo src="/assets/images/logos/maxen-full.svg" sx={{ width: 160 }} />
      </Stack>
      <NavSectionVertical data={navConfig(buildings)(translate)} />

      {role && false && (
        // TODO: change WIth user role base when backend will be ready
        <Stack margin={2} spacing={1}>
          <Button
            variant={role?.readOnly ? "contained" : "outlined"}
            onClick={() =>
              handleUserRoleChange({ readOnly: true, readWrite: false })
            }
          >
            {"READONLY"}
          </Button>
          <Button
            variant={role?.readWrite ? "contained" : "outlined"}
            onClick={() =>
              handleUserRoleChange({ readOnly: false, readWrite: true })
            }
          >
            {"READ/WRITE"}
          </Button>
        </Stack>
      )}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
              bgcolor: "transparent",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
