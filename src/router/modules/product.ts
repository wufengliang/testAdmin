/*
 * @Descripttion:
 * @Author: WuFengliang
 * @Date: 2022-06-14 10:09:36
 * @LastEditTime: 2025-06-09 15:33:58
 */

export default [
  {
    name: "Product",
    path: "/product",
    component: () => import("@/views/product/list/index.vue"),
    meta: {
      title: "公司产品",
      keepAlive: true,
    },
  },
  {
    name: "Rank",
    path: "/rank",
    component: () => import("@/views/product/rank/index.vue"),
    meta: {
      title: "评级卡片",
      keepAlive: true,
    },
  },
];
