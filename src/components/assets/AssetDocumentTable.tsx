// @mui
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from "@mui/material";

import { useState } from "react";
import { useLocales } from "../../locales";
import { AssetDocumentType, Translate } from "../../types";
import ConfirmDialog from "../confirm-dialog/ConfirmDialog";
import FileTableRow from "../file/item/FileTableRow";
import Iconify from "../iconify";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableProps,
  TableSelectedAction,
  emptyRows,
} from "../table";

type tableHeadType = {
  id: string;
  label: string;
  align?: string;
  width?: number;
};

const getTableHead = (translate: Translate): tableHeadType[] => [
  {
    id: "document_filename",
    label: translate("asset.form.document.table_label.name"),
    align: "left",
  },
  {
    id: "type",
    label: translate("asset.form.document.table_label.type"),
    align: "center",
    width: 120,
  },
  {
    id: "updated",
    label: translate("asset.form.document.table_label.modified"),
    align: "left",
    width: 160,
  },
  {
    id: "action",
    label: translate("asset.form.document.table_label.action"),
    align: "left",
  },
];

type Props = {
  table: TableProps;
  tableData: AssetDocumentType[];
  isNotFound?: boolean;
  hasHeader?: boolean;
  hasPagination?: boolean;
  isCondensed?: boolean;
  dataFiltered?: AssetDocumentType[];
  onOpenConfirm?: VoidFunction;
  onDeleteRow: (id: number) => void;
  onDeleteRows: () => void;
};

export default function AssetDocumentTable({
  table,
  tableData,
  isNotFound,
  hasHeader,
  hasPagination,
  isCondensed,
  onDeleteRow,
  onDeleteRows,
  dataFiltered,
  onOpenConfirm,
}: Props) {
  const { translate } = useLocales();
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    selected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = table;
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const denseHeight = dense ? 52 : 72;

  return (
    <>
      <Box
        sx={{
          px: 1,
          position: "relative",
          borderRadius: 1.5,
        }}
      >
        <TableSelectedAction
          dense={dense}
          numSelected={selected.length}
          rowCount={tableData.length}
          onSelectAllRows={(checked) =>
            onSelectAllRows(
              checked,
              tableData.map((row) => row.id.toString())
            )
          }
          action={
            <>
              {onOpenConfirm && (
                <Tooltip title={translate("prompt.title")}>
                  <IconButton
                    color="primary"
                    onClick={() => setOpenConfirm(true)}
                  >
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              )}
            </>
          }
          sx={{
            pl: 1,
            pr: 2,
            top: 8,
            left: 8,
            right: 8,
            width: "auto",
            borderRadius: 1,
          }}
        />

        <TableContainer>
          <Table
            size={dense || isCondensed ? "small" : "medium"}
            sx={{
              minWidth: !isCondensed ? 960 : 0,
              borderCollapse: "separate",
              borderSpacing: "0 8px",
              "& .MuiTableCell-head": {
                boxShadow: "none !important",
              },
            }}
          >
            {hasHeader ? (
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={getTableHead(translate)}
                rowCount={tableData.length}
                numSelected={selected.length}
                onSort={onSort}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id.toString())
                  )
                }
                sx={{
                  "& .MuiTableCell-head": {
                    bgcolor: "transparent",
                  },
                }}
              />
            ) : null}

            <TableBody>
              {dataFiltered &&
                dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <FileTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id.toString())}
                      onSelectRow={() => onSelectRow(row.id.toString())}
                      onDeleteRow={() => onDeleteRow && onDeleteRow(row.id)}
                      hasHeader={hasHeader}
                      condensed={isCondensed}
                    />
                  ))}
              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
              />
              {isNotFound && (
                <TableNoData
                  isNotFound={isNotFound}
                  text={translate("asset.document_not_found")}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {hasPagination && dataFiltered ? (
        <TablePaginationCustom
          count={dataFiltered.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
          dense={dense}
          onChangeDense={onChangeDense}
          sx={{
            "& .MuiTablePagination-root": { borderTop: "none" },
            "& .MuiFormControlLabel-root": { px: 0 },
          }}
        />
      ) : null}

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate("prompt.title")}
        content={translate("prompt.message")}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              await onDeleteRows();
              handleCloseConfirm();
            }}
          >
            {translate("prompt.title")}
          </Button>
        }
      />
    </>
  );
}
