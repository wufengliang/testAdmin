<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2025-06-30 21:16:10
 * @LastEditTime: 2025-07-07 17:47:22
 * @Description: 自定义打印
-->
<template>
    <div>
        <div class="mb-[20px]">
            <a-button type="primary" @click="lookJson">查看JSON数据</a-button>
            <a-button class="ml-[10px]" type="primary" @click="setConfig">设置大小</a-button>
            <a-button class="ml-[10px]" type="primary" @click="print('web')">web打印</a-button>
            <a-button class="ml-[10px]" type="primary" @click="print('client')">打印机打印</a-button>
        </div>
        <a-row :gutter="[8, 0]">
            <a-col :span="4">
                <a-card style="height: 100vh">
                    <a-row>
                        <a-col :span="24" class="rect-printElement-types hiprintEpContainer">
                            <a-row class="drag_item_title">拖拽组件列表</a-row>
                            <a-row style="height: 100px;">
                                <a-col :span="12" class="drag_item_box">
                                    <div>
                                        <a class="ep-draggable-item" tid="defaultModule.text">
                                            <span class="glyphicon glyphicon-text-width" aria-hidden="true"></span>
                                            <p class="glyphicon-class">文本</p>
                                        </a>
                                    </div>
                                </a-col>
                                <!-- <a-col :span="12" class="drag_item_box">
                                    <div>
                                        <a class="ep-draggable-item" tid="defaultModule.image">
                                            <span class="glyphicon glyphicon-picture" aria-hidden="true"></span>
                                            <p class="glyphicon-class">图片</p>
                                        </a>
                                    </div>
                                </a-col> -->
                            </a-row>
                            <a-row style="height: 100px;">
                                <a-col :span="12" class="drag_item_box">
                                    <div>
                                        <a class="ep-draggable-item" tid="defaultModule.longText">
                                            <span class="glyphicon glyphicon-subscript" aria-hidden="true"></span>
                                            <p class="glyphicon-class">长文</p>
                                        </a>
                                    </div>
                                </a-col>
                                <a-col :span="12" class="drag_item_box">
                                    <div>
                                        <a class="ep-draggable-item" tid="defaultModule.table">
                                            <span class="glyphicon glyphicon-th" aria-hidden="true"></span>
                                            <p class="glyphicon-class">表格</p>
                                        </a>
                                    </div>
                                </a-col>
                            </a-row>
                            <a-row style="height: 100px;">
                                <a-col :span="12" class="drag_item_box">
                                    <div>
                                        <a class="ep-draggable-item" tid="defaultModule.emptyTable">
                                            <span class="glyphicon glyphicon-th" aria-hidden="true"></span>
                                            <p class="glyphicon-class">空白表格</p>
                                        </a>
                                    </div>
                                </a-col>
                            </a-row>
                            <a-row style="height: 100px;">
                                <a-col :span="12" class="drag_item_box">
                                    <div>
                                        <a class="ep-draggable-item" tid="defaultModule.html" style="">
                                            <span class="glyphicon glyphicon-header" aria-hidden="true"></span>
                                            <p class="glyphicon-class">html</p>
                                        </a>
                                    </div>
                                </a-col>
                                <a-col :span="12" class="drag_item_box">
                                    <div>
                                        <a class="ep-draggable-item" tid="defaultModule.customText">
                                            <span class="glyphicon glyphicon-text-width" aria-hidden="true"></span>
                                            <p class="glyphicon-class">自定义</p>
                                        </a>
                                    </div>
                                </a-col>
                            </a-row>
                            <a-row class="drag_item_title">辅助</a-row>
                            <!-- <a-row style="height: 100px;">
                                <a-col :span="12" class="drag_item_box">
                                    <div>
                                        <a class="ep-draggable-item" tid="defaultModule.hline">
                                            <span class="glyphicon glyphicon-resize-horizontal"
                                                aria-hidden="true"></span>
                                            <p class="glyphicon-class">横线</p>
                                        </a>
                                    </div>
                                </a-col>
                                <a-col :span="12" class="drag_item_box">
                                    <div>
                                        <a class="ep-draggable-item" tid="defaultModule.vline">
                                            <span class="glyphicon glyphicon-resize-vertical" aria-hidden="true"></span>
                                            <p class="glyphicon-class">竖线</p>
                                        </a>
                                    </div>
                                </a-col>
                            </a-row> -->
                            <!-- <a-row style="height: 100px;">
                                <a-col :span="12" class="drag_item_box">
                                    <div>
                                        <a class="ep-draggable-item" tid="defaultModule.rect">
                                            <span class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
                                            <p class="glyphicon-class">矩形</p>
                                        </a>
                                    </div>
                                </a-col>
                                <a-col :span="12" class="drag_item_box">
                                    <div>
                                        <a class="ep-draggable-item" tid="defaultModule.oval">
                                            <span class="glyphicon glyphicon-record" aria-hidden="true"></span>
                                            <p class="glyphicon-class">椭圆</p>
                                        </a>
                                    </div>
                                </a-col>
                            </a-row> -->
                            <a-row style="height: 100px;">
                                <a-col :span="12" class="drag_item_box">
                                    <div>
                                        <a class="ep-draggable-item" tid="defaultModule.barcode">
                                            <span class="glyphicon glyphicon-barcode" aria-hidden="true"></span>
                                            <p class="glyphicon-class">条形码</p>
                                        </a>
                                    </div>
                                </a-col>
                                <a-col :span="12" class="drag_item_box">
                                    <div>
                                        <a class="ep-draggable-item" tid="defaultModule.qrcode">
                                            <span class="glyphicon glyphicon-qrcode" aria-hidden="true"></span>
                                            <p class="glyphicon-class">二维码</p>
                                        </a>
                                    </div>
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
            <a-col :span="15">
                <a-card class="card-design">
                    <div id="hiprint-printTemplate" class="hiprint-printTemplate"></div>
                </a-card>
            </a-col>
            <a-col :span="5" class="params_setting_container">
                <a-card>
                    <a-row class="hinnn-layout-sider">
                        <div id="PrintElementOptionSetting"></div>
                    </a-row>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRaw, computed } from 'vue';
