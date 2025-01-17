import { memo } from "react";
// @mui
import { AppBar, Box, BoxProps, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// config
import { HEADER } from "../../../config";
// utils
import { bgBlur } from "../../../utils";
// components
import { NavSectionHorizontal } from "../../../components/nav-section";
//
import { useLocales } from "../../../locales";
import navConfig from "./config";

// ----------------------------------------------------------------------

function NavHorizontal() {
  const theme = useTheme();
  const { translate } = useLocales();

  return (
    <AppBar
      component="nav"
      color="transparent"
      sx={{
        boxShadow: 0,
        top: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
        <NavSectionHorizontal data={navConfig([])(translate)} />
      </Toolbar>

      <Shadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        width: 1,
        m: "auto",
        borderRadius: "50%",
        position: "absolute",
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
