import { ListItemButtonProps, StackProps } from "@mui/material";

// ----------------------------------------------------------------------

export type INavItem = {
  item: NavListProps;
  depth: number;
  open?: boolean;
  active?: boolean;
  isExternalLink?: boolean;
};

export type NavItemProps = INavItem & ListItemButtonProps;

type SubHeadersProps = {
  general: string;
  todo: string;
};
export type NavListProps = {
  title: string;
  path: string;
  icon?: React.ReactElement;
  info?: React.ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: any;
  separator?: boolean;
};

export interface NavSectionProps extends StackProps {
  data: {
    subheaders: SubHeadersProps;
    items: NavListProps[];
  }[];
}
