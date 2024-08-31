import { Layout, theme } from "antd";
import { Breadcrumb } from "components/Breadcrumb";
import { SiderMenu } from "components/SiderMenu";
import { Navigation } from "components/Navigation";
import { Outlet } from "react-router-dom";

const { Content, Footer } = Layout;

const BasicLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Navigation />
      <Layout>
        <SiderMenu />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb />
          <Content
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
          {/* <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2018 Created by Ant UED~
          </Footer> */}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
