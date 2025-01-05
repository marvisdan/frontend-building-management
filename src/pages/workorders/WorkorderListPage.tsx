import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  InputAdornment,
  OutlinedInput,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { throttle } from "lodash";
import { Translate } from "src/types";
import { useAuthContext } from "../../auth/useAuthContext";
import FilterButton from "../../components/filter/FilterButton";
import Header, { HeaderButtonType } from "../../components/header/Header";
import FormProvider from "../../components/hook-form";
import Iconify from "../../components/iconify";
import {
  WorkorderContent,
  WorkorderFilterForm,
} from "../../components/workorders";
import { WORKORDER_VIEW } from "../../constants";
import { useFetchWorkorders, useResponsive } from "../../hooks";
import NavFilter from "../../layouts/dashboard/nav/NavFilter";
import { useLocales } from "../../locales";
import { PATH_DASHBOARD } from "../../routes/paths";
import { useWorkorderStore } from "../../store/useWorkorderStore";

const getWorkorderFilterSchema = (translate: Translate) =>
  Yup.object().shape({
    organizationSiteId: Yup.string().nullable(),
    status: Yup.string().nullable(),
    assignee: Yup.string()
      //.required(translate("workorder.form.validation.required.assignee"))
      .nullable(),
    priority: Yup.string()
      //.required(translate("workorder.form.validation.required.priority"))
      .nullable(),
    duedate: Yup.date()
      //.required(translate("workorder.form.validation.required.duedate"))
      .nullable(),
    scheduleddate: Yup.date()
      //.required(translate("workorder.form.validation.required.scheduleddate"))
      .nullable(),
  });

export default function WorkorderListPage() {
  const { translate } = useLocales();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const isMobile = useResponsive("down", "sm");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [view, setView] = useState<WORKORDER_VIEW>(
    state?.viewType ?? WORKORDER_VIEW.List
  );
  const [searchInput, setSearchInput] = useState<string>("");

  const defaultValues = useMemo(
    () => ({
      organizationSiteId: "",
      assignee: "",
      priority: "",
      duedate: null,
      scheduleddate: null,
      status: "",
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(getWorkorderFilterSchema(translate)),
    defaultValues,
  });

  const { reset, watch } = methods;
  const building = watch("organizationSiteId");
  const assignee = watch("assignee");
  const priority = watch("priority");
  const duedate = watch("duedate");
  const scheduleddate = watch("scheduleddate");
  const status = watch("status");

  const limit = useWorkorderStore((state) => state.limit);
  const offset = useWorkorderStore((state) => state.offset);

  //TODO: Need Backend send filters into "data" object
  const { data, isFetching, isError, error, refetch } = useFetchWorkorders({
    limit: view === WORKORDER_VIEW.List ? limit : undefined,
    offset: view === WORKORDER_VIEW.List ? offset : undefined,
    // ...filters,
    building: building === "" ? null : Number(building),
    status: status === "" ? null : Number(status),
    priority: priority === "" ? null : Number(priority),
    assignee: assignee === "" ? null : Number(assignee),
    duedate,
    scheduleddate,
    search: searchInput,
  });

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleChange =
    (reset: any) =>
    (event: React.MouseEvent<HTMLElement>, nextView: WORKORDER_VIEW) => {
      reset();
      navigate(PATH_DASHBOARD.workorder.root, {
        state: {
          viewType: nextView,
        },
        replace: true,
      });

      if (nextView) {
        setView(nextView);
      }
    };

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const headerButton: HeaderButtonType = {
    startIcon: <Iconify icon="eva:plus-fill" width={16} />,
    onClick: () => {
      navigate(PATH_DASHBOARD.workorder.create);
    },
    variant: "contained",
    color: "primary",
    label: translate("buildings.create_workorders"),
    key: translate("contacts.actions.create"),
  };

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    refetch();
    setOpenDrawer(false);
  };

  const handleResetFilter = async (event: React.MouseEvent<HTMLElement>) => {
    await reset();
    onSubmit(event);
  };

  const throttledSearch = throttle(() => {
    refetch();
  }, 1000);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSearchInput(value);
    throttledSearch();
  };

  return (
    <Container maxWidth="xl" data-testid="workorders-list">
      <FormProvider methods={methods}>
        <Header
          headerTitle={translate("workorder.title", {
            user: `${user?.first_name} ${user?.last_name}`,
          })}
          headerButton={headerButton}
        />
        <Stack
          display="flex"
          direction={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
        >
          <ToggleButtonGroup
            orientation="horizontal"
            value={view}
            exclusive
            onChange={handleChange(reset)}
            sx={{ mb: isMobile ? 2 : 0 }}
          >
            <ToggleButton value="list" aria-label="list">
              <Iconify icon="ic:outline-list" />
            </ToggleButton>
            <ToggleButton value="grid" aria-label="grid">
              <Iconify icon="ic:outline-grid-view" />
            </ToggleButton>
            <ToggleButton value="calendar" aria-label="calendar" disabled>
              <Iconify icon="ic:outline-calendar-today" />
            </ToggleButton>
          </ToggleButtonGroup>

          {view !== WORKORDER_VIEW.List ? (
            <OutlinedInput
              value={searchInput}
              fullWidth
              placeholder={translate(
                "workorder.components.search_bar_placeholder"
              )}
              onChange={handleInputChange}
              error={!!error}
              sx={{ ml: isMobile ? 0 : 1, flex: 1 }}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="ic:outline-search" />
                </InputAdornment>
              }
            />
          ) : null}

          <FilterButton
            onClick={handleOpenDrawer}
            sx={{ ml: isMobile ? 0 : 1, mt: isMobile ? 2 : 0, height: "56px" }}
            alwaysVisible
          />
        </Stack>
        <NavFilter
          anchor="right"
          title={translate("filters.title")}
          openNav={openDrawer}
          onCloseNav={handleCloseDrawer}
          onResetFilter={handleResetFilter}
          onSubmit={onSubmit}
          displayOnAllScreen
        >
          <WorkorderFilterForm />
        </NavFilter>
        <WorkorderContent
          view={view}
          data={data}
          refetch={refetch}
          isFetching={isFetching}
          isError={isError}
          error={error}
        />
      </FormProvider>
    </Container>
  );
}
