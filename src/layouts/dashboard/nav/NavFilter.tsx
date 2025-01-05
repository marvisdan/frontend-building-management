// @mui
import { Box, Drawer } from "@mui/material";
// hooks
import useResponsive from "../../../hooks/useResponsive";
// config
import { NAV } from "../../../config";
// components
import Filter from "../../../components/filter/Filter";
import Scrollbar from "../../../components/scrollbar";

type Props = {
  children: JSX.Element;
  title: string;
  openNav: boolean;
  isSmallScreen?: boolean;
  displayOnAllScreen?: boolean;
  anchor?: "left" | "top" | "right" | "bottom";

  onCloseNav: VoidFunction;
  onResetFilter: (event: React.MouseEvent<HTMLElement>) => void;
  onSubmit: (
    formData: any,
    event: React.MouseEvent<HTMLElement>
  ) => Promise<void>;
};

export default function NavFilter({
  anchor,
  openNav,
  onCloseNav,
  onResetFilter,
  onSubmit,
  children,
  title,
  isSmallScreen,
  displayOnAllScreen,
}: Props) {
  const displayOnMobileOrTablet = useResponsive("down", "md");
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
      <Filter
        title={title}
        onReset={onResetFilter}
        onSubmit={onSubmit}
        isSmallScreen={isSmallScreen}
      >
        {children}
      </Filter>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: NAV.W_DASHBOARD,
      }}
    >
      {(displayOnMobileOrTablet || displayOnAllScreen) && (
        <Drawer
          anchor={anchor}
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
              px: displayOnMobileOrTablet ? 2 : 0.5,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
