/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2024-09-25 16:09:06
 * @LastEditTime: 2024-09-25 16:23:38
 * @Description:
 */
import { mount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import { AmLoading } from "../index";

describe("AmLoading", () => {
  test("test text", async () => {
    expect(AmLoading).toBeTruthy();

    const text = "hello,world";
    const wrapper = mount(AmLoading, {
      props: {
        text,
      },
    });

    expect(wrapper.text()).toContain(text);
  });

  test("test size", async () => {
    const wrapper = mount(AmLoading);
    expect(wrapper.find(".ant-spin-lg").exists()).toBeTruthy();
  });
});
