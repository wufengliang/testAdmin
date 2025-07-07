<!--
 * @Descripttion:
 * @Author: WuFengliang
 * @Date: 2022-06-13 16:26:41
 * @LastEditTime: 2024-12-30 14:05:02
-->
<template>
  <a-dropdown class="inline-block">
    <div>
      <a-avatar :size="35">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <a class="ml-2">个人中心</a>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item @click="logout">
          <LogoutOutlined />
          <span class="ml-2">退出登录</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import oidc from "@/api/oidc";
import cookies from "js-cookie";
import { LogoutOutlined, UserOutlined } from "@/global";

export default defineComponent({
  name: "HeaderUser",
  components: {
    UserOutlined,
    LogoutOutlined
  },
  setup() {
    const logout = () => {
      oidc.instance?.signoutCallback().then(() => cookies.remove('token'));
    };
    return {
      logout
    };
  }
});
</script>
