import { defineStore } from 'pinia';

export const useReferralStore = defineStore('referral', {
  state: () => ({
    code: 'LOGIC-START',
    invited: 0,
    bonusTokens: 0
  })
});
