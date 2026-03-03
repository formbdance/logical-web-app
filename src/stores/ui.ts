import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isReferralOpen: false,
    isCheckoutOpen: false
  })
});
