<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2025-06-09 14:13:02
 * @LastEditTime: 2025-06-09 15:21:22
 * @Description: 
-->
<template>
    <a-form ref="formRef" :model="formState">
        <a-card title="经典标"></a-card>
        <a-card title="公司产品系列" class="mt-5">
            <a-row gutter="8">
                <a-col span="12">
                    <a-form-item label="生产月份">
                        <a-input />
                    </a-form-item>
                </a-col>
                <a-col span="12">
                    <a-form-item label="语言版本">
                        <a-input />
                    </a-form-item>
                </a-col>
                <a-col span="12">
                    <a-form-item label="公司名称">
                        <a-input />
                    </a-form-item>
                </a-col>
                <a-col span="12">
                    <a-form-item label="产品名称">
                        <a-input />
                    </a-form-item>
                </a-col>
                <a-col span="12">
                    <a-form-item label="产品系列">
                        <a-input />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-card title="藏卡基础信息" class="mt-5">
            <a-row gutter="8">
                <a-col :span="12">
                    <a-form-item label="评级编码">
                        <a-input />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="藏卡名称">
                        <a-input />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-card>
                <template #title>
                    <div class="flex">
                        <span class="mr-5">显示小分</span>
                        <div class="flex-1 font-50">用户选择显示小分</div>
                    </div>
                </template>
                <a-row gutter="8">
                    <a-col :span="12">
                        <div>
                            <a-form-item label="居中">
                                <a-input />
                            </a-form-item>
                        </div>
                        <div>
                            <a-form-item label="表面">
                                <a-input />
                            </a-form-item>
                        </div>
                        <div>
                            <a-form-item label="四角">
                                <a-input />
                            </a-form-item>
                        </div>
                        <div>
                            <a-form-item label="四边">
                                <a-input />
                            </a-form-item>
                        </div>
                    </a-col>
                    <a-col :span="12">
                        <div class="h-full flex flex-col items-center justify-center">
                            <div>
                                <a-form-item label="评级等级">
                                    <a-input />
                                </a-form-item>
                            </div>
                            <div>
                                <a-form-item label="评级分值">
                                    <a-input />
                                </a-form-item>
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </a-card>
        </a-card>
    </a-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { type FormInstance } from 'ant-design-vue';
import RankTemplate from './components/rankTemplate.vue';

const formRef = ref<FormInstance>();
const formState = reactive({})
</script>
