/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2024-09-25 15:36:58
 * @LastEditTime: 2024-09-25 16:07:42
 * @Description: vitest 测试
 */
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        globals: true,
        environment: "jsdom",
        passWithNoTests: true,
        coverage: {
          // 覆盖率提供者
          provider: "istanbul",
          reporter: ["text", "json", "html"],
          // 设置覆盖文件夹
          reportsDirectory: "./coverage",
          thresholds: {
            lines: 75,
          },
          include: ["./src/components/**/*.{test,spec}.ts"],
        },
        open: true,
      },
    })
  )
);
