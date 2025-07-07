/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMeta {
  VITE_BASE_URL: string;
  VITE_REDIRECT_URI: string;
  VITE_LOGOUT_REDIRECT_URL: string;
}
