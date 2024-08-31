export * from "./api";

export interface IRoutes {
  name: string;
  path: string;
  element?: JSX.Element | null | any;
  children?: IRoutes[];
  icon?: React.ReactNode | null;
}
