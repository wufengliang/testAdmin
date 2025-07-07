/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2025-07-01 16:59:32
 * @LastEditTime: 2025-07-01 18:17:28
 * @Description: 
 */
import { hiprint, defaultElementTypeProvider } from 'vue-plugin-hiprint';

export function webPrint(template, ...args) {
    hiprint.init({
        providers: [new defaultElementTypeProvider()]
    });
    console.log(template)
    var hiprintTemplate = new hiprint.PrintTemplate({
        template: template,
    });
    hiprintTemplate.print(...args);
    return hiprintTemplate;
}

export function clientPrint( template, ...args) {
    hiprint.init({
        providers: [new defaultElementTypeProvider()]
    });
    var hiprintTemplate = new hiprint.PrintTemplate({
        template: template,
    });
    hiprintTemplate.print2(...args);
    return hiprintTemplate;
}