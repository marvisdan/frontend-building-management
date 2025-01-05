// @mui
import { List, Stack } from "@mui/material";
// locales
import { useLocales } from "../../../locales";
//
import { NavSectionProps } from "../types";
import NavList from "./NavList";
import { StyledSubheader } from "./styles";

export default function NavSectionVertical({
  data,
  sx,
  ...other
}: NavSectionProps) {
  const { translate } = useLocales();

  return (
    <Stack sx={sx} {...other}>
      {data.map(({ subheaders, items }, key) => (
        <List key={key} disablePadding sx={{ px: 2 }}>
          {subheaders?.general && (
            <StyledSubheader disableSticky>
              {translate(subheaders.general)}
            </StyledSubheader>
          )}

          {items.slice(0, 2).map((list) => (
            <NavList
              key={list.title + list.path}
              data={list}
              depth={1}
              hasChild={Boolean(list.children)}
            />
          ))}

          {/* {subheaders?.todo && (
            <StyledSubheader disableSticky>
              {translate(subheaders.todo)}
            </StyledSubheader>
          )} */}

          {items.slice(2, items.length).map((list) => (
            <NavList
              key={list.title + list.path}
              data={list}
              depth={1}
              hasChild={Boolean(list.children)}
            />
          ))}
        </List>
      ))}
    </Stack>
  );
}
