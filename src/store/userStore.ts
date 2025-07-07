/*
 * @Descripttion:
 * @Author: WuFengliang
 * @Date: 2022-06-13 14:39:43
 * @LastEditTime: 2024-09-20 16:57:51
 */
import { reactive } from "vue";
import { defineStore } from "pinia";
import { type Profile } from "oidc-client";

export const userStore = defineStore("userStore", () => {
  const userInfo = reactive<Partial<Profile>>({});

  /**
   * 设置用户信息
   */
  const serUserInfo = (v: Profile) => {
    v && Object.assign(userInfo, v);
  };

  return {
    userInfo,
    serUserInfo,
  };
});
