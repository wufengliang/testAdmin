/**
 * 创建抽屉
 */
import {
  type App,
  type DefineComponent,
  type VNode,
  type CSSProperties,
  getCurrentInstance,
  createVNode,
  render,
  Teleport,
} from "vue";
import { DrawerProps, Drawer, Button, ButtonProps } from "ant-design-vue";
import { omit } from "lodash-es";

enum FOOTER_TYPE {
  NORMAL = "normal",
  CUSTOM = "custom",
}

interface CreateDrawerProps extends DrawerProps {
  component?: DefineComponent<{}, {}, any>;
  componentOptions?: Record<string, any>;
  isShowFooter?: boolean; //  是否展示底部操作
  footerType?: FOOTER_TYPE; //  底部样式
  footerStyle?: CSSProperties;
  onOk?: (...args: any[]) => any;
}

let app: App;

export function createDrawer(options: CreateDrawerProps = {}) {
  const appContext = app?._context || getCurrentInstance()?.appContext;
  const div = document.createElement("div");

  let drawerVnode: VNode;

  let footerVnode: VNode | null = null;

  let okVnode: VNode | null = null;

  let cancelVnode: VNode | null = null;

  let componentVnode: VNode;

  let teleportVnode: VNode;

  return new Promise((resolve) => {
    const {
      component,
      componentOptions,
      footerType,
      isShowFooter,
      footerStyle = {},
      onOk = () => {},
    } = options;
    const props = omit(options, [
      "component",
      "componentOptions",
      "isShowFooter",
      "footerType",
      "footerStyle",
      "onOk",
      "footer",
    ]);

    componentVnode = createVNode(component!, componentOptions);

    const close = (bool = false) => {
      (drawerVnode.component!.props as DrawerProps).open = !bool;
      resolve(bool ? componentVnode?.component?.exposed : null);
    };

    const setOkButtonStatus = (bool = false) => {
      (okVnode?.component?.props as ButtonProps).loading = bool;
      okVnode?.component?.update();
    };

    const ok = async () => {
      const proxyData = componentVnode?.component?.exposed;
      setOkButtonStatus(true);
      const result = onOk(proxyData);

      if (result instanceof Promise) {
        const value = await result;
        if (value === void 0 || value || value === null) {
          return close(true);
        }
      }

      if (result === void 0 || result) {
        return close(true);
      }
    };

    const defaultModalProps = {
      visible: true,
      onClose: () => close(true),
    };

    const slots = {
      default: () => componentVnode,
      footer: () => footerVnode,
    };

    //  设置footer节点
    const setFooterVnode = () => {
      if (!isShowFooter) {
        return (footerVnode = null);
      }

      if (footerType === FOOTER_TYPE.NORMAL) {
        //  普通样式
        okVnode = createVNode(
          Button,
          { type: "primary", onClick: () => ok() },
          "确定"
        );
        cancelVnode = createVNode(Button, { onClick: () => close(true) }, [
          "取消",
        ]);
        return (footerVnode = createVNode("div", { style: footerStyle }, [
          okVnode,
          cancelVnode,
        ]));
      }

      if (footerType === FOOTER_TYPE.CUSTOM) {
        return (footerVnode = options.footer);
      }
    };

    setFooterVnode();

    drawerVnode = createVNode(
      Drawer,
      { ...props, ...defaultModalProps },
      slots
    );

    drawerVnode.appContext = appContext;

    teleportVnode = createVNode(Teleport as any, { to: "body" }, [drawerVnode]);
    teleportVnode.appContext = appContext;
    render(teleportVnode, div);
  });
}

export default function install(_app: App): void {
  app = _app;
}
