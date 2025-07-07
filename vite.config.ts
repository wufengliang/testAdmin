/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2022-10-28 17:42:16
 * @LastEditTime: 2025-06-29 16:39:04
 * @Description:
 */
import { defineConfig } from "vite";
import * as path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  return {
    base:"./",
    plugins: [
      vue(),
      vueJsx(),
      Unocss(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
          }),
        ],
      }),
    ],
    server: {
      host: "0.0.0.0",
      port: 8888,
      open: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or 'modern'
        },
      },
    },
    build: {
      minify: "terser",
      sourcemap: mode !== "production",
      terserOptions: {
        compress: {
          drop_console: mode === "production",
          drop_debugger: command === "build",
        },
      },
    },
  };
});
