import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
// hooks
import { useActiveLink } from "../../../hooks";
//
import { NavListProps } from "../types";
import NavItem from "./NavItem";
import { StyledPopover } from "./styles";

// ----------------------------------------------------------------------

type NavListRootProps = {
  data: NavListProps;
  depth: number;
  hasChild: boolean;
  hasSeparator?: boolean;
};

export default function NavList({
  data,
  depth,
  hasChild,
  hasSeparator,
}: NavListRootProps) {
  const navRef = useRef(null);

  const { pathname } = useLocation();

  const { active, isExternalLink } = useActiveLink(data.path);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {hasSeparator && (
        <Box
          sx={{
            width: 24,
            height: "1px",
            bgcolor: "divider",
            my: "8px !important",
          }}
        />
      )}
      <NavItem
        ref={navRef}
        item={data}
        depth={depth}
        open={open}
        active={active}
        isExternalLink={isExternalLink}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      />

      {hasChild && (
        <StyledPopover
          open={open}
          anchorEl={navRef.current}
          anchorOrigin={{ vertical: "center", horizontal: "right" }}
          transformOrigin={{ vertical: "center", horizontal: "left" }}
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          <NavSubList data={data.children} depth={depth} />
        </StyledPopover>
      )}
      {hasSeparator && (
        <Box
          sx={{
            width: 24,
            height: "1px",
            bgcolor: "divider",
            my: "8px !important",
          }}
        />
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type NavListSubProps = {
  data: NavListProps[];
  depth: number;
};

function NavSubList({ data, depth }: NavListSubProps) {
  return (
    <>
      {data.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChild={Boolean(list.children)}
        />
      ))}
    </>
  );
}
