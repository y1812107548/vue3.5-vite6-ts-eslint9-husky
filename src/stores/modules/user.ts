import { defineStore } from 'pinia';

interface UserState {
  token: string;
  userInfo: {
    username: string;
    avatar?: string;
    email: string;
    userId: number;
  } | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = {
        username: userInfo.user.username || '',
        email: userInfo.user.email || '',
        avatar: userInfo.user.avatar || '',
        userId: userInfo.user.id || 0,
      };
    },
    logout() {
      this.token = '';
      this.userInfo = null;
    },
  },
  persist: true,
});
