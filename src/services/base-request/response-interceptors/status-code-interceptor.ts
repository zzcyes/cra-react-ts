import { message } from 'antd';
import { AxiosResponse } from 'axios';
import { loginUserState } from '../utils';
import debounce from 'lodash/debounce';
export const SuccessStatusCodeInterceptor = (response: AxiosResponse<any>) => {
  // 因为接口返回体不同，所以会一起判断respcode和status
  //这里是业务状态码错误的请求逻辑，一般来说我们
  const { data } = response;
  const { status: businessStatus, respCode } = data;
  console.debug('data:', data);
  if (respCode && Number(respCode) !== 10000000) {
    return Promise.reject(
      new Error(
        response?.data?.message ??
          response?.data?.respRemark ??
          response?.data?.respMessage ??
          `请求失败`,
      ),
    );
  }
  if (businessStatus && businessStatus !== 200) {
    // 如果返回的data.data有内容，那么这个data.data可能需要被用到，所以将整个data返回
    if (data?.data) return Promise.reject(data);
    //业务错误时，将后台的msg当做错误信息，供前端进行展示
    return Promise.reject(new Error(data.msg));
  } else {
    //业务正确时，正常返回
    return response;
  }
};

const showTokenError = debounce(() => {
  loginUserState.clear();
  message.error('认证过期，请重新登录', 1, () => {
    window.location.href = '/toLogin';
  });
}, 300);

export const FailStatusCodeInterceptor = (error: any) => {
  if (error.response) {
    console.log('respoonse error in response interceptor', error);
    const { status } = error.response;
    if (status === 401) {
      if (loginUserState.get() !== null) {
        showTokenError();
        return;
      }
      return Promise.reject(new Error(error.response?.data?.respMessage ?? '认证过期，请重新登录'));
    } else {
      if (Number(error.response.data.code) !== 10000000) {
        return Promise.reject(
          error.response,
          // new Error(
          // error.response?.data?.message ?? error.response?.data?.respMessage ?? `请求失败`,

          // ),
        );
      }
      return Promise.reject(
        new Error(error.response?.data?.msg || error.response?.data?.message || `请求${status}`),
      );
    }
  }
  return Promise.reject(error);
};
