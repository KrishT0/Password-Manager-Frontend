import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "@/routes";
import Loader from "@/components/custom/loader";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
        <Toaster duration="3000" />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
