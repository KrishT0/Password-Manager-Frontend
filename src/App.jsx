import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import Loader from "./components/custom/loader";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
      <Toaster duration="3000" />
      <SpeedInsights />
      <Analytics />
    </Suspense>
  );
}

export default App;
