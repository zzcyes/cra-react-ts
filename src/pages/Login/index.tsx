// src/pages/AuthPage.tsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Card, Typography, Space, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { LoginApi } from 'services';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(
    to right,
    #eea2a2 0%,
    #bbc1bf 19%,
    #57c6e1 42%,
    #b49fda 79%,
    #7ac5d8 100%
  );
  padding: 20px;
`;

const CardWrapper = styled(Card)`
  width: 100%;
  max-width: 400px;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.9); /* 半透明背景 */
  backdrop-filter: blur(10px); /* 胶囊模糊效果 */
`;

const AuthTitle = styled(Title)`
  text-align: center;
  margin-bottom: 24px;
  color: #1890ff;
  font-family: 'Roboto', sans-serif;
`;

const SystemName = styled.div`
  text-align: center;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 16px;
`;

const StyledInput = styled(Input)`
  border-radius: 4px;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  &:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  font-size: 16px;
  background: #1890ff;
  border-color: #1890ff;
  &:hover {
    background: #40a9ff;
    border-color: #40a9ff;
  }
  &:focus {
    background: #096dd9;
    border-color: #096dd9;
  }
`;

const ForgotPasswordLink = styled(Text)`
  display: block;
  margin-top: 16px;
  text-align: center;
  color: #1890ff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = () => {
    setIsRegister(!isRegister);
  };

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    if (isRegister) {
      handleRegister(values);
    } else {
      handleLogin(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleRegister = async (values: { username: string; password: string }) => {
    try {
      const res = await LoginApi.register({
        account: values.username,
        password: values.password,
      });
      console.debug(res);
    } catch (err) {
      message.error((err as any)?.data?.message);
      // console.debug('err:', err.data?.message);
    }
  };
  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      const res = await LoginApi.login({
        account: values.username,
        password: values.password,
      });
      console.debug(res);
      navigate('/app');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthWrapper>
      <CardWrapper>
        <SystemName>系统名称</SystemName>
        <AuthTitle level={3}>{isRegister ? '注册' : '登录'}</AuthTitle>
        <Form
          name={isRegister ? 'register' : 'login'}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {isRegister && (
            <>
              <StyledFormItem
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <StyledInput prefix={<UserOutlined />} placeholder="用户名" size="large" />
              </StyledFormItem>
              <StyledFormItem name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                <StyledInput.Password prefix={<LockOutlined />} placeholder="密码" size="large" />
              </StyledFormItem>
              <StyledFormItem
                name="confirmPassword"
                rules={[{ required: true, message: '请确认密码!' }]}
              >
                <StyledInput.Password
                  prefix={<CheckCircleOutlined />}
                  placeholder="确认密码"
                  size="large"
                />
              </StyledFormItem>
              <Form.Item>
                <StyledButton type="primary" htmlType="submit">
                  注册
                </StyledButton>
              </Form.Item>
            </>
          )}

          {!isRegister && (
            <>
              <StyledFormItem
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <StyledInput prefix={<UserOutlined />} placeholder="用户名" size="large" />
              </StyledFormItem>
              <StyledFormItem name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                <StyledInput.Password prefix={<LockOutlined />} placeholder="密码" size="large" />
              </StyledFormItem>
              <Form.Item>
                <StyledButton type="primary" htmlType="submit">
                  登录
                </StyledButton>
              </Form.Item>
              <ForgotPasswordLink>忘记密码?</ForgotPasswordLink>
            </>
          )}
          <Divider />
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button type="link" onClick={handleTabChange}>
              {isRegister ? '已有账户? 登录' : '没有账户? 注册'}
            </Button>
          </Space>
        </Form>
      </CardWrapper>
    </AuthWrapper>
  );
};

export default AuthPage;
