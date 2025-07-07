<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2023-12-13 09:56:53
 * @LastEditTime: 2024-11-15 18:26:12
 * @Description:
-->
<template>
  <a-layout class="w-screen h-screen flex flex-col overflow-y-hidden">
    <drawer-slider />
    <a-layout>
      <a-layout-header class="!bg-white !px-0 flex shadow-md">
        <div class="cursor-pointer px-6 !hover:bg-[rgba(0,0,0,.06)] rounded-md" @click="utilsCommon.setToggle()">
          <MenuUnfoldOutlined v-if="utilsCommon.isToggle" />
          <MenuFoldOutlined v-else />
        </div>
        <div class="flex-1 text-right">
          <header-user class="mr-4" />
        </div>
      </a-layout-header>
      <a-layout-content class="flex-1">
        <main-content />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import DrawerSlider from './drawer-slider.vue';
import MainContent from "./main-content.vue";
import HeaderUser from "./header-user.vue";
import { commonStore } from '@/store';
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";

const utilsCommon = commonStore();

</script>
