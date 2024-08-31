import { Layout, Menu, Typography, theme } from 'antd';
import { routes } from 'router/routes';
import { IRoutes } from 'types';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { selectIsMenuCollapsed, toggleMenuCollapsed } from 'store/common/globalSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

export interface SiderMenuItem {
  label?: string;
  name?: string;
  key: string;
  icon?: any;
  children?: any;
}

export const getMenuItem = ({ name, path, icon, children }: IRoutes): SiderMenuItem => ({
  key: path ?? '',
  icon: icon ?? null,
  children: children ? children.map((item: IRoutes) => getMenuItem(item)) : null,
  name: name,
  label: name,
});

export const SiderMenu = () => {
  const collapsed = useAppSelector(selectIsMenuCollapsed);
  const dispatch = useAppDispatch();
  const onCollapse = () => {
    dispatch(toggleMenuCollapsed());
  };
  const navigate = useNavigate();
  const location = useLocation();
  const menus = routes.map((r: IRoutes) => getMenuItem(r));

  console.debug('menus', menus);

  return (
    <Sider theme="light" collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu
        style={{
          borderInlineEnd: 'none',
        }}
        theme="light"
        selectedKeys={location.pathname.split('/')}
        defaultOpenKeys={location.pathname.split('/')}
        mode="inline"
        items={menus}
        onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
          navigate(`${keyPath.reverse().join('/')}`);
        }}
      />
    </Sider>
  );
};
