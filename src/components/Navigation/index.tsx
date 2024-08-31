import { Layout, Row, Menu } from "antd";
import styled from "styled-components";
import ReactLogo from "assets/react.svg";
import type { MenuProps } from "antd";
import useCurrentTime from "hooks/useCurrentTime";

const { Header } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const navigationBgColor = "#5352ed";

export const Navigation = () => {
  const currentTime = useCurrentTime();

  return (
    <Header
      style={{
        padding: "0",
        backgroundColor: navigationBgColor,
      }}
    >
      <Row justify="space-between">
        <LogoWrap>
          <Logo src={ReactLogo} />
          CRA Project
        </LogoWrap>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{ flex: 1, minWidth: 0, backgroundColor: navigationBgColor }}
        />
        <BarWrap>
          <Time>{currentTime}</Time>
        </BarWrap>
      </Row>
    </Header>
  );
};

const BarWrap = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  padding-left: 24px;
  font-size: 18px;
  color: white;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 12px;

  /* 定义旋转动画 */
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* 应用旋转动画 */
  animation: rotate 3s linear infinite;
`;

const Time = styled.div`
  margin-left: auto;
  padding: 0px 16px;
`;
