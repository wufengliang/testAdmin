/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2022-11-21 09:55:57
 * @LastEditTime: 2023-12-13 15:07:17
 * @Description: 路由配置type
 */
import type { FunctionalComponent } from "vue";
import { RouteLocationNormalizedLoaded } from "vue-router";

export interface CacheRoute extends RouteLocationNormalizedLoaded {
  path: string;
  hidden?: boolean;
  icon?: FunctionalComponent | string;
  title?: string;
  children?: CacheRoute[];
  name: string;
  meta: {
    title: string;
    keepAlive?: boolean; //  是否缓存组件
  };
}
