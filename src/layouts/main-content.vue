<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2022-11-21 09:55:57
 * @LastEditTime: 2024-11-15 18:26:56
 * @Description:
-->
<template>
  <div class="h-full flex flex-col">
    <tab-bar />
    <div class="main-content flex-1 bg-white padding-20 overflow-y-auto">
      <router-view v-slot="{ Component }">
        <keep-alive :include="keepAliveList">
          <component :is="isActive ? Component : null" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, provide } from "vue";
import TabBar from "./tab-bar.vue";
import { useKeepAliveRoute } from '@/hooks/useKeepAliveRoute';

const isActive = ref(true);
const { keepAliveList, refresh } = useKeepAliveRoute();
/**
 * 重新刷新路由
 */
const reload = async (url: string) => {
  isActive.value = false;
  await refresh(url);
  isActive.value = true
};

provide("reload", reload);
</script>
