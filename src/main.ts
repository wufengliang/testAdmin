/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2022-11-21 09:55:57
 * @LastEditTime: 2024-11-15 16:19:36
 * @Description:
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import registerApp from "./register";
import "./styles/index.scss";
import "virtual:uno.css";
import "@unocss/reset/normalize.css";

const pinia = createPinia();
const app = createApp(App);

registerApp(app).use(router).use(pinia).mount("#app");
