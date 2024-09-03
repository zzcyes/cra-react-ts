//用作对象返回
export interface IDataResType<T> {
  respRemark: string;
  respMessage: string; //描述
  respCode: number; //状态码
  data: T;
}

//用作列表返回
export interface IListResType<T> {
  respRemark: string;
  respMessage: string; //描述
  respCode: number; //状态码
  data: T[] | null;
  total: number | null;
}

export interface IListResTypes<T> {
  respRemark: string;
  respMessage: string; //描述
  respCode: number; //状态码
  data: T;
  total: number | null;
}

export interface IPage {
  page: number;
  pageSize: number;
}
