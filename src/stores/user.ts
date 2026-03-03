import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    email: '',
    level: 1,
    xp: 0,
    tokens: 0
  })
});
