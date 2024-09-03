import api from '../api';
import { IDataResType, request } from '../base-request';
import { IFLoginUserInfo } from './type';

export interface IAuthPayload {
  account: string;
  password: string;
}

class LoginApiClass {
  login = (payload: IAuthPayload) => {
    return request.post<IFLoginUserInfo>(api.login, payload).then(res => res.data);
  };
  register = (payload: IAuthPayload) => {
    return request.post<IFLoginUserInfo>(api.register, payload).then(res => res.data);
  };
}

export const LoginApi = new LoginApiClass();
