import { useState } from "react";
import { Outlet } from "react-router-dom";
// @mui
import { Box } from "@mui/material";
// hooks
import { useResponsive } from "../../hooks";
// components
import { useSettingsContext } from "../../components/settings";
//
import { dataBuildingsType } from "src/types";
import Main from "./Main";
import Header from "./header";
import NavHorizontal from "./nav/NavHorizontal";
import NavMini from "./nav/NavMini";
import NavVertical from "./nav/NavVertical";

export default function DashboardLayout({
  buildings,
}: {
  buildings: dataBuildingsType[];
}) {
  const { themeLayout } = useSettingsContext();
  const isDesktop = useResponsive("up", "lg");
  const [open, setOpen] = useState(false);
  const isNavHorizontal = themeLayout === "horizontal";
  const isNavMini = themeLayout === "mini";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = (
    <NavVertical
      openNav={open}
      buildings={buildings}
      onCloseNav={handleClose}
    />
  );

  if (isNavHorizontal) {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        {isDesktop ? <NavHorizontal /> : renderNavVertical}

        <Main>
          <Outlet />
        </Main>
      </>
    );
  }

  if (isNavMini) {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: "flex" },
            minHeight: { lg: 1 },
          }}
        >
          {isDesktop ? <NavMini buildings={buildings} /> : renderNavVertical}

          <Main>
            <Outlet />
          </Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={handleOpen} />

      <Box
        sx={{
          display: { lg: "flex" },
          minHeight: { lg: 1 },
        }}
      >
        {renderNavVertical}

        <Main>
          <Outlet />
        </Main>
      </Box>
    </>
  );
}
