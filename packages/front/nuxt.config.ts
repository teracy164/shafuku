// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  target: 'static',
  meta: {
    title: 'shafuku',
    meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined',
      },
    ],
  },

  css: ['@/assets/css/tailwind.scss', '@/assets/css/element-plus.scss', '@/assets/css/styles.scss'],

  build: {
    transpile: ['element-plus/es'],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  typescript: {
    strict: true,
    shim: false,
  },
});
