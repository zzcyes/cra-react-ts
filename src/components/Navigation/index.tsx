import { Layout, Row, Menu, Button, Dropdown, Space, Avatar } from 'antd';
import styled from 'styled-components';
import ReactLogo from 'assets/react.svg';
import type { MenuProps } from 'antd';
import useCurrentTime from 'hooks/useCurrentTime';
import { LogoutOutlined, SmileOutlined } from '@ant-design/icons';

const { Header } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
  key,
  label: `nav ${key}`,
}));

const navigationBgColor = '#5352ed';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        退出登录
      </a>
    ),
    icon: <LogoutOutlined />,
  },
];

export const Navigation = () => {
  const currentTime = useCurrentTime();

  return (
    <Header
      style={{
        padding: '0',
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
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0, backgroundColor: navigationBgColor }}
        />
        <ActionBar>
          <Time>{currentTime}</Time>
          <Dropdown menu={{ items }}>
            <AvatarWrap>
              <Avatar
                style={{ verticalAlign: 'middle' }}
                size="default"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              ></Avatar>
              <AvatarName>zzc</AvatarName>
            </AvatarWrap>
          </Dropdown>
        </ActionBar>
      </Row>
    </Header>
  );
};

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

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  color: white;
  padding: 0px 24px;
`;

const Time = styled.div`
  margin-left: auto;
  padding: 0px 16px;
`;

const AvatarWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  display: inline-flex;
  min-width: 80px;
  height: 80%;
  align-items: center;
  justify-content: center;
  padding-inline-start: 16px;
  padding-inline-end: 16px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const AvatarName = styled.span`
  margin-left: 8px;
`;
