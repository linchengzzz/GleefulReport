import axios, { AxiosPromise } from 'axios';
import qs from 'qs';
import config from '../config/index';

const apiHost = config.API_HOST;
const instance = axios.create({
    baseURL: apiHost,
    transformRequest: [(data) =>  qs.stringify(data)],
});

interface Img {
    file: string;
    group: string;
    ext: string;
}
// 上传照片
const UploadAPI = {
    upload: (params: Img): AxiosPromise => instance.post('/common/file/upload', params),
};

export { UploadAPI };