import { hiprint, defaultElementTypeProvider } from "vue-plugin-hiprint";
import $ from 'jquery';
import { createModal } from '@/global/create-modal';
import WidthTemplate from './width.vue';
import JsonTemplate from './json.vue';
import { webPrint, clientPrint } from './params';

const hiprintTemplate = ref();
const panel = ref();
const printData = ref({
    qrcode: 'KCY1234567980',
    qrValue: 'KCY1234567980',
    title: '五虎上将·关羽',
    type: '华立科技 •《三国幻战》•中国简中',
    subType: '2025年 五虎上将系列',
    centTitle: 'CENTERING',
    centValue: '10',
    corTitle: 'CORNERS',
    corValue: '10',
    edeTitle: 'EDEGS',
    edeValue: '10',
    surfaceTitle: 'SURFACE',
    surfaceValue: '10',
    genTitle: 'GEM MINT',
    genValue: '9.5'
});

const init = (template: Record<string, any> = {}) => {
    hiprintTemplate.value?.clear()
    hiprint.init({
        providers: [new defaultElementTypeProvider()],
    });
    // 还原配置
    hiprint.setConfig()
    // eslint-disable-next-line no-undef
    hiprint.PrintElementTypeManager.buildByHtml($('.ep-draggable-item'));
    $('#hiprint-printTemplate').empty()
    if (template.panels && template?.panels?.[0]) {
        template.panels[0].paperNumberDisabled = true;
    }
    hiprintTemplate.value = new hiprint.PrintTemplate({
        template,
        // 图片选择功能
        onImageChooseClick: (target) => {
            // 测试 3秒后修改图片地址值
            setTimeout(() => {
                target.refresh("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtAAAAIIAQMAAAB99EudAAAABlBMVEUmf8vG2O41LStnAAABD0lEQVR42u3XQQqCQBSAYcWFS4/QUTpaHa2jdISWLUJjjMpclJoPGvq+1WsYfiJCZ4oCAAAAAAAAAAAAAAAAAHin6pL9c6H/fOzHbRrP0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0u/SY9LS0tLS0tLS0tLS0n+edm+UlpaWlpaWlpaWlpaW/tl0Ndyzbno7/+tPTJdd1wal69dNa6abx+Lq6TSeYtK7BX/Diek0XULSZZrakPRtV0i6Hu/KIt30q4fM0pvBqvR9mvsQkZaW9gyJT+f5lsnzjR54xAk8mAUeJyMPwYFH98ALx5Jr0kRLLndT7b64UX9QR/0eAAAAAAAAAAAAAAAAAAD/4gpryzr/bja4QgAAAABJRU5ErkJggg==", {
                    // auto: true, // 根据图片宽高自动等比(宽>高?width:height)
                    // width: true, // 按宽调整高
                    // height: true, // 按高调整宽
                    real: true // 根据图片实际尺寸调整(转pt)
                })
            }, 3000)
            // target.getValue()
            // target.refresh(url)
        },
        // 自定义可选字体
        // 或者使用 hiprintTemplate.setFontList([])
        // 或元素中 options.fontList: []
        fontList: [
            { title: '思源黑体', value: 'Noto Sans SC' },
            { title: '阿里巴巴普惠体', value: 'alibaba' },
        ],
        dataMode: 1, // 1:getJson 其他：getJsonTid 默认1
        history: true, // 是否需要 撤销重做功能
        willOutOfBounds: true, // 是否允许组件内的控件超出范围
        qtDesigner: true, // 是否开启类似QT Designer的唯一field生成模式
        onDataChanged: (type, json) => {
            console.log(type); // 新增、移动、删除、修改(参数调整)、大小、旋转
            console.log(json); // 返回 template
        },
        onUpdateError: (e) => {
            console.log(e);
        },
        settingContainer: '#PrintElementOptionSetting',
        paginationContainer: '.hiprint-printPagination'
    });
    hiprintTemplate.value.design('#hiprint-printTemplate', { grid: true });
    console.log(hiprintTemplate);
    // 获取当前放大比例, 当zoom时传true 才会有
    // this.scaleValue = hiprintTemplate.value.editingPanel.scale || 1;
}

