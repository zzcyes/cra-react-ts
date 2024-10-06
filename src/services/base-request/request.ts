import axios from 'axios';
import { loginUserState } from './utils';
import { timeout } from './config';
import {
  FailStatusCodeInterceptor,
  SuccessStatusCodeInterceptor,
} from './response-interceptors/status-code-interceptor';

export const request = axios.create({
  timeout: timeout,
  withCredentials: true,
});
export const CancelToken = axios.CancelToken;
export const isCancel = axios.isCancel;

request.interceptors.request.use(value => {
  if (value.url && value.url.search(/oauth\/token/) === -1) {
    if (loginUserState.getAccessToken()) {
      value.headers.set('token', `Bearer ${loginUserState.getAccessToken()}`);
    } else {
      value.headers.set('token', `Basic ${window.btoa('superuser:123456')}`);
    }
  }
  return value;
});
request.interceptors.response.use(SuccessStatusCodeInterceptor, FailStatusCodeInterceptor);
