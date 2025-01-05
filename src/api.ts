import axios from "axios";

import { URL } from "./constants";
import {
  AssetNoteType,
  CreateAssetType,
  CreateWorkorderType,
  EditAssetType,
  UserResetPassword,
} from "./types";
import axiosInstance from "./utils/axiosInstance";

/**
@description Retrieve user data
@param {String | null} accessToken The bearer token to pass with the request
@returns {Promise
} The user's data
*/

export async function fetchUser(accessToken: string | null) {
  const response = await fetch(`${URL.base}${URL.user}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchUsers({ limit }: { limit?: number }) {
  const url = `${URL.base}${URL.users}`;
  const response = await axiosInstance.get(url, {
    params: { limit },
  });

  const data = await response.data;
  return data;
}

export async function fetchUserbyId({
  token,
  id,
}: {
  id: string;
  token: string | null;
}) {
  const response = await axios.get(`${URL.base}${URL.users}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
}

export async function loginWithCredentials(username: string, password: string) {
  const response = await axios.post(
    `${URL.base}${URL.login}`,
    { username, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.data;
  return data;
}

export async function sendUserEmail(email: string) {
  const response = await axiosInstance.post(
    `${URL.base}${URL.forgotPassword}${email}`
  );
  const data = await response.data;
  return data;
}

export async function sendRecoverPassword({
  token, // TODO: add missing sendgrid token
  newPassword,
}: {
  token: string | null;

  newPassword: string;
}) {
  const response = await axiosInstance.post(
    `${URL.base}${URL.recoverpassword}`,
    {
      token,
      newPassword,
    }
  );
  const data = await response.data;
  return data;
}

export type fetchAssetsType = {
  url: string;
  organizationSiteId?: number;
  token?: string | null;
  category?: number;
  type?: number;
  search?: string;
  limit?: number | undefined;
};

export type fetchAssetTypesType = {
  url: string;
  limit?: number | undefined;
};

export type fetchAssetCategoriesType = {
  url: string;
  limit?: number | undefined;
};

export type fetchWorkordersType = {
  limit?: number | undefined;
  offset?: number | undefined;
  building?: number | null;
  assignee?: number | null;
  priority?: number | null;
  duedate?: Date | string | null;
  scheduleddate?: Date | string | null;
  status?: number | null;
  search?: string | null;
};
export type fetchAssetsWorkordersType = {
  limit?: number | undefined;
  id: number;
};

export async function fetchAssets({
  token,
  url,
  category,
  type,
  search,
  limit = 25,
  organizationSiteId,
}: fetchAssetsType) {
  const response = await axios.get(`${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit,
      assetTypeId: type,
      assetCategoryId: category,
      search,
      organizationSiteId,
    },
  });
  const data = await response.data;

  return data;
}

export async function fetchAssetById({ token, url }: any) {
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;

  return data;
}

export async function createAsset(newAsset: CreateAssetType) {
  const response = await axiosInstance.post(`${URL.base}${URL.assets}`, {
    ...newAsset,
  });

  const data = await response.data;
  return data;
}

export async function updateAsset(data: EditAssetType) {
  const response = await axiosInstance.patch(`${URL.base}${URL.assets}`, {
    ...data,
  });

  const res = await response.data;
  return res;
}

export async function createWorkorder(newWorkorder: CreateWorkorderType) {
  const response = await axiosInstance.post(`${URL.base}${URL.workorders}`, {
    ...newWorkorder,
  });

  const data = await response.data;
  return data;
}

export async function editWorkorder(workorder: CreateWorkorderType) {
  const response = await axiosInstance.patch(`${URL.base}${URL.workorders}`, {
    ...workorder,
  });

  const data = await response.data;
  return data;
}

export async function createMetadata(newMetdata: any) {
  const response = await axiosInstance.post(`${URL.base}${URL.assetMetadata}`, {
    ...newMetdata,
  });

  const data = await response.data;
  return data;
}

export async function updateMetadata(data: any) {
  const response = await axiosInstance.patch(
    `${URL.base}${URL.assetMetadata}`,
    {
      ...data,
    }
  );

  const result = await response.data;
  return result;
}

export async function createSpecification(specification: any) {
  const response = await axiosInstance.post(
    `${URL.base}${URL.assetSpecifications}`,
    {
      ...specification,
    }
  );

  const data = await response.data;
  return data;
}

export async function updateSpecification(specification: any) {
  const response = await axiosInstance.patch(
    `${URL.base}${URL.assetSpecifications}`,
    {
      ...specification,
    }
  );

  const data = await response.data;
  return data;
}

export async function createContact(newContact: any) {
  const response = await axiosInstance.post(
    `${URL.base}${URL.organizationContacts}`,
    {
      ...newContact,
    }
  );

  const data = await response.data;
  return data;
}

export async function updateContact(data: any) {
  const response = await axiosInstance.patch(
    `${URL.base}${URL.organizationContacts}`,
    {
      ...data,
    }
  );

  const result = await response.data;
  return result;
}

export async function updateUserProfile(data: any) {
  const response = await axiosInstance.patch(`${URL.base}${URL.users}`, {
    ...data,
  });

  const result = await response.data;
  return result;
}

export async function deleteAsset(assetId: number) {
  const response = await axiosInstance.delete(
    `${URL.base}${URL.assets}${assetId}`
  );

  const data = await response.data;
  return data;
}

export async function deleteMetadata(id: number) {
  const response = await axiosInstance.delete(
    `${URL.base}${URL.assetMetadata}/${id}`
  );

  const data = await response.data;
  return data;
}

export async function deleteSpecification(id: number) {
  const response = await axiosInstance.delete(
    `${URL.base}${URL.assetSpecifications}/${id}`
  );

  const data = await response.data;
  return data;
}

export async function deleteDocument(id: number) {
  const response = await axiosInstance.delete(
    `${URL.base}${URL.assetDocuments}/${id}`
  );

  const data = await response.data;
  return data;
}

export async function deleteWorkorder(id: number) {
  const response = await axiosInstance.delete(
    `${URL.base}${URL.workorders}/${id}`
  );

  const data = await response.data;
  return data;
}

export const createAssetNote = async (data: AssetNoteType) => {
  const response = await axiosInstance.post(`${URL.base}${URL.assetNotes}`, {
    ...data,
  });
  const d = await response.data;
  return d;
};

export const createWorkorderNote = async (data: any) => {
  const response = await axiosInstance.post(
    `${URL.base}${URL.workorderNotes}`,
    {
      ...data,
    }
  );
  const d = await response.data;
  return d;
};

export const createAssetDocument = async (data: any) => {
  const response = await axiosInstance.post(
    `${URL.base}${URL.assetDocuments}`,
    {
      ...data,
    }
  );
  const d = await response.data;
  return d;
};

export async function fetchAssetTypes({
  url,
  limit = 1000,
}: fetchAssetTypesType) {
  const response = await axiosInstance.get(url, {
    params: { limit },
  });
  const data = await response.data;
  return data;
}

export async function fetchAssetCategories({
  url,
  limit = 1000,
}: fetchAssetCategoriesType) {
  const response = await axiosInstance.get(url, {
    params: { limit },
  });
  const data = await response.data;
  return data;
}

export const fetchAssetNotes = async (url: string, limit?: number) => {
  const response = await axiosInstance.get(url, {
    params: { limit },
  });
  const data = await response.data;
  return data;
};

export const fetchWorkorderNotes = async (url: string) => {
  const response = await axiosInstance.get(url);
  const data = await response.data;
  return data;
};

export const fetchAssetMetadata = async (
  assetId: string,
  limit: number = 25
) => {
  const response = await axiosInstance.get(`${URL.base}${URL.assetMetadata}`, {
    params: { limit, assetId },
  });

  const data = await response.data;
  return data;
};

export const fetchAssetSpecifications = async (
  assetId: string,
  limit: number = 25
) => {
  const response = await axiosInstance.get(
    `${URL.base}${URL.assetSpecifications}`,
    {
      params: { limit, assetId },
    }
  );

  const data = await response.data;
  return data;
};

export const fetchSpecifications = async (offset?: number, limit?: number) => {
  const response = await axiosInstance.get(`${URL.base}${URL.specifications}`, {
    params: { limit, offset },
  });

  const data = await response.data;
  return data;
};

export const fetchMeasurementUnits = async (
  offset?: number,
  limit?: number
) => {
  const response = await axiosInstance.get(
    `${URL.base}${URL.measurementunits}`,
    {
      params: { limit, offset },
    }
  );

  const data = await response.data;
  return data;
};

//Note: For the moment, an User is supposed to have only one organization
export async function fetchOrganization(token: string | null) {
  const response = await axios.get(`${URL.base}${URL.organization}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.data;
  return data;
}

export async function fetchOrganizationSites(token: string | null) {
  const response = await axios.get(`${URL.base}${URL.organizationSites}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.data;
  return data;
}

export async function fetchOrganizationSiteById(
  token: string | null,
  id?: string
) {
  const response = await axios.get(`${URL.base}${URL.organizationSites}${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.data;
  return data;
}

export async function fetchDocumentsByAssetId(id: number, limit?: number) {
  const url = `${URL.base}${URL.assetDocuments}`;
  const response = await axiosInstance.get(url, {
    params: { limit, assetId: id },
  });
  const data = await response.data;
  return data;
}

export async function fetchWorkorders({
  limit,
  offset,
  building,
  assignee,
  priority,
  duedate,
  scheduleddate,
  status,
  search,
}: fetchWorkordersType) {
  const url = `${URL.base}${URL.workorders}/`;
  const response = await axiosInstance.get(url, {
    params: {
      limit,
      offset,
      search,
      workOrderPriorityId: priority,
      organizationSiteId: building,
      workOrderStatusId: status,
      assigneeUserId: assignee,
      dueDateEnd: duedate,
      scheduledDateEnd: scheduleddate,
    },
  });
  const data = await response.data;
  return data;
}

export async function fetchWorkorderById(id: number) {
  const url = `${URL.base}${URL.workorders}/${id}`;
  const response = await axiosInstance.get(url);
  const data = await response.data;
  return data;
}

export async function updateWorkorderChecklistItemById(data: {
  id: number;
  isChecked: boolean;
}) {
  const url = `${URL.base}${URL.workorderChecklistItem}/${data.id}`;
  const response = await axiosInstance.patch(url, {
    isChecked: data.isChecked,
  });
  const res = await response.data;
  return res;
}

export async function fetchWorkordersByAssetId({
  limit = 5,
  id,
}: fetchAssetsWorkordersType) {
  const url = `${URL.base}${URL.workordersByAssetId}/${id}`;
  const response = await axiosInstance.get(url, {
    // params: { limit },
  });
  const data = await response.data;
  return data;
}

export async function fetchWorkorderStatus() {
  const url = `${URL.base}${URL.workorderstatuses}`;
  const response = await axiosInstance.get(url);
  const data = await response.data;
  return data;
}

export async function fetchChecklistsByAssetId({
  id,
  limit = 25,
}: {
  id: number;
  limit?: number;
}) {
  const url = `${URL.base}${URL.assetChecklists}${id}/`;
  const response = await axiosInstance.get(url, {
    params: { limit },
  });
  const data = await response.data;
  return data;
}

export async function fetchChecklists({ limit }: { limit?: number }) {
  const url = `${URL.base}${URL.checklists}`;
  const response = await axiosInstance.get(url, {
    params: { limit },
  });
  const data = await response.data;
  return data;
}

export async function fetchWorkorderPriorities() {
  const url = `${URL.base}${URL.workorderpriorities}`;
  const response = await axiosInstance.get(url);
  const data = await response.data;
  return data;
}

export async function fetchWorkorderChecklistByWorkorderAndAsset({
  workorderId,
  assetId,
}: {
  workorderId: number;
  assetId: number;
}) {
  const url = `${URL.base}${URL.workorderchecklists}/${workorderId}/by-asset/${assetId}`;
  const response = await axiosInstance.get(url);
  const data = await response.data;
  return data;
}

export const fetchOrganizationContacts = async ({
  search,
  company,
  limit,
  title,
  token,
}: {
  token: string | null;
  company?: string;
  title?: string;
  search?: string;
  limit?: number | undefined;
}) => {
  const getContacts = await axios.get(
    `${URL.base}${URL.organizationContacts}`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { limit, title, company, search },
    }
  );
  const contacts = await getContacts.data;
  return contacts;
};

export const fetchAssetOrganizationContacts = async ({
  assetId,
  limit,
}: {
  assetId: number;
  limit?: number | undefined;
}) => {
  const getContacts = await axiosInstance.get(
    `${URL.base}${URL.assetorganizationcontacts}/${assetId}`,
    {
      params: { limit },
    }
  );
  const contacts = await getContacts.data;
  return contacts;
};

export const fetchOrganizationContactById = async (id: number) => {
  const getContactById = await axiosInstance.get(
    `${URL.base}${URL.organizationContacts}/${id}`
  );
  const contact = await getContactById.data;
  return contact;
};

export const deleteOrganizationContact = async (id: number) => {
  const deleteContact = await axiosInstance.delete(
    `${URL.base}${URL.organizationContacts}/${id}`
  );
  const contact = await deleteContact.data;
  return contact;
};

export const deleteAssetOrganizationContact = async (id: number) => {
  const deleteContact = await axiosInstance.delete(
    `${URL.base}${URL.assetorganizationcontacts}/${id}`
  );
  const contact = await deleteContact.data;
  return contact;
};

export const createAssetOrganizationContact = async (newContact: any) => {
  const deleteContact = await axiosInstance.post(
    `${URL.base}${URL.assetorganizationcontacts}`,
    {
      ...newContact,
    }
  );
  const contact = await deleteContact.data;
  return contact;
};

export const resetUserPassword = async (data: UserResetPassword) => {
  const response = await axiosInstance.post(`${URL.base}${URL.resetPassword}`, {
    ...data,
  });
  const contact = await response.data;
  return contact;
};
