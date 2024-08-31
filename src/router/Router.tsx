import { useRoutes, Navigate } from "react-router-dom";
import { routes, getDefaultRouterPath } from "./routes";
import PrivateRoute from "./PrivateRoute";
import Layout from "layouts/Layout";

const GetRoutes = () => {
  const element: React.ReactElement | null = useRoutes([
    { path: "/404", element: <h1>Page not found.</h1> },
    { path: "*", element: <Navigate to={"/app/" + getDefaultRouterPath()} /> },
    {
      path: "/app",
      element: (
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      ),
      children: [...routes],
    },
  ]);
  return element;
};

const Router = () => {
  return <>{<GetRoutes />}</>;
};

export default Router;
