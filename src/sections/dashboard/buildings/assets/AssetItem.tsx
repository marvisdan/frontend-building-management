import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import Image from "../../../../components/image";
import TextMaxLine from "../../../../components/text-max-line";

export type AssetItemProps = {
  name: string;
  description: string;
  thumbnail: string;
  onClick?: VoidFunction;
};

const AssetItem = ({
  thumbnail,
  name,
  description,
  onClick,
}: AssetItemProps) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card
      sx={{
        marginX: 1,
        borderRadius: 0.5,
        cursor: "pointer",
      }}
      data-testid="asset-item"
      onClick={onClick}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Image
          alt={name}
          src={thumbnail}
          height="auto"
          sx={{
            maxWidth: 80,
            maxHeight: 85,
          }}
        />
        <CardContent
          sx={{
            padding: 1,
          }}
        >
          <TextMaxLine title={name} line={1}>
            <Typography variant="subtitle2" component="span">
              {name}
            </Typography>
          </TextMaxLine>
          <TextMaxLine title={name} line={1}>
            <Typography variant="body2" component="span" color="text.secondary">
              {description}
            </Typography>
          </TextMaxLine>
        </CardContent>
      </Box>
    </Card>
  </Grid>
);

export default AssetItem;
