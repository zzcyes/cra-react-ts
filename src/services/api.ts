const api = {
  login: '/v1/auth/login',
  register: '/v1/auth/register',
  uploadFile: '/ifaas-file/fileUploadMulti',
  uploadBigFile: '/ifaas-file/bigFileUploadMulti/1.0',
  deleteFile: '/ifaas-file/fileDelete',
  batchDeleteFile: '/ifaas-file/fileBatchDelete/1.0',
  checkBigFile: '/ifaas-file/checkFile/1.0',
};

// 检查是否有重复的url
const checkUrl = () => {
  const urlArr: string[] = [];
  Object.keys(api).forEach(key => {
    if (urlArr.includes(api[key])) {
      throw new Error(`重复的url：${api[key]}`);
    }
    urlArr.push(api[key]);
  });
};

checkUrl();

export default api;
