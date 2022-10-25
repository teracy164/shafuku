import { Configuration, DefaultApi } from '~~/openapi';

export default defineNuxtPlugin(() => {
  const config = new Configuration({
    basePath: '',
  });
  const api = new DefaultApi(config);
  return {
    provide: {
      currency: (value: number) => {
        return `\\${Number(value).toLocaleString()}`;
      },
    },
  };
});
