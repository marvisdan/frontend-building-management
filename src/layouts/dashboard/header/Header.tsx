// @mui
import { AppBar, IconButton, Stack, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// utils
import { bgBlur } from "../../../utils";
// hooks
import { useOffSetTop, useResponsive } from "../../../hooks";
// config
import { HEADER, NAV } from "../../../config";
// components
import Iconify from "../../../components/iconify";
import Logo from "../../../components/logo";
import { useSettingsContext } from "../../../components/settings";
//
import Brightness6Icon from "@mui/icons-material/Brightness6";
import { MAXEN_LOGO } from "../../../constants";
import AccountPopover from "./AccountPopover";
import LanguagePopover from "./LanguagePopover";

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const { themeLayout, onToggleMode } = useSettingsContext();

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const isDesktop = useResponsive("up", "lg");

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

  const renderContent = (
    <>
      {isDesktop && isNavHorizontal && (
        <Logo src={MAXEN_LOGO} sx={{ mr: 2.5 }} />
      )}

      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: "text.primary" }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        <LanguagePopover />
        <IconButton onClick={onToggleMode}>
          <Brightness6Icon />
        </IconButton>
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: "background.default",
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
