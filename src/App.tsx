import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// theme
import ThemeProvider from "./theme";
// locales
import ThemeLocalization from "./locales";
// components
import { MotionLazyContainer } from "./components/animate";
import { ThemeSettings } from "./components/settings";
import SnackbarProvider from "./components/snackbar";

// layouts
import Router from "./routes";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionLazyContainer>
        <ThemeProvider>
          <ThemeSettings>
            <ThemeLocalization>
              <SnackbarProvider>
                <Router />
              </SnackbarProvider>
            </ThemeLocalization>
          </ThemeSettings>
        </ThemeProvider>
      </MotionLazyContainer>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
