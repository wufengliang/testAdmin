/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2024-11-15 15:58:01
 * @LastEditTime: 2024-11-15 16:07:15
 * @Description:
 */
import { watch, ref } from "vue";
import { useIsMobile } from "./useIsMobile";

export function useToggle() {
  const isMobile = useIsMobile(700);
  const isToggle = ref(!isMobile.value);

  const setToggle = (v?: boolean) => {
    if (v === undefined) {
      return (isToggle.value = isToggle.value);
    }
    return (isToggle.value = v);
  };

  watch(
    isMobile,
    (v) => {
      if (v) {
        isToggle.value = false;
      }
    },
    { immediate: true }
  );

  return {
    isMobile,
    isToggle,
    setToggle,
  };
}
