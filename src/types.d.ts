import { WorkorderPriority } from "./constants";

// UI Types
export type ViewOrder = "natural" | "inverted";

export type OrganizationType = {
  id: number;
  name: string;
  logo: string;
  address: string;
  created: string;
  updated: string;
};

export type OrganizationSiteType = {
  address: string;
  created: string | Date;
  id: number;
  name: string;
  organization: number;
  updated: string | Date;
};

export type User = {
  id: number;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  organizations: OrganizationType[] | any[];
  settings: {
    wallpaper: string;
    profile_picture: string;
  };
  rights: any[];
};
export type UserResetPassword = {
  username: string;
  oldPassword: string;
  newPassword: string;
};

export type OrganizationsListType = OrganizationType[];

// Assets
export type AssetViewType = "list" | "grid";
export type Asset = {
  url: string;
  id: number;
  organizationsite: OrganizationSiteType;
  assetcategory: number;
  assettype: number;
  organizationcontacts: [];
  name: string;
  description: string;
  graph?: {};
  thumbnail?: string;
  created?: string;
  updated?: string;
};
export type dataTableAssetType = {
  id: string;
  url: string;
  name: string;
  description: string;
  thumbnail: string;
  created: string;
  updated: string;
  assetcategory: number;
  assettype: number;
};

// User into Workorder
export type AssigneeType = {
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  name: string;
  organizations: any[];
};
export type AssignedContactType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  title: string;
  thumbnail: string;
  company?: string;
  created: string;
  updated: string;
  organization?: any;
};

export type dataTableWorkorderType = {
  id: string;
  name: string;
  duedate: Date | string | number;
  scheduleddate: Date | string | number;
  assignee: AssigneeType;
  assignedContact?: AssignedContactType;
  duedate: string;
  workOrderPriority?: any;
  status?: any;
};

// TODO: Send this to the Backend
export type FutureOrganizationType = {
  id: number;
  name: string;
  address: string;
  created: Date;
  updated: Date;
  thumnail: string;
  floors: [{ name: string; surface: string }];
};

export type UsersResponseType = {
  count: number;
  previous: string | null;
  next: string | null;
  results: User[];
};

export type AssetType = {
  url: string;
  id: number;
  assetcategory: number;
  name: string;
  created: string;
  updated: string;
};

export type AssetTypesType = {
  url: string;
  id: number;
  assetcategory: number;
  name: string;
  created: string;
  updated: string;
};

export type AssetCategoryType = {
  url: string;
  id: number;
  name: string;
  created: string;
  updated: string;
};

export type AssetResponseType = {
  count: number;
  previous: string | null;
  next: string | null;
  results: Asset[];
};

export type AssetTypesResponseType = {
  count: number;
  previous: string | null;
  next: string | null;
  results: AssetTypesType[];
};

export type AssetCategoriesResponseType = {
  count: number;
  previous: string | null;
  next: string | null;
  results: AssetCategoryType[];
};

export type SpecificationsResponseType = {
  count: number;
  previous: string | null;
  next: string | null;
  results: SpecificationsType[];
};

export type MeasurementUnitsResponseType = {
  count: number;
  previous: string | null;
  next: string | null;
  results: MeasurementUnitType[];
};

export type CreateAssetType = {
  name: string;
  description: string | null;
  assetCategoryId: number | undefined;
  assetTypeId: number | undefined;
  organizationSiteId: number | undefined;
  thumbnail?: CustomFile | string | null;
  organizationContacts: string[];
  graph?: [];
};

export interface EditAssetType extends CreateAssetType {
  id: number;
}

export type WorkorderDateTableType =
  | "all"
  | "week"
  | "two_weeks"
  | "month"
  | "three_months";

export type CreateWorkorderType = {
  name: string;
  dueDate: Date | string | number;
  // dueDate: string;
  //scheduledDate: string;
  scheduledDate: Date | string | number;

  description?: string;
  assetIds?: AssetType[] | any;
  checklistIds?: ChecklistType[] | any;
  workOrderPriorityId?: number;
  assignedToUserId: number | null;
  assignedToContactId?: number | null;
  status?: workorderStatusType;
};
export type EditWorkorderType = {
  workOrderId: number;
  name: string;
  dueDate: Date | string | number;
  // dueDate: string;
  //scheduledDate: string;
  scheduledDate: Date | string | number;

  description?: string;
  assetIds?: AssetType[] | any;
  checklistIds?: ChecklistType[] | any;
  workOrderPriorityId?: number;
  assignedToUserId: number | null;
  assignedToContactId?: number | null;
  status?: workorderStatusType;
};

export type CreateAssetNoteType = {
  assetId: string;
  title: string;
  note: string;
  isPinned?: boolean;
};

export type CreateWorkorderNoteType = {
  workorderId: string;
  title: string;
  note: string;
  isPinned?: boolean;
};

export type AssetNoteType = {
  asset: number;
  content: string;
  created: string;
  id: number;
  name: string;
  updated: string;
  url: string;
};

