<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2025-06-09 10:05:48
 * @LastEditTime: 2025-06-09 14:03:52
 * @Description: 
-->
<template>
    <div class="p-5">
        <div>
            <am-search :data-source="SEARCH_COLUMNS" />
        </div>
        <div class="mt-5">
            <am-table :data="tableObj">
                <template #title>
                    <div class="flex justify-end">
                        <a-button type="primary" @click="addProduct">录入新产品</a-button>
                    </div>
                </template>
            </am-table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { AmSearch } from '@/components/am-search';
import { AmTable } from '@/components/am-table'
import { SEARCH_COLUMNS, COLUMNS } from './params';
import ProductTemplate from './components/productTemplate.vue';
import { createModal } from '@/global/create-modal';

const tableObj = reactive({
    columns: COLUMNS,
})

/**
 * 添加产品
 */
const addProduct = (type: "add" | 'edit') => {
    createModal({
        title: '新建产品',
        component: ProductTemplate,
        width: 800,
        maskClosable: false,
        onOk:()=>{
            
        }
    })
}

</script>