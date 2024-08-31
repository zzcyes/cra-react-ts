//用作对象返回
export interface IDataResType<T> {
  msg: string; //描述
  status: number; //状态码
  data: T;
}

//用作列表返回
export interface IListResType<T> {
  msg: string; //描述
  status: number; //状态码
  data: T[];
  total: number | null;
}

export interface IListResTypes<T> {
  msg: string; //描述
  status: number; //状态码
  data: T;
  total: number | null;
}

export interface IPage {
  page: number;
  pageSize: number;
}
