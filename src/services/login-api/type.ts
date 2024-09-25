export interface ILoginPayload {
  account: string;
  password: string;
}
export interface IUserVo {
  id: number;
  name: string;
  account: string;
  organization: string;
  orgId: number;
}
export interface IUserArea {
  id: number;
  areaId: number;
  userId: number;
  level: number;
}
export interface IOauthResource {
  menuId: string;
  menuName: string;
  resourceCode: string;
  parentId: number;
  hasChild: boolean;
  childList?: IOauthResource[];
}
export interface IUserOperation {
  id: number;
  name: number;
  url: string;
  method: string;
}
export interface IUserRuleInfo {
  userId: number;
  roleId: number;
  roleName: string;
  roleCnName: string;
  type: number;
  orgId: number;
  grade: number;
}
export interface IFLoginUserInfo {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  respMessage: string;
  user_detail: {
    userVo: IUserVo;
    userRoleInfo: IUserRuleInfo[];
    operationList: IUserOperation[];
    oauthResources: IOauthResource[];
    userAreaList: IUserArea[];
  };
}

export interface IVerifyCode {
  duration: string;
  image: string;
  uuid: string;
}
