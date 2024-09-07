import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import Loader from "./components/custom/loader";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
        <Toaster />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
