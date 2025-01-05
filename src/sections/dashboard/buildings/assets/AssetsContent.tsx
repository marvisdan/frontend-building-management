import { Key } from "react";

// @mui
import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";

// components
import AssetList from "./AssetList";

import { useParams } from "react-router";
import { useAuthContext } from "../../../../auth/useAuthContext";
import { useSettingsContext } from "../../../../components/settings";
import { useInfiniteAssets } from "../../../../hooks";
import { useLocales } from "../../../../locales";
import { AssetResponseType } from "../../../../types";

type Props = {
  filters?: {
    type: number | undefined;
    category: number | undefined;
    search: string | undefined;
  };
};

const queryLimit: number = 50;

export default function AssetsContent({ filters }: Props) {
  const { translate } = useLocales();
  const { accessToken } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();

  const {
    data,
    isFetching,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteAssets({
    token: accessToken,
    category: filters?.category,
    type: filters?.type,
    search: filters?.search,
    limit: queryLimit,
    organizationSiteId: Number(id),
  });

  if (isError) {
    return (
      <Container
        data-testid="assets-error-message"
        maxWidth={themeStretch ? false : "xl"}
      >
        <h1>{error?.message}</h1>
      </Container>
    );
  }

  return isLoading ? (
    <Box data-testid="assets-loader" mt={2}>
      <LinearProgress />
    </Box>
  ) : (
    <Grid item xs={12} md={9} data-testid="assets-section">
      {!data ||
        !data?.pages ||
        (data?.pages[0].count === 0 ? (
          <Typography variant="h5" padding={2}>
            {translate("asset.not_found")}
          </Typography>
        ) : (
          <>
            <Grid
              container
              spacing={1}
              sx={{ width: "100%", height: "auto" }}
              data-testid="asset-list"
            >
              {data?.pages.map((pageData: AssetResponseType, key: Key) => (
                <AssetList key={key} assets={pageData.results} />
              ))}
              {hasNextPage && (
                <Grid
                  item
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  md={12}
                >
                  <Button
                    onClick={fetchNextPage}
                    variant="contained"
                    sx={{
                      flex: "row",
                      justifyContent: "center",
                      px: 3,
                      m: 1,
                    }}
                  >
                    {translate("asset.actions.show_more")}
                  </Button>
                </Grid>
              )}
            </Grid>
            {isFetching && !fetchNextPage && (
              <Box data-testid="assets-loader" mt={2}>
                <LinearProgress />
              </Box>
            )}
          </>
        ))}
    </Grid>
  );
}
