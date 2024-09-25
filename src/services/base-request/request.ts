import axios from 'axios';
import { loginUserState } from './utils';
import { timeout } from './config';
import {
  FailStatusCodeInterceptor,
  SuccessStatusCodeInterceptor,
} from './response-interceptors/status-code-interceptor';
const _cloneDeep = require('lodash/cloneDeep');

export const request = axios.create({
  timeout: timeout,
  withCredentials: true,
});
export const CancelToken = axios.CancelToken;
export const isCancel = axios.isCancel;

/**
 * @description 获取原始类型
 * @param {*} value
 * @returns {String} 类型字符串，如'String', 'Object', 'Null', 'Boolean', 'Number', 'Array'
 */
const toRawType = value => {
  return Object.prototype.toString.call(value).slice(8, -1);
};
// 移除空字符串，null, undefined
const clearEmptyParam = config => {
  ['data', 'params'].forEach(item => {
    if (config[item]) {
      const keys = Object.keys(config[item]);
      if (keys.length) {
        keys.forEach(key => {
          const rawType = toRawType(config[item]);
          if (['', undefined].includes(config[item][key]) && ['Object'].includes(rawType)) {
            // 移除属性之前，进行深拷贝断开引用，避免影响页面
            config[item] = _cloneDeep(config[item]);
            delete config[item][key];
          }
        });
      }
    }
  });
};
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
