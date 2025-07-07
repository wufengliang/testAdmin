<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2025-06-09 09:55:21
 * @LastEditTime: 2025-06-09 14:48:39
 * @Description: 
-->
<template>
    <div class="p-5">
        <div>
            <am-search :data-source="SEARCH_COLUMNS" />
        </div>

        <div>
            <am-table>
                <template #title>
                    <div class="flex justify-end">
                        <a-button type="primary" @click="addProduct">录入新评级</a-button>
                    </div>
                </template>
            </am-table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { AmSearch } from '@/components/am-search';
import { AmTable } from '@/components/am-table'
import { SEARCH_COLUMNS } from './params';
import { createModal } from '@/global/create-modal';
import RankTemplate from './components/rankTemplate.vue';


/**
 * 添加产品
 */
const addProduct = () => {
    createModal({
        title: '录入新评级',
        component: RankTemplate,
        width: 800,
        maskClosable: false,
    })
}
</script>