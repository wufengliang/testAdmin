<!--
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2025-06-23 16:29:26
 * @LastEditTime: 2025-06-30 15:47:28
 * @Description: 
-->
<template>
    <div class="p-2 box-border h-full overflow-hidden flex">
        <div class="overflow-y-auto w-[50%] flex-shrink-0">
            <a-form>
                <a-form-item label="打印区域宽度">
                    <a-input-number v-model:value="printOptions.width" />
                </a-form-item>
                <a-form-item label="打印区域高度">
                    <a-input-number v-model:value="printOptions.height" />
                </a-form-item>
                <a-form-item label="打印方向">
                    <a-select v-model:value="printOptions.orient">
                        <a-select-option :value="1">纵向（portrait）</a-select-option>
                        <a-select-option :value="0">横向（landscape）</a-select-option>
                    </a-select>
                </a-form-item>
                <a-card v-for="(item, index) in list" class="mb-2" :key="index"
                    :title="`${item.textType === 'qrcode' ? '二维码' : `内容项${index + 1}`}`">
                    <a-form-item label="内容">
                        <a-input v-model:value="item.title" />
                    </a-form-item>
                    <a-form-item label="宽度">
                        <a-input-number v-model:value="item.width" />
                    </a-form-item>
                    <a-form-item label="高度">
                        <a-input-number v-model:value="item.height" />
                    </a-form-item>
                    <a-form-item label="距离左上Y距离">
                        <a-input-number v-model:value="item.top" />
                    </a-form-item>
                    <a-form-item label="距离左上X距离">
                        <a-input-number v-model:value="item.left" />
                    </a-form-item>
                    <a-form-item label="行高">
                        <a-input-number v-model:value="item.lineHeight" />
                    </a-form-item>
                    <a-form-item label="字体大小">
                        <a-input-number v-model:value="item.fontSize" />
                    </a-form-item>
                    <a-form-item label="缩放大小">
                        <a-input-number v-model:value="item.scale" />
                    </a-form-item>
                    <a-form-item label="字体格式">
                        <a-select v-model:value="item.fontFamily" class='w-full'>
                            <a-select-option value="Noto Sans SC">思源黑体</a-select-option>
                            <a-select-option value="alibaba">阿里巴巴普惠体</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="对齐格式">
                        <a-select v-model:value="item.textAlign">
                            <a-select-option value="left">左对齐</a-select-option>
                            <a-select-option value="center">居中</a-select-option>
                            <a-select-option value="right">右对齐</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="字体粗细">
                        <a-select v-model:value="item.fontWeight">
                            <a-select-option value="bold">加粗</a-select-option>
                            <a-select-option value="">普通</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-card>
            </a-form>
        </div>
        <div class="w-[50%] box-border p-2 flex-shrink-0">
            <div>
                <a-button type="primary" class="mx-2" @click="printData('web')">WEB打印</a-button>
                <a-button type="primary" class="mx-2" @click="printData('static')">静默打印</a-button>
                <a-button type="primary" class="mx-2" @click="printData('single')">打印单条数据</a-button>
                <a-button type="primary" class="mx-2" @click="printData('many')">批量打印</a-button>
            </div>

            <div style="height:450px;overflow-y: auto;background: #000;color:#fff;margin:40px auto">{{ str }}</div>

            <div id="design"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { hiprint } from 'vue-plugin-hiprint';
import type { IPrintItemOptions } from './type';

const panel = ref<Record<string, any>>()
const hiprintTemplate = ref<Record<string, any>>();

const printOptions = reactive({
    width: 70,
    height: 20,
    orient: 1,
})

const str = ref('');

const testValue = {
    qrcode: "test",
    title: "这是name",
    subTitle: "这是subTitle",
    type: "这是type",
    subType: "这是subType",
    test: "test",
    testValue: "testValue",
    test2: "test2",
    test2Value: "test2Value",
    test3: "test3",
    test3Value: "test3Value",
    test4: "test4",
    test4Value: "test4Value",
    test5: "test5",
    test5Value: "test5Value"
}

