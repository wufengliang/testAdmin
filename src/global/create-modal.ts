import {
  type App,
  type DefineComponent,
  type VNode,
  getCurrentInstance,
  createVNode,
  render,
  Teleport,
} from "vue";
import { ModalProps, Modal } from "ant-design-vue";
import { omit } from "lodash-es";

interface CreateModalProps extends ModalProps {
  component?: DefineComponent<{}, {}, any>;
  componentOptions?: Record<string, any>;
  beforeClose?: (...args: any[]) => void | boolean | Promise<boolean | void>;
}

let app: App;

export function createModal(options: CreateModalProps = {}) {
  const appContext = app?._context || getCurrentInstance()?.appContext;
  const div = document.createElement("div");

  let modalVnode: VNode;

  let componentVnode: VNode;

  let teleportVnode: VNode;

  return new Promise((resolve) => {
    const {
      component,
      componentOptions,
      onOk = () => {},
      beforeClose,
    } = options;
    const props = omit(options, ["component", "componentOptions"]);

    componentVnode = createVNode(component!, componentOptions);

    const closeModal = (bool = false) => {
      (modalVnode.component?.props as ModalProps).open = bool;
    };

    const originOnCancel = async (e: MouseEvent, bool = false) => {
      resolve(bool ? componentVnode.component?.exposed : null);
      closeModal(false);
    };

    const originOnOk = async (e: MouseEvent) => {
      componentVnode.component?.update();
      const proxyData = componentVnode.component?.exposed;

      if (!beforeClose) {
        return onOk(e);
      }

      const value = beforeClose(proxyData as any);
      if ((value as any) instanceof Promise) {
        //  Promise对象
        const result = await value;
        if (result === void 0 || result) {
          return originOnCancel(e, true);
        }
        return false;
      }

      if (value === void 0 || value) {
        return originOnCancel(e, true);
      }
      return false;
    };

    const defaultModalProps = {
      visible: true,
      appContext,
      okText: "确定",
      cancelText: "取消",
      onOk: (e: MouseEvent) => originOnOk(e),
      onCancel: (e: MouseEvent) => originOnCancel(e),
    };

    modalVnode = createVNode(
      Modal,
      { ...props, ...defaultModalProps },
      {
        default: () => componentVnode,
      }
    );

    modalVnode.appContext = appContext;

    teleportVnode = createVNode(Teleport as any, { to: "body" }, [modalVnode]);
    teleportVnode.appContext = appContext;
    render(teleportVnode, div);
  });
}

export default function install(_app: App): void {
  app = _app;
}
