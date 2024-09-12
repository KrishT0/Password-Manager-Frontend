import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import Loader from "./components/custom/loader";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
        <Toaster />
      </Suspense>
  );
}

export default App;
