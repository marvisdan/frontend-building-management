import { useCallback, useState } from "react";

import { TableProps } from "./types";

type ReturnType = TableProps;

export type UseTableProps = {
  defaultDense?: boolean;
  defaultOrder?: "asc" | "desc";
  defaultOrderBy?: string;
  defaultSelected?: string[];
  defaultRowsPerPage?: number;
  defaultCurrentPage?: number;

  // zustand hanler to serve `limit` and `page` on useFetchWorkorders and pagination
  setPage?: (page: number) => void;
  setLimit?: (limit: number) => void;
};

export default function useTable(props: UseTableProps): ReturnType {
  const [dense, setDense] = useState(Boolean(props?.defaultDense));

  const [orderBy, setOrderBy] = useState<string>(
    props?.defaultOrderBy || "name"
  );

  const [order, setOrder] = useState<"asc" | "desc">(
    props?.defaultOrder || "asc"
  );

  const [page, setPage] = useState<number>(props?.defaultCurrentPage || 0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(
    props?.defaultRowsPerPage || 5
  );

  const [selected, setSelected] = useState<string[]>(
    props?.defaultSelected || []
  );

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === "asc";
      if (id !== "") {
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onSelectAllRows = useCallback(
    (checked: boolean, newSelecteds: string[]) => {
      if (checked) {
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    },
    []
  );
  const { setPage: setOnPage, setLimit } = props;

  const onChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);
      setOnPage && setOnPage(newPage);
    },
    [setOnPage]
  );

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(0);
      setOnPage && setOnPage(0);
      setRowsPerPage(parseInt(event.target.value, 10));
      setLimit && setLimit(parseInt(event.target.value));
    },
    [setOnPage, setLimit]
  );

  const onChangeDense = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDense(event.target.checked);
    },
    []
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onUpdatePageDeleteRow = useCallback(
    (totalRowsInPage: number) => {
      setSelected([]);
      if (page) {
        if (totalRowsInPage < 2) {
          setPage(page - 1);
        }
      }
    },
    [page]
  );

  const onUpdatePageDeleteRows = useCallback(
    ({
      totalRows,
      totalRowsInPage,
      totalRowsFiltered,
    }: {
      totalRows: number;
      totalRowsInPage: number;
      totalRowsFiltered: number;
    }) => {
      const totalSelected = selected.length;

      setSelected([]);

      if (page) {
        if (totalSelected === totalRowsInPage) {
          setPage(page - 1);
        } else if (totalSelected === totalRowsFiltered) {
          setPage(0);
        } else if (totalSelected > totalRowsInPage) {
          const newPage =
            Math.ceil((totalRows - totalSelected) / rowsPerPage) - 1;
          setPage(newPage);
        }
      }
    },
    [page, rowsPerPage, selected.length]
  );

  return {
    dense,
    order,
    page,
    orderBy,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeDense,
    onResetPage,
    onChangeRowsPerPage,
    onUpdatePageDeleteRow,
    onUpdatePageDeleteRows,
    //
    setPage,
    setDense,
    setOrder,
    setOrderBy,
    setSelected,
    setRowsPerPage,
  };
}