const list = ref([
    {
        textType: 'qrcode',
        width: 35,
        height: 35,
        top: 10,
        left: 2,
        title: '123456',
        fontFamily: 'Noto Sans SC',
        fontSize: 9,
        lineHeight: 9.75,
        scale: 1,
        hideTitle: true
    },
    {
        width: 75,
        height: 7,
        top: 46,
        left: -17,
        title: 'KCY1234567980',
        fontFamily: 'Noto Sans SC',
        fontSize: 9,
        textAlign: 'left',
        fontWeight: 'bold',
        lineHeight: 19.5,
        scale: 0.5,
        field: "title"
    },
    {
        width: 110,
        height: 15,
        top: 5,
        left: 40,
        title: '五虎上将·关羽',
        fontFamily: 'Noto Sans SC',
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 1,
        fontWeight: 'bold',
        scale: 0.5,
        field: 'subTitle'
    },
    {
        width: 200,
        height: 15,
        top: 15,
        left: -10,
        title: '华立科技 •《三国幻战》•中国简中',
        fontFamily: 'Noto Sans SC',
        fontSize: 12,
        lineHeight: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        scale: 0.5,
        field: "type"
    },
    {
        width: 110,
        height: 15,
        top: 22,
        left: 40,
        title: '2025年 五虎上将系列',
        fontFamily: 'Noto Sans SC',
        fontSize: 10,
        lineHeight: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        scale: 0.5,
        field: "subType",
    },
    {
        width: 55,
        height: 15,
        top: 33,
        left: 45,
        title: 'CENTERING',
        fontFamily: 'Noto Sans SC',
        textAlign: 'left',
        lineHeight: 1,
        fontWeight: 'bold',
        scale: 0.5,
        field: "test"
    },
    {
        width: 15,
        height: 15,
        top: 33,
        left: 85,
        title: '10',
        fontFamily: 'Noto Sans SC',
        lineHeight: 1,
        textAlign: 'left',
        fontWeight: 'bold',
        scale: 0.5,
        field: "testValue"
    },
    {
        width: 50,
        height: 15,
        top: 33,
        left: 90,
        title: 'CORNERS',
        fontFamily: 'Noto Sans SC',
        textAlign: 'left',
        lineHeight: 1,
        fontWeight: 'bold',
        scale: 0.5,
        field: "test2",
    },
    {
        width: 15,
        height: 15,
        top: 33,
        left: 122,
        title: '10',
        fontFamily: 'Noto Sans SC',
        textAlign: 'left',
        lineHeight: 1,
        fontWeight: 'bold',
        fontSize: 10,
        scale: 0.5,
        field: "test2Value"
    },
    {
        width: 55,
        height: 15,
        top: 40,
        left: 45,
        title: 'EDEGS',
        fontFamily: 'Noto Sans SC',
        lineHeight: 1,
        textAlign: 'left',
        fontWeight: 'bold',
        scale: 0.5,
        field: "test3"
    },
    {
        width: 15,
        height: 15,
        top: 40,
        left: 85,
        title: '10',
        fontFamily: 'Noto Sans SC',
        lineHeight: 1,
        textAlign: 'left',
        fontWeight: 'bold',
        scale: 0.5,
        field: "test3Value"
    },
    {
        width: 50,
        height: 15,
        top: 40,
        left: 90,
        title: 'SURFACE',
        fontFamily: 'Noto Sans SC',
        lineHeight: 1,
        textAlign: 'left',
        fontWeight: 'bold',
        scale: 0.5,
        field: "test4"
    },
    {
        width: 15,
        height: 15,
        top: 40,
        left: 122,
        title: "10",
        fontFamily: 'Noto Sans SC',
        textAlign: 'left',
        lineHeight: 1,
        fontWeight: 'bold',
        scale: 0.5,
        field: "test4Value"
    },
    {
        width: 130,
        height: 15,
        top: 9,
        left: 104,
        title: 'GEM MINT',
        fontFamily: "Noto Sans SC",
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 1,
        scale: 0.5,
        field: "test5",
    },
    {
        width: 55,
        height: 15,
        top: 29,
        left: 142,
        title: '9.5',
        fontFamily: "Noto Sans SC",
        textAlign: 'center',
        fontSize: 28,
        fontWeight: "bold",
        lineHeight: 1,
        scale: 1,
        field: "test5Value"
    }
])

/**
 * 绘制
 */
const drawPrint = () => {
    panel.value?.clear();
    hiprintTemplate.value?.clear();
    document.getElementById('design').innerHTML = '';
    let _str = '';

    hiprintTemplate.value = new hiprint.PrintTemplate();
    panel.value = hiprintTemplate.value.addPrintPanel({ width: printOptions.width, height: printOptions.height, paperFooter: 0, paperHeader: 0, paperNumberDisabled: true, orient: printOptions.orient });

    panel.value.addPrintText({ options: { width: printOptions.width, height: printOptions.height, top: 0, left: 0, src: "https://search-operate.cdn.bcebos.com/c63f5b937296e91b1a9a79a63328b2a6.gif" }, printElementType: { type: 'image' } })

    list.value.forEach((i, index) => {
        const { textType = 'text', width, height, left, top, title, scale = 1, fontSize = 9, fontFamily = 'Noto Sans SC', lineHeight = 9.75, hideTitle = false } = i as IPrintItemOptions;
        const options: Record<string, any> = { width, height, left, top, title, fontSize, fontFamily, lineHeight, hideTitle };
        if (textType === 'qrcode') {
            Object.assign(options, { textType: 'qrcode' })
        }
        if (!!i.textAlign) {
            Object.assign(options, { textAlign: i.textAlign })
        }
        if (i.fontWeight === 'bold') {
            Object.assign(options, { fontWeight: 'bold' })
        }

        const fn = new Function(`return { transform:"scale(${scale || 1})" }`)
        const tempOptions = { ...options };

        Object.assign(options, {
            styler: fn
        })

        Object.assign(tempOptions, {
            styler: `function(){return {transform:'scale(${scale || 1})'}}`
        })

        panel.value.addPrintText({ options });
        _str += JSON.stringify(tempOptions) + (index === list.value.length - 1 ? "" : ",");
    })

    hiprintTemplate.value.design('#design');
    str.value = "[" + _str + "]"
}

/**
 * 打印数据
 */
const printData = (type: 'static' | 'web' | 'single' | 'many') => {
    if (type === 'web') {
        console.log(hiprintTemplate.value);
        return hiprintTemplate.value.print({});
    }

    if (type === 'static') {
        console.log('static')
        return hiprintTemplate.value.print2({});
    }

    if (type === 'single') {
        console.log(hiprintTemplate.value.getPrinterList());
        return hiprintTemplate.value.print([testValue]);
    }
}

onMounted(() => {
    hiprint.init();
    hiprint?.hiwebSocket?.stop();
    drawPrint();
})

watch([printOptions, list], () => {
    drawPrint();
}, { deep: true });

</script>

<style lang="scss" scoped>
.json-box {
    height: 350px;
    background-color: #f00;
}
</style>