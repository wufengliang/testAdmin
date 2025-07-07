<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2022-11-21 09:55:57
 * @LastEditTime: 2024-09-20 16:29:19
 * @Description:
-->
<script setup lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { watch } from 'vue';
import cookies from 'js-cookie';
import { useRoute } from 'vue-router';
import { userStore } from '@/store/userStore';
import { TOKEN } from '@/utils/variable';
import oidc from "./api/oidc";

const route = useRoute();
const store = userStore();

watch(() => route.path, () => {
  const token = cookies.get(TOKEN);
  if (token) {
    oidc.getUserInfo().then(v => {
      v && store.serUserInfo(v.profile);
    })
  }
}, { immediate: true })

</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>
