/*
 * @Descripttion: 全局注册
 * @Author: WuFengliang
 * @Date: 2022-08-02 15:08:43
 * @LastEditTime: 2023-12-13 14:47:35
 */
import type { App } from "vue";
import { installDrawer, installModal } from "@/global";

export default function install(app: App): App<any> {
  installDrawer(app);
  installModal(app);
  return app;
}
