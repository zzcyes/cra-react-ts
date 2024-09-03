export interface IFileUploadPayload {
  file: Blob;
}
export interface IFileUploadRes {
  fileUrl: string;
  fileId: string;
  fileName?: string;
}
export enum EUploadStatus {
  NOT = 0,
  UPLOADED = 1,
}
export interface IBigFileUploadCheckRes {
  fileMD5: string;
  lock: number;
  totalChunks: number;
  currChunk: number;
  path: string;
  totalSize: number;
  status: EUploadStatus;
}
export interface IBigFileUploadRes {
  filemd5: string;
  chunks: number;
  fileId: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  id: number;
}
export interface IBigFileUploadPayload {
  file: Blob;
  fileMD5: string;
  totalChunks: number;
  currChunk: number;
  fileSize: number;
  storeType: 'dynamic' | 'static';
}
