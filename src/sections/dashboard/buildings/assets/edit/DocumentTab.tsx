import { Button, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

import { AxiosError } from "axios";
import AssetDocumentModal from "../../../../../components/assets/AssetDocumentModal";
import AssetDocumentTable from "../../../../../components/assets/AssetDocumentTable";
import Iconify from "../../../../../components/iconify";
import {
  TableProps,
  getComparator,
  useTable,
} from "../../../../../components/table";
import {
  useDeleteDocument,
  useFetchDocumentsByAssetId,
  useResponsive,
} from "../../../../../hooks";
import { useLocales } from "../../../../../locales";
import { AssetDocumentType } from "../../../../../types";

type DocumentTableWrapperProps = {
  table: TableProps;
  tableData: AssetDocumentType[];
  isNotFound?: boolean;
  hasHeader?: boolean;
  hasPagination?: boolean;
  isCondensed?: boolean;
  dataFiltered?: AssetDocumentType[];
  isError?: boolean;
  isLoading?: boolean;
  error?: AxiosError<unknown, any> | null;
  onOpenConfirm?: VoidFunction;
  onDeleteRow: (id: number) => void;
  onDeleteRows: () => void;
};

const getDocumentsFilteredByName = (
  data: AssetDocumentType[],
  name: string
): AssetDocumentType[] =>
  name
    ? data.filter(
        (d: AssetDocumentType) =>
          d?.document_filename.toLowerCase().indexOf(name.toLowerCase()) !== -1
      )
    : data;

const applyFilter = ({
  inputData,
  comparator,
  filterName,
}: {
  inputData: AssetDocumentType[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus?: string;
  filterRole?: string;
}): AssetDocumentType[] => {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);
  inputData = getDocumentsFilteredByName(inputData, filterName);
  return inputData;
};

const DocumentTableWrapper = ({
  table,
  tableData,
  isNotFound,
  dataFiltered,
  onOpenConfirm,
  onDeleteRow,
  onDeleteRows,
  hasHeader,
  hasPagination,
  isCondensed,
  isError,
  isLoading,
  error,
}: DocumentTableWrapperProps) => (
  <Stack>
    {isError ? (
      <Typography variant="subtitle1">{error?.message}</Typography>
    ) : isLoading ? (
      <LinearProgress />
    ) : (
      <AssetDocumentTable
        table={table}
        tableData={tableData}
        isNotFound={isNotFound}
        dataFiltered={!isNotFound ? dataFiltered : []}
        onOpenConfirm={onOpenConfirm}
        onDeleteRow={onDeleteRow}
        onDeleteRows={onDeleteRows}
        hasHeader={hasHeader}
        hasPagination={hasPagination}
        isCondensed={isCondensed}
      />
    )}
  </Stack>
);

export default function DocumentTab({
  isListonly,
  hasHeader,
  hasPagination,
  isCondensed,
}: {
  isListonly?: boolean;
  hasHeader?: boolean;
  hasPagination?: boolean;
  isCondensed?: boolean;
}) {
  const { translate } = useLocales();
  const { id } = useParams();
  const [openUploadFile, setOpenUploadFile] = useState<boolean>(false);
  const [, setOpenConfirm] = useState<boolean>(false);
  const [filterName] = useState<string>("");
  const [limit] = useState<number>(50);
  const isMofile = useResponsive("down", "sm");
  const table = useTable({ defaultRowsPerPage: 10, defaultDense: isMofile });
  const [tableData, setTableData] = useState<AssetDocumentType[]>([]);
  const { data, isLoading, isError, error } = useFetchDocumentsByAssetId(
    Number(id),
    limit
  );

  const { mutate } = useDeleteDocument();
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const onDeleteRow = (id: number) => {
    mutate(id);
    handleCloseConfirm();
  };

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) =>
      table.selected.includes(`${row.id}`)
    );
    deleteRows.forEach(({ id }) => {
      mutate(id);
    });
  }, [tableData, table, mutate]);

  const dataFiltered = applyFilter({
    // TODO: Add unit test
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!isLoading && !dataFiltered.length) ||
    (dataFiltered.length === 1 && !dataFiltered[0].document); // corner case where document is null

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };

  const handleCloseModal = () => {
    setOpenUploadFile(false);
  };

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  return (
    <Grid
      item
      xs={12}
      md={12}
      my={3}
      py={isListonly ? 0 : 2}
      sx={{ px: { md: isListonly ? 0 : 2, sm: 0, xs: 0.5 } }}
    >
      {!isListonly ? (
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          onClick={handleOpenUploadFile}
        >
          {translate("form.upload")}
        </Button>
      ) : null}
      <DocumentTableWrapper
        isLoading={isLoading}
        isError={isError}
        isCondensed={isCondensed}
        hasHeader={hasHeader}
        hasPagination={hasPagination}
        error={error}
        table={table}
        tableData={tableData}
        isNotFound={isNotFound}
        dataFiltered={!isNotFound ? dataFiltered : []}
        onOpenConfirm={handleOpenConfirm}
        onDeleteRow={onDeleteRow}
        onDeleteRows={handleDeleteRows}
      />
      <AssetDocumentModal
        open={openUploadFile}
        title={translate("asset.modal.upload_title")}
        onClose={handleCloseModal}
      />
    </Grid>
  );
}
