import { Box, Divider, LinearProgress, Stack, Typography } from "@mui/material";

import {
  useFetchAssetMetadata,
  useFetchAssetSpecifications,
} from "../../hooks";
import { useLocales } from "../../locales";

type AssetPropertiesProps = { assetId: string };

export default function AssetProperties({ assetId }: AssetPropertiesProps) {
  const { translate } = useLocales();

  const {
    data: metadata,
    isLoading: isLoadingMetadata,
    isError: isErrorMetadata,
    error: errorMetadata,
  } = useFetchAssetMetadata(Number(assetId));

  const {
    data: specifications,
    isLoading: isLoadingSpecifications,
    isError: isErrorSpecifications,
    error: errorSpecifications,
  } = useFetchAssetSpecifications(Number(assetId));

  return (
    <>
      <Typography variant="overline" mb={2}>
        {translate("asset.form.label.asset.identifier")}
      </Typography>
      <Stack direction="column" alignItems="flex-start" spacing={1}>
        {isErrorMetadata ? (
          <Box mt={1}>
            <Typography>{errorMetadata?.message}</Typography>
          </Box>
        ) : isLoadingMetadata ? (
          <Box mt={1}>
            <LinearProgress />
          </Box>
        ) : !metadata || metadata.length === 0 ? (
          <Box>
            <Typography variant="subtitle1" m={1}>
              {translate("asset.form.metadata.not_found")}
            </Typography>
          </Box>
        ) : (
          metadata &&
          metadata.map(({ name, value }, index) => (
            <Box key={index}>
              <Typography variant="subtitle2">{translate(name)}</Typography>
              <Typography variant="body2">{value}</Typography>
            </Box>
          ))
        )}
      </Stack>
      <Divider
        sx={{
          my: 2,
          borderStyle: "dashed",
          width: "100%",
        }}
      />
      <Typography variant="overline" sx={{ mb: 2 }}>
        {translate("asset.form.label.asset.specifications")}
      </Typography>
      <Stack direction={"column"} alignItems={"flex-start"} spacing={1}>
        {isErrorSpecifications ? (
          <Box mt={1}>
            <Typography>{errorSpecifications?.message}</Typography>
          </Box>
        ) : isLoadingSpecifications ? (
          <Box mt={1}>
            <LinearProgress />
          </Box>
        ) : !specifications || specifications.length === 0 ? (
          <Box>
            <Typography variant="h6" m={2}>
              {translate("asset.form.specification.not_found")}
            </Typography>
          </Box>
        ) : (
          specifications &&
          specifications.map(
            ({ specificationname: name, value, unit }, index) => (
              <Box key={index}>
                <Typography variant="subtitle2">{name}</Typography>
                <Typography variant="body2">{`${value} ${unit}`}</Typography>
              </Box>
            )
          )
        )}
      </Stack>
    </>
  );
}
