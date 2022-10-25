import { defineNuxtPlugin } from 'nuxt/app';
import ElementPlus from 'element-plus';
import localeJa from 'element-plus/es/locale/lang/ja';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus, { locale: localeJa });
});
