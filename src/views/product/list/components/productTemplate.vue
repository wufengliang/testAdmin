<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2025-06-09 10:12:35
 * @LastEditTime: 2025-06-09 14:05:40
 * @Description: 
-->
<template>
    <div>
        <a-form ref="formRef" :model="formState">
            <a-form-item label="公司名称">
                <a-input />
            </a-form-item>
            <a-form-item label="产品名称">
                <a-input />
            </a-form-item>
            <a-form-item label="产品系列">
                <a-input />
            </a-form-item>
            <a-form-item label="生产月份">
                <a-input />
            </a-form-item>
            <a-form-item label="语言版本">
                <a-input />
            </a-form-item>
            <a-form-item label="产品图片">

            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { type FormInstance } from 'ant-design-vue';

const formRef = ref<FormInstance>();
const formState = reactive({})
</script>