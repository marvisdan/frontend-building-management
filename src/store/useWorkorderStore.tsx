import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface useWorkorderState {
  data: [];
  count: number;
  page: number;
  limit: number;
  offset: number;
  setPage(page: number): void;
  setLimit(page: number): void;
}

export const useWorkorderStore = create<useWorkorderState>()(
  devtools((set) => ({
    data: [],
    count: 0,
    page: 0,
    limit: 500,
    offset: 0,
    setPage: (page: number) => {
      set(
        (state) => {
          let newOffset = state.offset;
          let newPage = state.page;
          if (page > state.page) {
            return {
              offset: state.offset + state.limit,
              page: state.page + 1,
            };
          }
          if (state.page > 0 && page < state.page) {
            return {
              offset: state.offset - state.limit,
              page: state.page - 1,
            };
          }

          return {
            offset: newOffset,
            page: newPage,
          };
        },
        false,
        "setPage"
      );
    },
    setLimit: (limit: number) => {
      set(
        (state) => ({
          limit,
        }),
        false,
        "setLimit"
      );
    },
    setCount: (value: number) => {
      set(
        (state) => ({
          count: value,
        }),
        false,
        "setCount"
      );
    },
  }))
);
