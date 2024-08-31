import { Breadcrumb as AntdBreadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { routes } from "router/routes";
import { IRoutes } from "types";

export const Breadcrumb = () => {
  const location = useLocation();
  const breadcrumbs = location.pathname.split("/").slice(2) ?? [];

  console.debug("breadcrumbs", location.pathname, breadcrumbs);

  return (
    <AntdBreadcrumb
      style={{
        margin: "16px 0",
      }}
    >
      {breadcrumbs.map((pathname: string) => {
        const [route] = routes.filter((r: IRoutes) => r.path === pathname);
        console.debug("route", route);
        return (
          <AntdBreadcrumb.Item key={route.path}>
            {route.name}
          </AntdBreadcrumb.Item>
        );
      })}
    </AntdBreadcrumb>
  );
};
