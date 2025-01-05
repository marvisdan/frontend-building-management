import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Box, IconButton, RadioGroup, Stack, styled } from "@mui/material";

import { dataBuildingsType } from "src/types";
import Logo from "../../../components/logo";
import { NavSectionMini } from "../../../components/nav-section";
import { useSettingsContext } from "../../../components/settings";
import { MaskControl } from "../../../components/settings/styles";
import { NAV } from "../../../config";
import { MAXEN_LOGO } from "../../../constants";
import { useLocales } from "../../../locales";
import { hideScrollbarX } from "../../../utils";
import navConfig from "./config";

const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  position: "absolute",
  top: "25px",
  left: "75px",
  borderRadius: "50%",
  border: `1px dashed ${theme.palette.action.disabledBackground}`,
  bgcolor: "background.neutral",
  zIndex: theme.zIndex.appBar + 1,
}));

type Props = {
  buildings: dataBuildingsType[];
};

export default function NavMini({ buildings }: Props) {
  const { themeLayout, onChangeLayout } = useSettingsContext();
  const { translate } = useLocales();

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD_MINI },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <StyledRadioGroup value={themeLayout} onChange={onChangeLayout}>
          <IconButton size="small" sx={{ p: 0.25 }}>
            <ChevronRightOutlinedIcon fontSize="small" />
            <MaskControl value="vertical" />
          </IconButton>
        </StyledRadioGroup>
      </Box>
      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: "fixed",
          width: NAV.W_DASHBOARD_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <Logo src={MAXEN_LOGO} sx={{ mx: "auto", my: 2 }} />

        <NavSectionMini data={navConfig(buildings)(translate)} />
      </Stack>
    </Box>
  );
}
