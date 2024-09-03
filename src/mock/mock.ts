import Mock from 'mockjs';

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_MOCK === 'true') {
  Mock.setup({
    timeout: '200-600', // 设置响应时间随机范围
  });

  Mock.mock('/v1/auth/login', 'post', {
    user: {
      role: 'user',
      isEmailVerified: false,
      account: 'zzc',
      id: '66d5d85209a852937d9c0d1b',
    },
    tokens: {
      access: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmQ1ZDg1MjA5YTg1MjkzN2Q5YzBkMWIiLCJpYXQiOjE3MjUzNTg1MTMsImV4cCI6MTcyNTM2MDMxMywidHlwZSI6ImFjY2VzcyJ9.Pzwrf2z2OBgaMZ72biEfc6mzzUADEKEboBorMPBmi3o',
        expires: '2024-09-03T10:45:13.352Z',
      },
      refresh: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmQ1ZDg1MjA5YTg1MjkzN2Q5YzBkMWIiLCJpYXQiOjE3MjUzNTg1MTMsImV4cCI6MTcyNzk1MDUxMywidHlwZSI6InJlZnJlc2gifQ.snYhjUAgzVXhznKY13pbra30KQOF02zqDAlQf08vNkI',
        expires: '2024-10-03T10:15:13.352Z',
      },
    },
  });
}
