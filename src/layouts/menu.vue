<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2024-03-15 14:02:47
 * @LastEditTime: 2024-11-15 11:07:56
 * @Description:
-->
<template>
  <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
    <menu-item v-for="item in routesList" :key="item.path" :data="item" />
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import MenuItem from "./menu-item.vue";
import { CacheRoute } from "@/types/route";
import { routerModuleList } from "@/router";
import { snakeTreeRoutes } from "@/utils/utils";

export default defineComponent({
  name: "MenuComp",
  components: {
    MenuItem
  },
  setup() {
    const route = useRoute();

    const routesList = computed(() => {
      return snakeTreeRoutes(routerModuleList as Array<CacheRoute>);
    });
    const openKeys = ref([]);
    const selectedKeys = ref([route.path]);

    watch(
      () => route,
      (newVal) => {
        selectedKeys.value = [newVal.path];
      },
      { deep: true }
    );

    return {
      routesList,
      openKeys,
      selectedKeys
    };
  }
});
</script>
