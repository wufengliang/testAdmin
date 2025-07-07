/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2022-11-21 09:55:57
 * @LastEditTime: 2025-06-26 13:49:11
 * @Description:
 */
import { createWebHashHistory, createRouter, RouteRecordRaw } from "vue-router";
import { constantRoutes } from "./constant";
import pkg from "../../package.json";

const modules = import.meta.glob("./modules/*.ts", { eager: true }) as Record<string, any>;
const routerModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routerModuleList.push(...modList);
});

if (Array.isArray(constantRoutes[0].children)) {
  constantRoutes[0].children.push(...routerModuleList as never[]);
} else {
  constantRoutes[0].children = routerModuleList as never[];
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes] as RouteRecordRaw[],
});

router.afterEach((to) => {
  const { meta } = to;
  const { title = "路由暂无名称" } = meta;
  const mainTitle = pkg.title || "暂无系统名称";
  document.title = `${mainTitle} - ${title}`;
});

export { routerModuleList };

export default router;
