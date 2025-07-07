/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2024-09-25 16:25:37
 * @LastEditTime: 2024-09-25 17:19:43
 * @Description: 搜索主内容
 */
import { defineComponent } from "vue";
import { AmSearchProps } from "./props";

export default defineComponent({
  name: "AmSearch",
  props: AmSearchProps,
  setup(props, ctx) {
    return () => {
      return <div></div>;
    };
  },
});
