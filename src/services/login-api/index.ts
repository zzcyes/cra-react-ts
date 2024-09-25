import api from '../api';
import { request } from '../base-request';

export interface IAuthPayload {
  account: string;
  password: string;
}

export interface IAuthState {
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: { token: string; expires: string };
  };
  user: {
    role: string;
    isEmailVerified: boolean;
    account: string;
    id: string;
  };
}

class LoginApiClass {
  login = (payload: IAuthPayload) => {
    return request.post<IAuthState>(api.login, payload).then(res => res.data);
  };
  register = (payload: IAuthPayload) => {
    return request.post<IAuthState>(api.register, payload).then(res => res.data);
  };
}

export const LoginApi = new LoginApiClass();
