import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
// @mui
import {
  Button,
  Card,
  Container,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from "@mui/material";

// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// @types
import { AssetViewType, dataTableAssetType } from "../../types";
// _mock_

// components
import ConfirmDialog from "../../components/confirm-dialog";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from "../../components/table";

// sections
import { Box } from "@mui/system";
import { isEqual } from "lodash";
import { useAuthContext } from "../../auth/useAuthContext";
import AssetChangeViewButton from "../../components/assets/AssetChangeViewButton";
import { TableToolbar, UserTableRow } from "../../components/list";
import { VIEW } from "../../constants";
import { useBoolean, useFetchAssets, useRouter } from "../../hooks";
import { useLocales } from "../../locales";
import { formatAssets } from "../helpers/formatAssets";
import OrganizationList from "./OrganizationList";

const TABLE_HEAD = [
  { id: "name", label: "Name", align: "left" },
  { id: "description", label: "Description", align: "left" },
  { id: "domain", label: "Domain", align: "left" },
  { id: "type", label: "Type", align: "left" },
  { id: "created", label: "Created On", align: "left" },
  { id: "updated", label: "Updated On", align: "left" },
  { id: "action", label: "Action", align: "left" },
];

export const _roles = [
  "HR Manager",
  "Data Analyst",
  "Legal Counsel",
  "UX/UI Designer",
  "Project Manager",
  "Account Manager",
  "Registered Nurse",
  "Business Analyst",
];

export type ITableFilterValue = string | string[];

export type ITableFilters = {
  name: string;
  role: string[];
  status: string;
};

const defaultFilters: ITableFilters = {
  name: "",
  role: [],
  status: "all",
};

export default function AssetListPage() {
  const { translate } = useLocales();

  const table = useTable({});
  const router = useRouter();
  const { themeStretch } = useSettingsContext();
  const [view, setView] = useState<AssetViewType>("grid");
  const confirm = useBoolean();
  const [tableData, setTableData] = useState<dataTableAssetType[] | []>([]);
  const [filters, setFilters] = useState(defaultFilters);

  const { accessToken } = useAuthContext();
  const { data, isLoading, isError, error } = useFetchAssets({
    token: accessToken,
  });

  useEffect(() => {
    if (data && data.results) {
      setTableData(formatAssets(data.results));
    }
  }, [data, data?.results]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );
  const denseHeight = table.dense ? 52 : 72;

  const handleChangeView = (
    event: React.MouseEvent<HTMLElement>,
    newView: AssetViewType
  ) => {
    setView(newView);
  };

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: ITableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );
  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter(
      (row) => !table.selected.includes(row.id)
    );
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(PATH_DASHBOARD.workorder.edit(Number(id)));
    },
    [router]
  );

  if (isLoading) {
    return (
      <Container maxWidth={themeStretch ? false : "xl"}>
        <LinearProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth={themeStretch ? false : "xl"}>
        <h1>{error?.message}</h1>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title> Assets</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs
          heading="Assets"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Asset", href: PATH_DASHBOARD.asset.list },
            { name: "List" },
          ]}
          action={
            <Button
              to={PATH_DASHBOARD.asset.create}
              component={RouterLink}
              variant="outlined"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Create Asset
            </Button>
          }
        />
        <Box my={2}>
          <AssetChangeViewButton
            order="inverted"
            value={view}
            onChange={handleChangeView}
          />
        </Box>
        {view === VIEW.list ? (
          <>
            <Card>
              <TableToolbar filters={filters} onFilters={handleFilters} />

              <TableContainer sx={{ position: "relative", overflow: "unset" }}>
                <TableSelectedAction
                  dense={table.dense}
                  numSelected={table.selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  action={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={confirm.onTrue}>
                        <Iconify icon="eva:trash-2-outline" />
                      </IconButton>
                    </Tooltip>
                  }
                />

                <Scrollbar>
                  <Table
                    size={table.dense ? "small" : "medium"}
                    sx={{ minWidth: 800 }}
                  >
                    <TableHeadCustom
                      order={table.order}
                      orderBy={table.orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={tableData.length}
                      numSelected={table.selected.length}
                      onSort={table.onSort}
                      onSelectAllRows={(checked) =>
                        table.onSelectAllRows(
                          checked,
                          tableData.map((row) => row.id)
                        )
                      }
                    />
                    <TableBody>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <UserTableRow
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                            onEditRow={() => handleEditRow(row.name)}
                          />
                        ))}
                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={emptyRows(
                          table.page,
                          table.rowsPerPage,
                          tableData.length
                        )}
                      />
                      <TableNoData
                        isNotFound={notFound}
                        text={translate("asset.not_found")}
                      />
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>

              <TablePaginationCustom
                count={dataFiltered.length}
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
              title={"Delete"}
              content={
                <>
                  Are you sure want to delete
                  <strong> {table.selected.length} </strong> items?
                </>
              }
              action={
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    handleDeleteRows();
                    confirm.onFalse();
                  }}
                >
                  {"Delete"}
                </Button>
              }
            />
          </>
        ) : (
          <OrganizationList />
        )}
      </Container>
    </>
  );
}

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: dataTableAssetType[];
  comparator: (a: any, b: any) => number;
  filters: ITableFilters;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);
  const { name } = filters;
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}
