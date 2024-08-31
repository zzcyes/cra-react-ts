import { IRoutes } from 'types';
import Hello from 'pages/Hello';
import { DesktopOutlined } from '@ant-design/icons';

export const routes: IRoutes[] = [
  {
    path: 'hello',
    name: '欢迎界面',
    element: <Hello />,
    icon: <DesktopOutlined />,
  },
  {
    path: 'hello2',
    name: '欢迎界面2',
    element: <Hello />,
    icon: <DesktopOutlined />,
  },
  //   {
  //     path: "/app",
  //     name: "app",
  //     element: <Layout />,
  //     children: [
  //       {
  //         path: "hello",
  //         name: "欢迎界面",
  //         element: <Hello />,
  //         icon: <DesktopOutlined />,
  //       },
  //       // {
  //       //   path: "react"r
  //       //   name: "React",
  //       //   element: null,
  //       //   children: [
  //       //     {
  //       //       path: "react-demo",
  //       //       name: "React Demo",
  //       //       element: <ReactDemo />,
  //       //     },
  //       //     {
  //       //       path: "react-canvas",
  //       //       name: "React Canvas",
  //       //       element: <ReactCanvas />,
  //       //     },
  //       //     {
  //       //       path: "cpu",
  //       //       name: "CPU",
  //       //       element: <ReactCpu />,
  //       //     },
  //       //     {
  //       //       path: "hooks",
  //       //       name: "Hooks",
  //       //       element: <ReactHooks />,
  //       //     },
  //       //   ],
  //       // },
  //     ],
  //   },
];

export const getDefaultRouterPath = (path?: string) => {
  if (path) return path;
  const [defaultRoute] = routes;
  if (Array.isArray(defaultRoute?.children) && defaultRoute?.children.length) {
    return defaultRoute.path! + '/' + defaultRoute.children[0].path!;
  }
  return defaultRoute.path!;
};
