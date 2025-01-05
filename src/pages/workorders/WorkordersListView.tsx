import {
  alpha,
  Box,
  Button,
  Card,
  IconButton,
  LinearProgress,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { isEqual } from "lodash";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

import ConfirmDialog from "../../components/confirm-dialog";
import Iconify from "../../components/iconify";
import Label from "../../components/label";
import UserTableFiltersResult from "../../components/list/TableFiltersResult";
import WorkorderTableRow from "../../components/list/WorkorderTableRow";
import Scrollbar from "../../components/scrollbar";
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from "../../components/table";
import { WorkorderDateTable } from "../../constants";
import { useBoolean, useDeleteWorkorder } from "../../hooks";
import { useLocales } from "../../locales";
import { PATH_DASHBOARD } from "../../routes/paths";
import { useWorkorderStore } from "../../store/useWorkorderStore";
import {
  Translate,
  WorkorderDateTableType,
  WorkorderResponseType,
  WorkorderType,
} from "../../types";

const SCHEDULED_DATE_OPTIONS = (translate: Translate) => [
  {
    value: WorkorderDateTable[WorkorderDateTable.all],
    label: translate("workorder.table_date.all"),
  },
  {
    value: WorkorderDateTable[WorkorderDateTable.week],
    label: translate("workorder.table_date.week"),
  },
  {
    value: WorkorderDateTable[WorkorderDateTable.two_weeks],
    label: translate("workorder.table_date.two_weeks"),
  },
  {
    value: WorkorderDateTable[WorkorderDateTable.month],
    label: translate("workorder.table_date.month"),
  },
  {
    value: WorkorderDateTable[WorkorderDateTable.three_months],
    label: translate("workorder.table_date.three_months"),
  },
];

const TABLE_HEAD = (translate: Translate) => [
  {
    id: "assignee",
    label: translate("workorder.form.label.workorder.assignee_table"),
    align: "left",
    maxWidth: 60,
  },
  {
    id: "scheduleddate",
    label: translate("workorder.form.label.workorder.scheduledDate"),
    align: "left",
    maxWidth: 60,
  },
  {
    id: "duedate",
    label: translate("workorder.form.label.workorder.dueDate"),
    align: "left",
    maxWidth: 60,
  },
  {
    id: "name",
    label: translate("workorder.form.label.workorder.name"),
    align: "left",
    maxWidth: 250,
  },
  {
    id: "priority",
    label: translate("workorder.form.label.workorder.priority"),
    align: "left",
    maxWidth: 30,
  },
  {
    id: "status",
    label: translate("workorder.form.label.workorder.status"),
    align: "left",
    maxWidth: 30,
  },
  {
    id: "action",
    label: translate("workorder.form.label.workorder.action"),
    align: "center",
  },
];

export type ITableFilterValue = string | string[];
export type TableFiltersType = {
  name: string;
  status: string;
  dueDateFilter: WorkorderDateTableType | string;
};
export type TableFilterKey =
  | "name"
  | "status"
  | "scheduleddate"
  | "building"
  | "assignee"
  | "priority"
  | "status"
  | "dueDateFilter"
  | "duedate"
  | "statusFilter";

const defaultFilters: any =
  // TableFiltersType
  {
    name: "",
    // status: "all",
    dueDateFilter: "all",
  };

type WorkorderListViewProps = {
  data: WorkorderResponseType;
  isFetching: boolean;
  isError: boolean;
  error: any;
  refetch?: any;
};

export default function WorkordersListView({
  data,
  isFetching,
  isError,
  error,
  refetch,
}: WorkorderListViewProps) {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const { mutate } = useDeleteWorkorder();
  const confirm = useBoolean();
  const page = useWorkorderStore((state) => state.page);
  const limit = useWorkorderStore((state) => state.limit);
  const setPage = useWorkorderStore((state) => state.setPage);
  const setLimit = useWorkorderStore((state) => state.setLimit);

  // TODO: Replace each filters by filters fetched with into the useFetchWorkorders (use the name)
  const realFilters = {
    ...defaultFilters,
    // building,
    // assignee,
    // priority,
    // duedate,
    // scheduleddate
    // dueDateFilter: duedate,
    // statusFilter: status,
  };
  const [filters, setFilters] = useState(realFilters);

  const table = useTable({
    defaultRowsPerPage: limit,
    defaultCurrentPage: page,
    setPage,
    setLimit,
  });

  // const dataFiltered = useMemo(
  //   () =>
  //     applyFilter({
  //       inputData: tableData,
  //       comparator: getComparator(table.order, table.orderBy),
  //       filters,
  //     }),
  //   [tableData, table, filters]
  // );

  //const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(realFilters, filters);
  // const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: TableFilterKey, value: ITableFilterValue) => {
      table.onResetPage();

      setFilters(
        (
          prevState: // TableFiltersType
          any
        ) => ({
          ...prevState,
          [name]: value,
        })
      );
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    (id: string) => {
      mutate(Number(id));
    },
    [mutate]
  );

  const handleDeleteRows = (data: WorkorderResponseType) => {
    const deleteRows =
      data && data.results
        ? data.results.filter((row) => table.selected.includes(row.id))
        : [];

    deleteRows.forEach(({ id }) => {
      mutate(Number(id));
    });
  };

  const handleEditRow = useCallback(
    (id: string) => {
      navigate(PATH_DASHBOARD.workorder.edit(Number(id)));
    },
    [navigate]
  );

  const handleResetFilters = useCallback(() => {
    // reset frontend filters
    // {
    //   name: "",
    //   status: "all",
    //   scheduleddate: "all",
    // };
    setFilters(defaultFilters);
  }, []);

  const handleFilterDueDate = useCallback(
    (_: React.SyntheticEvent, newValue: WorkorderDateTableType | string) => {
      handleFilters("dueDateFilter", newValue);
    },
    [handleFilters]
  );

  // const handleQuickDueDateFilter = async (quickDueDate: string | null) => {
  //   console.log({ quickDueDate });

  //   if (!quickDueDate) {
  //     setValue("duedate", null);
  //     return;
  //   }

  //   const res = new Date(quickDueDate);
  //   console.log({ res });
  //   setValue("duedate", res);

  //   console.log({ duedate });
  // };

  // useEffect(() => {}, [
  //   // TODO: ask for a new parameter quick Date
  //   duedate,
  // ]);

  if (isError) {
    return (
      <Box data-testid="workorders-error-message" mt={1}>
        <Typography>{error?.message}</Typography>
      </Box>
    );
  }

  return (
    <Box mt={3} data-testid="workorders-list-view">
      <Card>
        <Tabs
          value={filters.dueDateFilter}
          onChange={async (event, newValue) => {
            handleFilterDueDate(event, newValue);
            // const quickDueDate = getDateFromQuickDateFilter({
            //   dateFilter: newValue,
            //   currentDate,
            // });
            // await handleQuickDueDateFilter(quickDueDate);
            // refetch();
          }}
          sx={{
            px: 2.5,
            boxShadow: (theme) =>
              `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {SCHEDULED_DATE_OPTIONS(translate).map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={
                    ((tab.value ===
                      WorkorderDateTable[WorkorderDateTable.all] ||
                      tab.value === filters.status) &&
                      "filled") ||
                    "soft"
                  }
                  color={
                    (tab.value ===
                      WorkorderDateTable[WorkorderDateTable.week] &&
                      "success") ||
                    (tab.value ===
                      WorkorderDateTable[WorkorderDateTable.two_weeks] &&
                      "warning") ||
                    (tab.value ===
                      WorkorderDateTable[WorkorderDateTable.month] &&
                      "error") ||
                    (tab.value ===
                      WorkorderDateTable[WorkorderDateTable.three_months] &&
                      "info") ||
                    "default"
                  }
                >
                  {0}
                  {/* {
                    getDataFilteredFromDate({
                      data: data?.results ?? [],
                      dateFilter: tab.value,
                      currentDate,
                    }).length
                  } */}
                </Label>
              }
            />
          ))}
        </Tabs>
        {/* <TableToolbar filters={filters} onFilters={handleFilters} /> */}
        {canReset && (
          <UserTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={undefined}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}
        <TableContainer sx={{ maxHeight: "60vh" }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={data?.results.length}
            onSelectAllRows={(checked: boolean) =>
              table.onSelectAllRows(
                checked,
                data?.results.map((row: WorkorderType) => row.id)
              )
            }
            action={
              <Tooltip title={translate("workorder.actions.delete")}>
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="eva:trash-2-outline" />
                </IconButton>
              </Tooltip>
            }
          />
          <Scrollbar>
            <Table
              size={table.dense ? "small" : "medium"}
              sx={{ minWidth: 800, margin: 2 }}
              stickyHeader
            >
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD(translate)}
                rowCount={data?.count ?? 0}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) => {
                  if (!data) {
                    return [];
                  }

                  return table.onSelectAllRows(
                    checked,
                    data && data.results
                      ? data.results.map((row: WorkorderType) => row.id)
                      : []
                  );
                }}
              />
              {isFetching ? (
                <Box data-testid="workorders-loader">
                  <LinearProgress />
                </Box>
              ) : (
                <TableBody>
                  {data.results.map((row: WorkorderType) => (
                    <WorkorderTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                    />
                  ))}
                  {/* <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(
                        table.page,
                        table.rowsPerPage,
                        data.results.length
                      )}
                    /> */}
                  <TableNoData
                    isNotFound={!data.results.length}
                    text={translate("workorder.not_found")}
                  />
                </TableBody>
              )}
            </Table>
          </Scrollbar>
        </TableContainer>
        <TablePaginationCustom
          count={data?.count ?? 0}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={translate("workorder.prompt.title")}
        content={translate("workorder.prompt.several_delete_message", {
          number: table.selected.length,
        })}
        action={
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => {
              handleDeleteRows(data);
              confirm.onFalse();
            }}
          >
            {translate("workorder.prompt.yes")}
          </Button>
        }
      />
    </Box>
  );
}
