import { CacheRoute } from "@/types/route";

/**
 * @desc 根据路由过滤成完成树路由结构
 */
export function snakeTreeRoutes(routes: Array<CacheRoute>): Array<CacheRoute> {
  const array: Array<CacheRoute> = [];
  routes.forEach((route: CacheRoute) => {
    const { children = [], hidden = false } = route;
    if (children.length || !hidden) {
      route.children = snakeTreeRoutes(children);
      array.push(route);
    }
  });
  return array;
}
