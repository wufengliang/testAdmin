/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2022-11-21 09:55:57
 * @LastEditTime: 2025-07-11 21:18:22
 * @Description:
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import registerApp from "./register";
import {hiPrintPlugin} from 'vue-plugin-hiprint';
import "./styles/index.scss";
import "virtual:uno.css";
import "@unocss/reset/normalize.css";

const pinia = createPinia();
const app = createApp(App);
app.use(hiPrintPlugin);

registerApp(app).use(router).use(pinia).mount("#app");
