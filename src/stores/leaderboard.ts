import { defineStore } from 'pinia';

export const useLeaderboardStore = defineStore('leaderboard', {
  state: () => ({
    filter: 'daily' as 'global' | 'friends' | 'daily' | 'weekly'
  })
});
