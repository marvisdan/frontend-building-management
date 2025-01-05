import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router";

import { fetchContactsMock } from "../../../_mock/datas/contacts";
import { AuthProvider } from "../../../auth/JwtContext";
import SnackbarProvider from "../../../components/snackbar/SnackbarProvider";
import { useFetchOrganizationContacts } from "../../../hooks";
import ThemeLocalization from "../../../locales/ThemeLocalization";
import i18n from "../../../locales/i18n";
import ThemeProvider from "../../../theme";
import ContactSection from "../ContactSection";

jest.mock("../../../hooks", () => ({
  useFetchOrganizationContacts: jest.fn(),
}));

const mockedUseFetchOrganizationContacts =
  useFetchOrganizationContacts as jest.Mock;
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
          <ThemeProvider>
            <ThemeLocalization>
              <SnackbarProvider>
                <MemoryRouter initialEntries={["/contact/list"]}>
                  {children}
                </MemoryRouter>
              </SnackbarProvider>
            </ThemeLocalization>
          </ThemeProvider>
        </HelmetProvider>
      </LocalizationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

describe("Contact Section", () => {
  beforeEach(() => {
    mockedUseFetchOrganizationContacts.mockImplementation(() => {});
    i18n.init();
  });

  afterEach(() => {
    mockedUseFetchOrganizationContacts.mockClear();
  });

  it("should render an loading message", async () => {
    mockedUseFetchOrganizationContacts.mockImplementation(() => ({
      isLoading: true,
    }));

    render(
      <Wrapper>
        <ContactSection />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId("contacts-loader")).toBeInTheDocument();
    });
  });

  it("should display the appropriate message when  data is empty", async () => {
    const emptyListMessage = "No contact";
    mockedUseFetchOrganizationContacts.mockImplementation(() => ({
      data: [],
    }));

    render(
      <Wrapper>
        <ContactSection />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId("no-contact")).toBeInTheDocument();
      expect(screen.getByTestId("no-contact")).toHaveTextContent(
        emptyListMessage
      );
    });
  });

  it("should render an error message", async () => {
    const errorMessage = "Something went wrong";
    mockedUseFetchOrganizationContacts.mockImplementation(() => ({
      isError: true,
      error: { message: errorMessage },
    }));

    render(
      <Wrapper>
        <ContactSection />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId("contacts-error-message")).toBeInTheDocument();
      expect(screen.getByTestId("contacts-error-message")).toHaveTextContent(
        errorMessage
      );
    });
  });

  it("should render the contact list", async () => {
    mockedUseFetchOrganizationContacts.mockImplementation(() => ({
      data: fetchContactsMock,
    }));

    render(
      <Wrapper>
        <ContactSection />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId("contact-list")).toBeInTheDocument();
    });
  });
});
