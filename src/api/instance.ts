/*
 * @Descripttion:
 * @Author: WuFengliang
 * @Date: 2022-06-14 10:42:11
 * @LastEditTime: 2024-09-20 16:25:20
 */
import axios, { AxiosRequestHeaders } from "axios";
import cookies from "js-cookie";
import { cloneDeep } from "lodash-es";
import oidc from "./oidc";
import { notification } from "ant-design-vue";

const { VITE_BASE_URL } = import.meta;
const instance = axios.create({ timeout: 15000 });

instance.defaults.baseURL = VITE_BASE_URL;
instance.defaults.withCredentials = true;

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    const cloneConfig = cloneDeep(config);
    if (token) {
      (cloneConfig.headers as AxiosRequestHeaders).Authorization = token;
    }
    return cloneConfig;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (res) => {
    const { data } = res;
    return Promise.resolve(data);
  },
  (error) => {
    const { status } = error.response;
    let message;
    switch (status) {
      case 401:
        oidc.login();
        break;
      case 403:
        message = "无权限访问";
        break;
      case 404:
        message = "请求地址不存在";
        break;
      case 502:
        message = "服务正在启动中";
        break;
      case 503:
        message = "服务不可用";
        break;
      case 504:
        message = "请求超时啦";
        break;
      default:
        message = error.message || "服务异常";
        break;
    }
    notification.error({ message, duration: 1500 });
    return Promise.reject(error || message);
  }
);

export default instance;
