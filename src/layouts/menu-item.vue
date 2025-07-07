<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2024-11-15 11:05:03
 * @LastEditTime: 2024-11-15 18:03:03
 * @Description:
-->
<template>
  <a-sub-menu v-if="props?.data?.children && props?.data?.children.length" :key="props?.data?.path"
    :title="props?.data?.meta?.title" class="text-align-left">
    <template #icon>
      <component v-if="props?.data?.icon" class="margin-right-5" :is="props?.data?.icon" />
      <UserOutlined v-else />
    </template>
    <menu-item v-for="item in props.data?.children" :key="item.path" :data="item" />
  </a-sub-menu>
  <a-menu-item v-if="
    !props?.data?.children ||
    (props?.data?.children && !props?.data?.children.length)
  " class="text-align-left" :key="props?.data?.path" @click="router.push(props?.data?.path as string)">
    <template #icon>
      <component v-if="props?.data?.icon" class="margin-right-5" :is="props?.data?.icon" />
      <UserOutlined v-else />
    </template>
    <span>{{ props?.data?.meta?.title }}</span>
  </a-menu-item>
</template>
<script lang="ts" setup>
import type { CacheRoute } from "@/types/route";
import { useRouter } from "vue-router";
import { UserOutlined } from '@ant-design/icons-vue';

const router = useRouter();
const props = defineProps<{ data: CacheRoute }>();

</script>
