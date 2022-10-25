import { AppConfig } from 'vue';
import { DefaultApi, User } from '~~/openapi';

export enum AuthStatus {
  NONE = 1,
  INITIALIZED,
  AUTHORIZED,
}

export class AuthPlugin {
  private config: AppConfig;
  private status: AuthStatus = AuthStatus.NONE;
  onChangeStatus: ((authed: boolean) => void) | null = null;

  constructor(config: AppConfig) {
    this.config = config;
  }

  private get $api(): DefaultApi {
    return this.config.globalProperties.$api;
  }

  get loginUser() {
    const state = useState('auth');
    return state.value as User;
  }

  get authStatus() {
    return this.status;
  }

  private set loginUser(user: User | null) {
    const state = useState('auth');
    state.value = user;
  }

  async login(params: { username: string; password: string }) {
    await this.$api.login({ loginDto: params });
    if (this.onChangeStatus) {
      this.onChangeStatus(true);
    }
  }

  async authorize() {
    try {
      this.status = AuthStatus.INITIALIZED;
      this.loginUser = await this.$api.authorize();
      this.status = AuthStatus.AUTHORIZED;
    } catch (err) {
      this.logout();
    }
  }

  async logout() {
    try {
      await this.$api.logout();
      this.loginUser = null;
      if (this.onChangeStatus) {
        this.onChangeStatus(false);
      }
      location.href = '/login';
      this.status = AuthStatus.NONE;
    } catch (err) {
      console.error(err);
    }
  }

  isLoggedIn() {
    return !!this.loginUser;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      auth: new AuthPlugin(nuxtApp.vueApp.config),
    },
  };
});
