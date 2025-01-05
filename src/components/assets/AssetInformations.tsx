import styled from "@emotion/styled";
import { Box, Card, Divider, Stack, Typography } from "@mui/material";

import { ASSET_PLACEHOLDER } from "../../constants";
import Iconify from "../iconify";
import AssetProperties from "./AssetProperties";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const AssetInformations = ({
  assetId,
  thumbnail,
  description,
  building,
}: {
  assetId: string;
  thumbnail?: string;
  description?: string;
  address?: string;
  building?: string;
}) => (
  <Card>
    <Stack>
      <Box
        component="img"
        sx={{
          height: "auto",
          maxHeight: {
            md: "20vw",
            sm: "40vw",
          },
        }}
        src={thumbnail ?? ASSET_PLACEHOLDER}
      />
      <Stack
        direction="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{
          padding: {
            sm: 3,
            xs: 2,
          },
        }}
      >
        {description && (
          <Typography component="div" variant="body2">
            {description}
          </Typography>
        )}

        <Divider
          sx={{
            my: 2,
            borderStyle: "dashed",
            width: "100%",
          }}
        />
        <StyledBox>
          <Iconify icon={"ic:baseline-place"} sx={{ mr: 1 }} />
          <Typography variant="body2">{building}</Typography>
        </StyledBox>
        {/* <Stack direction={"column"} alignItems={"flex-start"} spacing={1}>
            {assetInfo.map(({ label, icon }, index) => (
              <StyledBox key={index}>
                <Iconify icon={icon} sx={{ mr: 1 }} />
                <Typography variant="body2">{translate(label)}</Typography>
              </StyledBox>
            ))}
          </Stack> */}
        <Divider
          sx={{
            my: 2,
            borderStyle: "dashed",
            width: "100%",
          }}
        />
        <AssetProperties assetId={assetId} />
      </Stack>
    </Stack>
  </Card>
);

export default AssetInformations;
