import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";

import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "../../../../../auth/JwtContext";
import ThemeLocalization from "../../../../../locales/ThemeLocalization";

import { MemoryRouter } from "react-router";
import { fetchAssetsMock } from "../../../../../_mock/datas/assets";
import { useInfiniteAssets } from "../../../../../hooks";
import i18n from "../../../../../locales/i18n";
import AssetsContent from "../AssetsContent";

jest.mock("../../../../../hooks", () => ({
  useInfiniteAssets: jest.fn(),
}));

const mockedUseInfiniteAssets = useInfiniteAssets as jest.Mock;

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
const Wrapper = ({ children }: { children: JSX.Element }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <HelmetProvider>
          <ThemeLocalization>
            <MemoryRouter initialEntries={["/asset/list"]}>
              {children}
            </MemoryRouter>
          </ThemeLocalization>
        </HelmetProvider>
      </LocalizationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

describe("Assets Content", () => {
  beforeEach(() => {
    mockedUseInfiniteAssets.mockImplementation(() => {});
    i18n.init();
  });

  afterEach(() => {
    mockedUseInfiniteAssets.mockClear();
  });

  it("should render an loading message", async () => {
    mockedUseInfiniteAssets.mockImplementation(() => ({
      isLoading: true,
    }));

    render(
      <Wrapper>
        <AssetsContent
          filters={{
            type: undefined,
            category: undefined,
            search: undefined,
          }}
        />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId("assets-loader")).toBeInTheDocument();
    });
  });

  it("should render an error message", async () => {
    const errorMessage = "Something went wrong";
    mockedUseInfiniteAssets.mockImplementation(() => ({
      isError: true,
      error: { message: errorMessage },
    }));

    render(
      <Wrapper>
        <AssetsContent
          filters={{
            type: undefined,
            category: undefined,
            search: undefined,
          }}
        />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId("assets-error-message")).toBeInTheDocument();
      expect(screen.getByTestId("assets-error-message")).toHaveTextContent(
        errorMessage
      );
    });
  });

  it("should render the asset list", async () => {
    mockedUseInfiniteAssets.mockImplementation(() => ({
      data: {
        pages: [fetchAssetsMock],
      },
    }));

    render(
      <Wrapper>
        <AssetsContent
          filters={{
            type: undefined,
            category: undefined,
            search: undefined,
          }}
        />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId("assets-section")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId("asset-list")).toBeInTheDocument();
    });
  });
});
