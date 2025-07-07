/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2022-10-10 11:49:15
 * @LastEditTime: 2024-11-15 11:03:16
 * @Description:
 */
import { AMBaseLogin } from "@am/oa";

const { VITE_REDIRECT_URI, VITE_LOGOUT_REDIRECT_URL } = import.meta;

const params: any = {
  accessType: "default",
  client_id: "10165",
  scope: "openid profile phone email jobInfo qq oa-attendance-api",
  redirect_uri: VITE_REDIRECT_URI,
  post_logout_redirect_uri: VITE_LOGOUT_REDIRECT_URL,
  monitorSession: false,
};
const oidc = new AMBaseLogin(params);

export default oidc;
