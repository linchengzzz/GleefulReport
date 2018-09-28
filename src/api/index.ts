import axios, { AxiosPromise } from 'axios';
import qs from 'qs';
import config from '../config/index';
import { Img, Report } from './Api';

const apiHost = config.API_HOST;
const javaHost = config.JAVA_HOST;

const instance = axios.create({
    baseURL: apiHost,
    transformRequest: [(data) => qs.stringify(data)],
});

const javaInstance = axios.create({
    baseURL: javaHost,
    headers: {
        'Authorization': 'Basic YmFzaWNpczVpOmxFVUdkNEx0Rg==',
        'Content-Type': 'application/json;charset=utf-8',
    },
    transformRequest: [(data) => JSON.stringify(data)],
});

// 上传照片
const UploadAPI = {
    upload: (params: Img): AxiosPromise => instance.post('/common/file/upload', params),
};
// 上传文章
const Updata = {
    report: (params: Report): AxiosPromise =>
        javaInstance.post('/message/saveNewspaper', { params }),
};

export { UploadAPI, Updata };
