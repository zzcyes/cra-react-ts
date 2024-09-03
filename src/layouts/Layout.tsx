import { Flex, Layout, theme } from 'antd';
import { Breadcrumb } from 'components/Breadcrumb';
import { SiderMenu } from 'components/SiderMenu';
import { Navigation } from 'components/Navigation';
import { Outlet } from 'react-router-dom';

const { Content, Footer } = Layout;

const BasicLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        height: '100vh',
      }}
    >
      <Navigation />
      <Layout
        style={{
          flex: 1, // 让内部 Layout 填充整个页面的剩余空间
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <SiderMenu />
        <Layout
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1, // 让内容区域填满剩余空间
            padding: '0px 24px',
          }}
        >
          <Breadcrumb />
          <Content
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flex: 1, // 内容区域自动扩展以适应内容
              overflow: 'auto', // 控制滚动条
            }}
          >
            <Outlet />
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
