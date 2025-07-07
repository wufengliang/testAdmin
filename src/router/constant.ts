/*
 * @Descripttion:
 * @Author: WuFengliang
 * @Date: 2022-06-13 14:23:28
 * @LastEditTime: 2025-06-09 09:52:51
 */
import { BasicLayout } from "./variable";

export const constantRoutes = [
  {
    path: "/",
    name: "index",
    hidden: true,
    component: BasicLayout,
    children: [
      {
        path: "/",
        component: () => import("@/views/dashboard/index.vue"),
      },
    ],
  },
];
