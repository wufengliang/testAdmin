<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2025-07-01 16:44:48
 * @LastEditTime: 2025-07-13 17:27:33
 * @Description: 
-->
<template>
    <a-form>
        <a-form-item label="宽度">
            <a-input-number v-model:value="options.width" />
        </a-form-item>
        <a-form-item label="高度">
            <a-input-number v-model:value="options.height" />
        </a-form-item>
        <a-form-item label="向左偏移">
            <a-input-number v-model:value="options.leftOffset" />
        </a-form-item>
        <a-form-item label="向上偏移">
            <a-input-number v-model:value="options.topOffset" />
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const options = reactive({ width: 70, height: 40, leftOffset: 0, topOffset: 0 });

defineExpose({
    options
})
</script>