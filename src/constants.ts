import { DatePickerSlotsComponentsProps } from "@mui/x-date-pickers";
import { FieldError } from "react-hook-form";

export const MAXEN_LOGO_FULL = "/assets/images/logos/maxen-full.svg";
export const MAXEN_LOGO = "/assets/images/logos/maxen.svg";
export const ASSET_PLACEHOLDER = "/assets/images/placeholders/asset.png";
export const TWO_MINUTES = 120000;
export const CONTACT_NUMBER_LIST = 4;
export const ASSET_NUMBER_LIST = 2;
export const ASSET_NUMBER_LIST_MAX = 30;

export const URL = {
  base:
    process.env.NODE_ENV === "development"
      ? process.env.MAXEN_CONNECT_API_LOCAL
      : process.env.MAXEN_CONNECT_API,
  login: "/login",
  users: "/users",
  user: "/user",
  forgotPassword: "/forgotpassword/",
  recoverpassword: "/recoverpassword/",
  resetPassword: "/resetpassword",
  assets: "/assets",
  assettypes: "/assettypes/",
  assetcategories: "/assetcategories/",
  organizationSites: "/organizationsites/",
  organization: "/organizations",
  workorders: "/workorders",
  assetChecklists: "/asset-workorder-checklist/by-asset/",
  checklists: "/checklists/",
  workorderpriorities: "/workorderpriorities",
  assetDocuments: "/assetdocuments",
  workordersByAssetId: "/workorders/by-asset",
  workorderstatuses: "/workorderstatuses",
  organizationContacts: "/organizationcontacts",
  assetorganizationcontacts: "/assetorganizationcontacts",
  assetNotes: "/assetnotes",
  workorderNotes: "/workordernotes",
  assetMetadata: "/assetmetadata",
  assetSpecifications: "/assetSpecifications",
  workorderChecklistItem: "/workorderchecklistitem",
  workorderchecklists: "/workorderchecklists",
  specifications: "/specifications",
  measurementunits: "/measurementunits",
  assetWorkorderChecklist: "/asset-workorder-checklist/",
  workorderChecklistByWorkorderAndAsset:
    "/asset-workorder-checklist/by-assetworkorder-and-asset/",
};

export const VIEW = {
  list: "list",
  grid: "grid",
};

export const PROFILE_TABS = {
  change_password: "change_password",
  communication: "communication",
  general: "general",
};

export const DATE_FORMAT = "YYYY-MM-DD";

export enum WORKORDER_VIEW {
  List = "list",
  Grid = "grid",
  Calendar = "calendar",
}

export enum ASSET_TABS {
  Workorders,
  Documents,
  Checklists,
  SubAssets,
}

export enum EDIT_ASSET_TABS {
  Details,
  Identifiers,
  Specifications,
  Documents,
  Checklist,
  Contact,
}

export enum WorkorderPriority {
  Low,
  Normal,
  High,
  Urgent,
}

export enum WorkorderStatusEnum {
  OP,
  IP,
  BL,
  CO,
}

export enum WorkorderDateTable {
  all,
  week,
  two_weeks,
  month,
  three_months,
}

export const BUILDING_TABS = {
  analytics: "analytics",
  assets: "assets",
  maintenance: "maintenance",
  performance: "performance",
  presentation: "presentation",
  workorders: "workorders",
};

export const slotProps = (
  error: FieldError | undefined
): DatePickerSlotsComponentsProps<any> | undefined => ({
  actionBar: {
    actions: ["clear"],
  },
  textField: {
    fullWidth: true,
    error: !!error,
    helperText: error?.message,
  },
});
