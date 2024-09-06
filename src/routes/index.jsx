import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy(() => import("@/pages/home"));

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth",
    element: <h1>auth</h1>,
  },
  {
    path: "/dashboard",
    element: <h1>dashboard</h1>,
  },
];

const router = createBrowserRouter(routes);

export default router;
