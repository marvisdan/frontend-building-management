import { Navigate, useRoutes } from "react-router-dom";

// config
// auth
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
import { PATH_AFTER_LOGIN } from "../config";
// layouts
import CompactLayout from "../layouts/compact";
import DashboardLayout from "../layouts/dashboard";
//
import { Box, LinearProgress } from "@mui/material";
import { useMemo } from "react";
import { dataBuildingsType } from "src/types";
import { useAuthContext } from "../auth/useAuthContext";
import { useFetchOrganizationSites } from "../hooks";
import {
  AssetDetailsPage,
  BuildingsPage,
  ContactsPage,
  CreateContactPage,
  CreateWorkorderPage,
  EditAssetPage,
  EditContactPage,
  EditWorkorderPage,
  LoginPage,
  NewPasswordPage,
  Page404,
  PasswordChangedPage,
  ProfilePage,
  ResetPasswordPage,
  WorkorderDetailsPage,
  WorkorderListPage,
} from "./elements";

const formatDataBuildings = (data: any) =>
  data &&
  data.reduce(
    (acc: any, curr: { label: string; name: string; id: number }) => [
      ...acc,
      {
        label: curr.name.split(` `).join(`-`).toLowerCase(),
        title: curr.name,
        id: curr.id,
      },
    ],
    []
  );

export default function Router() {
  const { accessToken } = useAuthContext();
  const { data = [], isLoading } = useFetchOrganizationSites(accessToken);
  const dataBuildings: dataBuildingsType[] = useMemo(
    () => formatDataBuildings(data),
    [data]
  );

  if (isLoading) {
    <Box mt={2}>
      <LinearProgress />
    </Box>;
  }

  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          element: <CompactLayout />,
          children: [
            { path: "reset-password", element: <ResetPasswordPage /> },
            { path: "new-password", element: <NewPasswordPage /> },
            { path: "password-changed", element: <PasswordChangedPage /> },
          ],
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        // <AuthGuard>
        <DashboardLayout buildings={dataBuildings} />
        // </AuthGuard>
      ),
      children: [
        {
          element: <Navigate to={PATH_AFTER_LOGIN(dataBuildings)} replace />,
          index: true,
        },
        // { path: "analytics", element: <AnalyticsPage /> },
        {
          path: "buildings",
          children: [{ path: ":id", element: <BuildingsPage /> }],
        },
        {
          path: "contact",
          children: [
            { path: "list", element: <ContactsPage /> },
            { path: "create", element: <CreateContactPage /> },
            { path: ":id", element: <EditContactPage /> },
          ],
        },
        {
          path: "workorder",
          children: [
            {
              path: "",
              element: <WorkorderListPage />,
            },
            {
              path: "create",
              element: <CreateWorkorderPage />,
            },
            {
              path: "edit",
              children: [{ path: ":id", element: <EditWorkorderPage /> }],
            },
          ],
        },
        // {
        //   path: "contact",
        //   children: [
        //     { path: "list", element: <ContactsPage /> },
        //     { path: "create", element: <CreateContactPage /> },
        //     { path: ":id", element: <EditContactPage /> },
        //   ],
        // },
        {
          path: "workorder",
          children: [
            {
              path: "",
              element: <WorkorderListPage />,
            },
            {
              path: "create",
              element: <CreateWorkorderPage />,
            },
            {
              path: "edit",
              children: [{ path: ":id", element: <EditWorkorderPage /> }],
            },

            { path: ":id/details", element: <WorkorderDetailsPage /> },
          ],
        },
        {
          path: "asset",
          children: [
            // { path: "list", element: <AssetListPage /> },
            {
              path: "edit",
              children: [{ path: ":id", element: <EditAssetPage /> }],
            },
            { path: ":id/details", element: <AssetDetailsPage /> },
          ],
        },
        {
          path: "user",
          children: [{ path: "profile", element: <ProfilePage /> }],
        },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: "404", element: <Page404 /> }],
    },
    { path: "/", element: <Navigate to="/dashboard" /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