/**
 * 查看json
 */
const lookJson = () => {
    const json = hiprintTemplate.value?.getJson();
    let str
    try {
        str = JSON.parse(localStorage.getItem('hiprintTemplate'));
    } catch (e) {
        str = {};
    }
    createModal({
        title: '查看json数据',
        component: JsonTemplate,
        componentOptions: {
            value: json || str
        },
        beforeClose: async (v) => {
            let val;
            try {
                val = JSON.parse(v.value());
            } finally {
                if (val) {
                    localStorage.setItem('hiprintTemplate', JSON.stringify(val));
                    init(val);
                }
            }
        }
    })
}

/**
 * 设置大小
 */
const setConfig = () => {
    createModal({
        title: '设置大小',
        component: WidthTemplate,
        beforeClose: v => {
            const { width, height } = toRaw(v.options);
            if (width && height) {
                hiprintTemplate.value?.setPaper(width, height)
            }
        }
    })
}

/**
 * 打印
 */
const print = (type: 'client' | 'web') => {
    if (!panel.value) {
        console.log(hiprintTemplate.value);

        console.log(hiprintTemplate.value?.getJson());
        panel.value = hiprintTemplate.value?.getJson();
    }
    console.log(panel.value);
    if (type === 'web') {
        return hiprintTemplate.value?.print(printData.value);
    }

    if (type === 'client') {
        return hiprintTemplate.value?.print2();
    }
}

onMounted(() => {
    let str;
    try {
        str = JSON.parse(localStorage.getItem('hiprintTemplate'));
    } catch (error) {
        str = {};
    }
    init(str);
})

</script>

<style lang="scss" scoped>
.btn-text-desc {
    width: 12vw;
    text-align: right;
    white-space: nowrap;
}

// 拖拽
.drag_item_box {
    height: 100%;
    padding: 6px;
}

.drag_item_box>div {
    height: 100%;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.drag_item_box>div>a {
    text-align: center;
    text-decoration-line: none;
}

.drag_item_box>div>a>span {
    font-size: 28px;
}

.drag_item_box>div>a>p {
    margin: 0;
}

.drag_item_title {
    font-size: 16px;
    padding: 12px 6px 0 6px;
    font-weight: bold;
}

:deep(.hiprint-printElement-image-content) {
    img {
        content: url("~@/assets/logo.png");
    }
}

:deep(.toplineOfPosition) {
    border: 0;
    border-top: 1px dashed purple;
}

:deep(.bottomlineOfPosition) {
    border: 0;
    border-top: 1px dashed purple;
}

:deep(.leftlineOfPosition) {
    border: 0;
    border-left: 1px dashed purple;
}

:deep(.rightlineOfPosition) {
    border: 0;
    border-left: 1px dashed purple;
}

.card-design {
    overflow: hidden;
    overflow-x: auto;
    overflow-y: auto;
}
</style>