export type WorkorderNoteType = {
  workOrderNoteId: number;
  user: User;
  workorderId: number;
  title: string;
  note: string;
  created: string;
  updated: string;
  isPinned: boolean;
  insertedOn: string;
};

export type NoteType = "assetNote" | "workorderNote";

export type AssetDocumentType = {
  url: string;
  id: number;
  asset: number;
  document: string;
  document_filename: string;
  created: string;
  updated: string;
};

export type AssetNoteResponseType = {
  count: number;
  previous: string | null;
  next: string | null;
  results: AssetNoteType[];
};

export type AssetMetadataType = {
  id?: number;
  asset: number;
  value: string;
  name: string;
  created?: string;
  updated?: string;
  url?: string;
  isUpdated?: boolean;
  isCreated?: boolean;
  isDeleted?: boolean;
};

export type AssetSpecificationType = {
  id: number;
  asset: number;
  label_other?: string | null;
  value: string;
  specification: number;
  specificationname: string;
  specificationgroupid: number;
  specificationgroupname: string;
  measurementunit: number;
  measurementunitname: string;
  unit: string;
};

export type AssetMetadataResponseType = AssetMetadataType[];
export type AssetSpecificationResponseType = AssetSpecifications[];

export type SpecificationsType = {
  id: number;
  name: string;
  specificationgroup: number;
  specificationgroupname: string;
  created: string;
  updated: string;
};

export type MeasurementUnitType = {
  id: number;
  name: string;
  unit: string;
};

export type CategoryType = {
  url: string;
  id: number;
  name: string;
  created: string;
  updated: string;
};

export type WorkorderResponseType = {
  count: number;
  previous: string | null;
  next: string | null;
  results: WorkorderType[];
};

export type WorkorderPriorityType = keyof typeof WorkorderPriority;

export type WorkorderType = {
  id: string;
  name: string;
  duedate: Dayjs;
  status: {
    description: string;
    id: number;
    name: workorderStatusType;
    orderInList: number;
  };
  workOrderPriority?: any;
  type: string;
  url: string;
  assignee: AssigneeType;
  assignedContact?: AssignedContactType;
  // assignedToContact?: AssigneeType;
  scheduleddate: Dayjs;
  created: Date;
  updated: Date;
  description?: string;
  assets?: number[];
  checklists?: number[];
  assigned_by?: number;
  overdue?: boolean;
};

// Buildings
type dataBuildingsType = { label: string; title: string; id: string };

// Navigation and Tabulations
type navItemConfig = {
  title: string;
  path: string;
  icon: JSX.Element;
  info?: JSX.Element;
  children?: {
    title: string;
    path: string;
  }[];
};

type TabsType = {
  value: string;
  label: string;
  component: JSX.Element;
};

// Upload file
export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export type IUserAccountGeneral = {
  id: string;
  avatarUrl: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  company: string;
  isVerified: boolean;
  status: string;
  role: string;
};

// Internationalization
export type Translate = (text: any, options?: any) => string;

// Workorders
export type workorderStatusType =
  | "To_Plan"
  | "New"
  | "Ready"
  | "Overdue"
  | "Completed"
  | "On_Hold"
  | "In_Progress";

export type StatusType = {
  id: number;
  name: string;
  description: string;
  orderInList: number;
};

// OrganizationContactType
export type OrganizationContactType = {
  company: string;
  created?: string;
  email?: string;
  id: number;
  name: string;
  note?: string;
  organization?: {
    id: number;
    owner: number;
    name: string;
    logo: string;
    created: string;
    updated: string;
  };
  phone?: string;
  thumbnail?: string;
  title: string;
  updated?: string;
  url?: string;
};

export type OrganizationContactListType = OrganizationContactType[];

// AssetOrganizationContactsType

export type OrganizationContactListResponseType = {
  count: number;
  previous: string | null;
  next: string | null;
  results: OrganizationContactListType;
};
export type OrganizationContactDetails = {
  url?: string;
  id: number;
  name: string;
  note?: string;
  organization: number;
  phone?: string;
  thumbnail?: string;
  title: string;
  company: string;
  email?: string;
  company: string;
  created?: string;
  updated?: string;
};

export type AssetOrganizationContactType = {
  url?: string;
  id: number;
  asset: number;
  organizationcontact: string;
  organizationcontact_details: OrganizationContactDetails;
  created?: string;
  updated?: string;
};

export type AssetOrganizationContactListType = {
  count: number;
  previous: string | null;
  next: string | null;
  results: AssetOrganizationContactType[];
};

export type ChecklistType = {
  url: string;
  id: number;
  organization: number;
  name: string;
  description?: string;
  created: Date;
  updated: Date;
};
export type ChecklistsResponseType = {
  count: number;
  previous: string | null;
  next: string | null;
  results: ChecklistType[];
};

export type NewWorkorderPriorityType = {
  workOrderPriorityId: number;
  name: string;
  description: string;
  orderInList: number;
};

export type WorkorderFilter = {
  building: string | undefined;
  assignee: string | undefined;
  priority: WorkorderPriorityType | string;
  duedate: Date | string | null;
  scheduleddate: Date | string | null;
  status: workorderStatusType | string;
};
