/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2023-12-13 16:17:50
 * @LastEditTime: 2023-12-14 11:58:23
 * @Description: 操作枚举
 */
export enum TabCloseType {
  SINGLE,
  CURRENT,
  OTHER
}

//  当前Tab操作传参
export interface ITabChooseOptions {
  type: TabCloseType; //  当前操作类型
  closePath?: string; //  关闭的url
  currentPath?: string; //  当前界面的url
  callback?: (url: string) => void; //  回调
}
