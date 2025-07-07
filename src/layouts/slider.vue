<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2024-03-15 14:02:47
 * @LastEditTime: 2025-06-09 09:57:46
 * @Description:
-->
<template>
  <div class="sider-box sticky h-full top-0 left-0">
    <a-layout-sider :class="['sider-content', 'h-full', { toggle: isShow }]" :trigger="null" v-model:collapsed="isShow"
      collapsible>
      <div class="logo center bg-black">
        <span class="text-white font-bold text-[20px]">卡次元系统</span>
      </div>
      <custom-menu />
    </a-layout-sider>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import CustomMenu from './menu.vue';
import { Logo1Png, Logo2Png } from "@/utils/image";
import { commonStore } from '@/store';

const isShow = ref(false);
const utilsCommon = commonStore();

watch(() => utilsCommon.isMobile, (v) => {
  if (v) {
    isShow.value = false;
  } else {
    isShow.value = !utilsCommon.isToggle
  }
}, { immediate: true })

watch(() => utilsCommon.isToggle, (v) => {
  isShow.value = !v;
})

</script>

<style lang="scss" scoped>
.sider-box {
  .sider-content {
    max-width: var(--expand-width);
    min-width: var(--expand-width);
    width: var(--expand-width);

    :deep(.ant-layout-sider-children) {
      display: flex;
      flex-direction: column;
      height: 100%;

      .ant-menu-root {
        flex: 1;
      }
    }

    &.toggle {
      max-width: var(--collapsed-width) !important;
      min-width: var(--collapsed-width) !important;
      width: var(--collapsed-width) !important;
    }

    .logo {
      height: var(--header-height);
    }
  }
}
</style>
