import { defineStore } from 'pinia'

interface UserState {
  isAuthenticated: boolean;
  username: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isAuthenticated: false,
    username: null,
  }),
  actions: {
    login(newUsername: string) {
      this.isAuthenticated = true;
      this.username = newUsername;
    },
    logout() {
      this.isAuthenticated = false;
      this.username = null;
    },
  },
  getters: {
    welcomeMessage(state): string {
      if (state.isAuthenticated && state.username) {
        return `Hello, ${state.username}!`;
      }
      return 'Please log in.';
    },
  },
})
