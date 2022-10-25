import { DefaultApi } from '~~/openapi';
import { AuthPlugin } from '~~/plugins/auth';

declare module '#app' {
  interface NuxtApp {
    $auth: AuthPlugin;
    $api: DefaultApi;
    $currency: (value: number) => string;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $auth: AuthPlugin;
    $api: DefaultApi;
    $currency: (value: number) => string;
  }
}
export {};
