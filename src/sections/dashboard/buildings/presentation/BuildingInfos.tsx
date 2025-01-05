import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import { Box, Card, Divider, Stack, styled, Typography } from "@mui/material";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  marginBottom: 8,
});

const BuildingInfos = ({ address }: { address: string }) => (
  <Card>
    <Stack>
      <Box
        component="img"
        sx={{
          height: "auto",
          maxHeight: {
            md: "auto",
            sm: "40vw",
          },
        }}
        src={"/assets/images/sites/canadien.jpeg"}
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
        <Typography component="div" variant="body2">
          {
            "Main building belonging to the Société Radio-Canada located in Montreal. It consists of a skyscraper of about twenty-five floors as well as a large basilica and many premises located underground."
          }
        </Typography>
        <Divider
          sx={{
            my: 2,
            borderStyle: "dashed",
            width: "100%",
          }}
        />

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
      </Stack>
    </Stack>
  </Card>
);
export default BuildingInfos;
