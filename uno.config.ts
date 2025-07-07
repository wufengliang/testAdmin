/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2023-12-12 16:28:28
 * @LastEditTime: 2023-12-13 10:58:47
 * @Description: unocss配置
 */
import { defineConfig } from "unocss";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import transformerDirectives from "@unocss/transformer-directives";
import transformerCompileClass from "@unocss/transformer-compile-class";
import presetWind from "@unocss/preset-wind";

export default defineConfig({
  presets: [presetWind()],
  rules: [
    [/^margin-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^margin-top-([\.\d]+)$/, ([_, num]) => ({ "margin-top": `${num}px` })],
    [
      /^margin-bottom-([\.\d]+)$/,
      ([_, num]) => ({ "margin-bottom": `${num}px` })
    ],
    [/^margin-left-([\.\d]+)$/, ([_, num]) => ({ "margin-left": `${num}px` })],
    [
      /^margin-right-([\.\d]+)$/,
      ([_, num]) => ({ "margin-right": `${num}px` })
    ],
    [/^padding-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
    [/^padding-top-([\.\d]+)$/, ([_, num]) => ({ "padding-top": `${num}px` })],
    [
      /^padding-bottom-([\.\d]+)$/,
      ([_, num]) => ({ "padding-bottom": `${num}px` })
    ],
    [
      /^padding-left-([\.\d]+)$/,
      ([_, num]) => ({ "padding-left": `${num}px` })
    ],
    [
      /^padding-right-([\.\d]+)$/,
      ([_, num]) => ({ "padding-right": `${num}px` })
    ]
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
    transformerCompileClass()
  ],
  shortcuts: [["center", "flex items-center justify-center"]]
});
