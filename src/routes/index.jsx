import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { tokenExpirationCheck } from "@/utils/tokenExpirationCheck";

const HomePage = lazy(() => import("@/pages/home"));
const AuthPage = lazy(() => import("@/pages/auth"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Error = lazy(() => import("@/pages/error"));
const CustomError = lazy(() => import("@/pages/error/CustomeError"));

const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
    errorElement: <CustomError />,
  },
  {
    path: "/dashboard",
    loader: tokenExpirationCheck,
    element: <Dashboard />,
    errorElement: <CustomError />,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
    v7_startTransition: true,
  },
});

export default router;
