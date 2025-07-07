<!--
 * @Descripttion: 
 * @Author: WuFengliang
 * @Date: 2022-07-21 16:55:11
 * @LastEditTime: 2022-07-21 17:27:11
-->
<template>
  <div class="loading-box center">
    <a-spin :tip="$props.text" :size="$props.size" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'AmLoading',
    props: {
      text: {
        type: String,
        default: '正在加载中...'
      },
      size: {
        type: String,
        default: 'large'
      }
    }
  });
</script>

<style lang="scss" scoped>
  .loading-box {
    width: 100vw;
    height: 100vh;
  }
</style>
