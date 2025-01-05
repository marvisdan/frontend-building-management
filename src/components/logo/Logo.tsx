import { Link as RouterLink } from "react-router-dom";
import { Box, Link, BoxProps, SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

export interface LogoProps extends BoxProps {
  src: string;
  disabledLink?: boolean;
  sx?: SxProps<Theme>;
}

const Logo = ({ src, disabledLink = false, sx, ...other }: LogoProps) => {
  const logo = (
    <Box
      component="img"
      src={src}
      sx={{
        width: 40,
        height: 40,
        cursor: "pointer",
        ...sx,
      }}
      {...other}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: "contents" }}>
      {logo}
    </Link>
  );
};

export default Logo;
