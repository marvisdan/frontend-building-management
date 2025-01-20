import { renderHook } from "@testing-library/react";
import useTable from "../useTable";
import { act } from "react";

describe("useTable", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useTable({}));
    expect(result.current.dense).toBe(false);
    expect(result.current.orderBy).toBe("name");
    expect(result.current.order).toBe("asc");
    expect(result.current.page).toBe(0);
    expect(result.current.rowsPerPage).toBe(5);
    expect(result.current.selected).toEqual([]);
  });

  it("should update dense state", () => {
    const { result } = renderHook(() => useTable({}));

    act(() => {
      result.current.onChangeDense({
        target: { checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.dense).toBe(true);
  });

  it("should update order and orderBy states on sort", () => {
    const { result } = renderHook(() => useTable({}));

    act(() => {
      result.current.onSort("name");
    });

    expect(result.current.order).toBe("desc");
    expect(result.current.orderBy).toBe("name");
  });

  it("should update selected state on row select", () => {
    const { result } = renderHook(() => useTable({}));

    act(() => {
      result.current.onSelectRow("row-1");
    });

    expect(result.current.selected).toEqual(["row-1"]);

    act(() => {
      result.current.onSelectRow("row-2");
    });

    expect(result.current.selected).toEqual(["row-1", "row-2"]);

    act(() => {
      result.current.onSelectRow("row-1");
    });

    expect(result.current.selected).toEqual(["row-2"]);
  });

  it("should update selected state on select all rows", () => {
    const { result } = renderHook(() => useTable({}));

    act(() => {
      result.current.onSelectAllRows(true, ["row-1", "row-2"]);
    });

    expect(result.current.selected).toEqual(["row-1", "row-2"]);

    act(() => {
      result.current.onSelectAllRows(false, []);
    });

    expect(result.current.selected).toEqual([]);
  });
});
