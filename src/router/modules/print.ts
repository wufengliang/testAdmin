/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2025-06-23 16:29:02
 * @LastEditTime: 2025-06-30 21:21:02
 * @Description: 
 */
export default [
  {
    name: "Print",
    path: "/print",
    component: () => import("@/views/print/index.vue"),
    meta: {
      title: "打印测试",
      keepAlive: true,
    },
  },
  {
    name: "Print2",
    path: "/print2",
    component: () => import("@/views/print2/index.vue"),
    meta: {
      title: "打印测试2",
      keepAlive: true,
    },
  },
  {
    name: "Print3",
    path: "/print3",
    component: () => import("@/views/print3/index.vue"),
    meta: {
      title: "自定义测试",
      keepAlive: true,
    },
  },
]