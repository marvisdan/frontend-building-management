import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  LinearProgress,
  Link,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { useAuthContext } from "../../auth/useAuthContext";
import { useFetchOrganizationSites } from "../../hooks";
import { OrganizationType } from "../../types";

export type OrgnaizationSiteItemProps = {
  name: string;
  address: string;
};

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  marginBottom: 8,
});

const OrganizationItem = ({ name, address }: OrgnaizationSiteItemProps) => (
  <Card sx={{ display: "flex" }} data-testid="site-item">
    <CardMedia
      component="img"
      height="auto"
      sx={{
        maxWidth: 500,
      }}
      image={"/assets/images/sites/canadien.jpeg"}
    />
    <CardContent>
      <Stack
        direction="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{ mb: 3 }}
      >
        <Typography component="div" variant="h4">
          {name}
        </Typography>
        <Typography component="div" variant="body2" sx={{ mb: 1 }}>
          {"some description"}
        </Typography>
        <StyledBox>
          <PlaceOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">{address}</Typography>
        </StyledBox>

        <StyledBox>
          <SquareFootOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">{"418,822 sq.ft."}</Typography>
        </StyledBox>
        <StyledBox>
          <DateRangeOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">{"Completed in 2020"}</Typography>
        </StyledBox>
        <Link
          to={"#"}
          component={RouterLink}
          variant="body2"
          color="inherit"
          underline="always"
        >
          {"View all assets"}
        </Link>
      </Stack>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {Array.from(Array(4)).map((_, index) => (
          <Grid key={index} item xs={12} sm={12} md={6}>
            <Card>
              <CardContent>
                <Typography component="div" variant="subtitle1">
                  {"Entree principale"}
                </Typography>
                <Typography component="div" variant="body2">
                  {"some description"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </Card>
);

export default function OrganizationList() {
  const { accessToken } = useAuthContext();

  const { data, isLoading, isError, error } =
    useFetchOrganizationSites(accessToken);

  if (isLoading) {
    return (
      <Container>
        <LinearProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <h1>{error?.message}</h1>
      </Container>
    );
  }

  return (
    <Grid container data-testid="organization-list">
      {data &&
        data.map(({ id, name, address }: OrganizationType) => (
          <OrganizationItem key={id} name={name} address={address} />
        ))}
    </Grid>
  );
}
