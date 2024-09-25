import { AxiosRequestConfig } from 'axios';
import api from '../api';
import { IDataResType, request } from '../base-request';
import {
  IBigFileUploadCheckRes,
  IBigFileUploadPayload,
  IBigFileUploadRes,
  IFileUploadPayload,
  IFileUploadRes,
} from './type';

export enum EUploadStatus {
  EVER = 0, //上传过
  UPLOADED = 1, //已经上传过并合并了
  NOT = 2, //未上传过
}
class FileApiClass {
  fileUpload = (payload: IFileUploadPayload, config?: AxiosRequestConfig) => {
    const formData = new FormData();
    formData.append('file', payload.file);
    return request
      .post<IDataResType<IFileUploadRes>>(api.uploadFile, formData, config)
      .then(res => res.data);
  };
  bigFileUpload = (payload: IBigFileUploadPayload, config?: AxiosRequestConfig) => {
    const formData = new FormData();
    Object.keys(payload).forEach(k => {
      formData.append(k, payload[k]);
    });
    return request
      .post<IDataResType<IBigFileUploadRes>>(api.uploadBigFile, formData, config)
      .then(res => res.data);
  };
  deleteFile = (fileUrl: string) => {
    const formData = new FormData();
    formData.append('fileUrl', fileUrl);
    return request.post(api.deleteFile, formData);
  };
  deleteSmFile = (fileUrl: string[]) => {
    return request.post(api.batchDeleteFile, { fileUrl });
  };
  checkBigFile = (fileMD5: string) => {
    return request
      .post<IDataResType<IBigFileUploadCheckRes>>(
        api.checkBigFile,
        { fileMD5 },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then(res => res.data);
  };
}

export const FileApi = new FileApiClass();
