import { Stack } from "@mui/material";
import { memo } from "react";
//
import { NavListProps, NavSectionProps } from "../types";
import NavList from "./NavList";

// ----------------------------------------------------------------------

function NavSectionMini({ data, sx, ...other }: NavSectionProps) {
  return (
    <Stack
      spacing={0.5}
      alignItems="center"
      sx={{
        px: 0.75,
        ...sx,
      }}
      {...other}
    >
      {data.map((group, key) => (
        <Items key={key} items={group.items} />
      ))}
    </Stack>
  );
}

export default memo(NavSectionMini);

// ----------------------------------------------------------------------

type ItemsProps = {
  items: NavListProps[];
};

function Items({ items }: ItemsProps) {
  return (
    <>
      {items.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={1}
          hasChild={Boolean(list.children)}
          hasSeparator={list.separator}
        />
      ))}
    </>
  );
}
