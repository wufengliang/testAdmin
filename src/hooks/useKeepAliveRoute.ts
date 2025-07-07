/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2024-11-15 10:24:32
 * @LastEditTime: 2025-06-09 15:38:26
 * @Description:
 */
import { watch, ref, computed, type ComputedRef } from "vue";
import { useRouter } from "vue-router";

const { VITE_NODE_ENV } = import.meta.env;

const keepAliveList = ref<string[]>([]);

export function useKeepAliveRoute() {
  const router = useRouter();
  /**
   * 路由名集合
   */
  const routeNames: ComputedRef<
    Array<{ name: string; path: string; title: string }>
  > = computed(() => {
    return keepAliveList.value.map((name) => {
      const data = router.getRoutes().find((i) => i.name === name);
      return {
        name,
        path: data!.path,
        title: (data?.meta?.title as string) || "未命名title字段",
      };
    });
  });

  /**
   * 获取当前路由名
   */
  const currentPath = ref(router.currentRoute.value.path);

  /**
   * 路由栈名称
   */
  const routeList = computed(() => {
    return router.getRoutes();
  });

  /**
   * 移除某个路由
   */
  const remove = (options: { name?: string; path?: string }) => {
    if (routeNames.value.length <= 1) {
      return false;
    }

    const { name, path } = options;
    if (name) {
      return removeRoute(name);
    }

    if (path) {
      const pathName = routeList.value.find((i) => i.path === path)?.name;
      if (pathName) {
        return removeRoute(String(pathName));
      }
      return false;
    }
    return false;
  };

  /**
   * 刷新当前路由 组件缓存重置
   */
  const refresh = (path: string): Promise<null> => {
    return new Promise((resolve) => {
      const name = routeNames.value.find((i) => i.path === path)?.name;
      keepAliveList.value = keepAliveList.value.filter((i) => i !== name);
      setTimeout(() => {
        keepAliveList.value.push(String(name));
        resolve(null);
      }, 300);
    });
  };

  /**
   * 删除所有
   */
  const removeAll = () => {
    const { name } = router.currentRoute.value;
    keepAliveList.value = [String(name)];
  };

  /**
   * 删除单个路由
   */
  const removeRoute = (name: string) => {
    const isCurrent = router.currentRoute.value.name === name;
    const index = keepAliveList.value.indexOf(name);

    if (routeNames.value.length <= 1) {
      return false;
    }

    if (index > -1) {
      keepAliveList.value.splice(index, 1);

      if (isCurrent) {
        router.push({
          name: keepAliveList.value[keepAliveList.value.length - 1],
        });
      }

      return true;
    }
    return false;
  };

  watch(
    () => router.currentRoute.value,
    (newRoute, oldRoute) => {
      const { meta = {}, path } = newRoute;
      const { keepAlive = false } = meta;
      currentPath.value = path;

      const { meta: oldMeta = {} } = oldRoute || {};
      const { keepAlive: oldKeepAlive = false } = oldMeta;

      if (keepAlive) {
        const newName = String(newRoute.name || "");
        if (!newName && VITE_NODE_ENV !== "production") {
          return console.warn(`当前路由:${path},name未定义,请定义name属性`);
        }
        if (!keepAliveList.value.includes(newName)) {
          keepAliveList.value.push(newName);
        }
      }

      if (oldKeepAlive) {
        const index = keepAliveList.value.indexOf(String(oldMeta.name || ""));
        if (index > -1) {
          keepAliveList.value.splice(index, 1);
        }
      }
    },
    { immediate: true }
  );

  return {
    routeNames,
    currentPath,
    keepAliveList,
    remove,
    refresh,
    removeAll,
  };
}
