import { AuthStatus } from '~~/plugins/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $auth } = useNuxtApp();

  // if ($auth.authStatus !== AuthStatus.NONE) {
  // もし、まだ認証していない場合は認証処理を実施
  await $auth.authorize();
  // }

  return;
});
