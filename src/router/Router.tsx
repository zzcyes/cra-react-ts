import { useRoutes, Navigate } from 'react-router-dom';
import { routes, getDefaultRouterPath } from './routes';
import PrivateRoute from './PrivateRoute';
import Layout from 'layouts/Layout';
import Login from 'pages/Login';

const GetRoutes = () => {
  const element: React.ReactElement | null = useRoutes([
    { path: '/', element: <Navigate to={'/login'} /> },
    { path: '/404', element: <h1>Page not found.</h1> },
    { path: '/login', element: <Login /> },
    {
      path: '/app',
      element: (
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      ),
      children: [...routes],
    },
    { path: '*', element: <Navigate to="/404" /> },
    // { path: '*', element: <Navigate to={'/app/' + getDefaultRouterPath()} /> },
  ]);
  return element;
};

const Router = () => {
  return <>{<GetRoutes />}</>;
};

export default Router;
