<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2024-11-15 11:05:03
 * @LastEditTime: 2024-11-15 18:43:14
 * @Description:
-->
<template>
  <div class="mt-1 px-2" v-if="routeNames.length">
    <div class="tab-box flex-1 ">
      <a-tabs v-model:activeKey="currentPath" type="editable-card" hide-add @edit="deleteTab" @change="chooseTab">
        <a-tab-pane v-for="pane in routeNames" :key="pane.path" :closable="true">
          <template #tab>
            <div>
              <SyncOutlined v-if="pane.path === currentPath" @click="refresh(pane.path)" :spin="isSpin" />
              <span>{{ pane.title || pane.path }}</span>
            </div>
          </template>
          <template #closeIcon>
            <div v-if="routeNames.length > 1">
              <a v-if="currentPath === pane.path">
                <CloseCircleOutlined class="text-sm" />
              </a>
              <span v-else>
                <CloseCircleOutlined class="text-sm" />
              </span>
            </div>
          </template>
        </a-tab-pane>
        <template #rightExtra>
          <div class="w-10 center">
            <a-dropdown>
              <span class="cursor-pointer" @click.prevent>
                <DownOutlined />
              </span>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="operateTab('current')">
                    关闭当前
                  </a-menu-item>
                  <a-menu-item @click="operateTab('all')">
                    关闭其他
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </template>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { SyncOutlined, DownOutlined, CloseCircleOutlined } from "@/global";
import { useKeepAliveRoute } from '@/hooks/useKeepAliveRoute';

defineOptions({
  name: 'TabBar'
})

const router = useRouter();
const reload = inject<(url: string) => void>("reload")!;
const isSpin = ref<boolean>(false);

const { routeNames, currentPath, remove, removeAll } = useKeepAliveRoute();

//  刷新操作
const refresh = (url: string) => {
  isSpin.value = true;
  reload(url);
  setTimeout(() => {
    isSpin.value = false;
  }, 1000);
};

/**
 * 删除tab页签
 */
const deleteTab = (path: string) => {
  return remove({ path })
}

/**
 * tab切换
 */
const chooseTab = (path: string) => {
  router.push(path);
}

/**
 * tab操作
 */
const operateTab = (type: 'current' | 'all') => {
  if (type === 'current') {
    remove({ path: currentPath.value });
  } else {
    removeAll();
  }
}

</script>

<style lang="scss" scoped>
:deep(.ant-tabs-nav) {
  margin-bottom: 5px;

  &::before {
    border-bottom-width: 0;
  }

  .ant-tabs-tab {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

:deep(.ant-tabs-extra-content) {
  flex-shrink: 0;
}
</style>
