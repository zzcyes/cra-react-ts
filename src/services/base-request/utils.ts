export const CACHE_USER_KEY = 'current_user_info';
export const loginUserState = {
  save: (data: any) => {
    window.localStorage.setItem(CACHE_USER_KEY, JSON.stringify(data));
  },
  get: (): any => {
    try {
      const result = window.localStorage.getItem(CACHE_USER_KEY);
      return result ? JSON.parse(result) : null;
    } catch (e) {
      return null;
    }
  },
  checkIsLogin: () => {
    return loginUserState.get() instanceof Object;
  },
  getAccessToken: () => {
    return loginUserState.get()?.access_token;
  },
  getUserDetail: () => {
    return loginUserState.get()?.user_detail;
  },
  clear: () => {
    window.localStorage.removeItem(CACHE_USER_KEY);
  },
};
