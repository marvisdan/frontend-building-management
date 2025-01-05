import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { fetchUsersMock, fetchWorkordersMock } from "../../../_mock/datas";
import { AuthProvider } from "../../../auth/JwtContext";
import { useBoolean, useFetchUsers, useFetchWorkorders } from "../../../hooks";
import ThemeLocalization from "../../../locales";
import i18n from "../../../locales/i18n";
import WorkorderListPage from "../WorkorderListPage";
jest.mock("../../../hooks", () => ({
  useFetchWorkorders: jest.fn(),
  useFetchUsers: jest.fn(),
  useBoolean: jest.fn(),
  useDeleteWorkorder: () => [undefined],
  __esModule: true,
  useResponsive: () => ["down", "sm"],
  useCreateAsset: () => [undefined],
}));

const mockedUseFetchWorkorders = useFetchWorkorders as jest.Mock;
const mockedUseFetchUsers = useFetchUsers as jest.Mock;
const mockedUseBoolean = useBoolean as jest.Mock;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // turns retries off
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    // no more errors on the console for tests
    error: () => {},
  },
});
const Wrapper = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthProvider>
        <HelmetProvider>
          <ThemeLocalization>
            <MemoryRouter initialEntries={["/workorder/grid"]}>
              {children}
            </MemoryRouter>
          </ThemeLocalization>
        </HelmetProvider>
      </AuthProvider>
    </LocalizationProvider>
  </QueryClientProvider>
);

describe("Work Order List Page", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  beforeEach(() => {
    mockedUseFetchWorkorders.mockImplementation(() => {});
    i18n.init();
  });

  afterEach(() => {
    mockedUseFetchWorkorders.mockClear();
  });

  it.skip("should render an loading message", async () => {
    mockedUseFetchWorkorders.mockImplementation(() => ({
      isFetching: true,
    }));
    mockedUseFetchUsers.mockImplementation(() => ({
      data: fetchUsersMock,
    }));

    render(
      <Wrapper>
        <WorkorderListPage />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId("workorders-loader")).toBeInTheDocument();
    });
  });

  it.skip("should render an error message", async () => {
    const errorMessage = "Something went wrong";
    mockedUseFetchWorkorders.mockImplementation(() => ({
      isError: true,
      error: { message: errorMessage },
    }));
    mockedUseFetchUsers.mockImplementation(() => ({
      data: fetchUsersMock,
    }));

    render(
      <Wrapper>
        <WorkorderListPage />
      </Wrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByTestId("workorders-error-message")
      ).toBeInTheDocument();
      expect(screen.getByTestId("workorders-error-message")).toHaveTextContent(
        errorMessage
      );
    });
  });

  it.skip("should render the work order List View", async () => {
    mockedUseFetchWorkorders.mockImplementation(() => ({
      data: fetchWorkordersMock,
    }));
    mockedUseFetchUsers.mockImplementation(() => ({
      data: fetchUsersMock,
    }));

    mockedUseBoolean.mockImplementation(() => ({
      value: false,
      onTrue: () => null,
      onFalse: () => null,
      onToggle: () => null,
      setValue: () => null,
    }));
    render(
      <Wrapper>
        <WorkorderListPage />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId("workorders-list-view")).toBeInTheDocument();
    });
  });
});
