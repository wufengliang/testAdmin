<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2025-07-01 17:35:48
 * @LastEditTime: 2025-07-06 12:27:22
 * @Description: 
-->
<template>
    <a-textarea v-model:value="value" :rows="14"></a-textarea>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
    value: {
        type: Object,
        default: () => ({})
    }
})

const value = ref(JSON.stringify(props.value, null, 4))

defineExpose({
    value: () => value.value
})
</script>