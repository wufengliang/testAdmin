<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2024-11-15 16:25:21
 * @LastEditTime: 2024-11-15 17:10:02
 * @Description:
-->
<template>
  <template v-if="true">
    <a-drawer class="!bg-transparent" v-if="utilsCommon.isMobile" :bodyStyle="{ padding: 0 }"
      :contentWrapperStyle="{ 'transition-duration': '0.2s' }" v-model:open="utilsCommon.isToggle" :title="null"
      placement="left" :closable="false" :width="200" destroyOnClose @close="utilsCommon.setToggle(false)">
      <sider-menu />
    </a-drawer>
    <sider-menu v-else />
  </template>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue';
import SiderMenu from "./slider.vue";
import { commonStore } from '@/store';

const isShow = ref<boolean>(false);
const utilsCommon = commonStore();

watch(() => utilsCommon.isMobile, (val) => {
  if (val) {
    isShow.value = true;
  }
})
</script>
