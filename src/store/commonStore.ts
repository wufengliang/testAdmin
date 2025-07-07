/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2024-11-15 16:07:51
 * @LastEditTime: 2024-11-15 17:08:23
 * @Description:
 */
import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useIsMobile } from "@/hooks/useIsMobile";

export const commonStore = defineStore("commonStore", () => {
  const isMobile = useIsMobile(700);
  const isToggle = ref(isMobile.value);

  const setToggle = (v?: boolean) => {
    if (v === undefined) {
      isToggle.value = !isToggle.value;
    } else {
      isToggle.value = v;
    }
  };

  watch(
    isMobile,
    (v) => {
      isToggle.value = v ? false : true;
    },
    { immediate: true }
  );

  return {
    isMobile,
    isToggle,
    setToggle,
  };
});
